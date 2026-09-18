# SkillSense AI — Implementation Readiness Report

**Prepared by:** Lead Software Architect & Senior Full-Stack Engineer  
**Date:** September 18, 2026  
**Status:** Complete — Pending User Review & Approval  

---

## Executive Summary

A comprehensive architectural audit was performed on all 14 project specification documents in `/docs` (`00_MASTER_CONTEXT.md` through `13_DEPLOYMENT_AND_BACKUP_PLAN.md`).

Overall, the specification is exceptionally well-structured, maintaining a clear separation between **deterministic business logic** (auth, scoring, gap calculations, RBAC) and **generative AI features** (mentoring, contextual explanations, recommendations).

This report highlights **12 key architectural dimensions**, identifying specific contradictions, database anomalies, API gaps, security risks, and concrete recommended corrections to ensure flawless implementation.

---

## 1. Contradictions Between Documents

### C-01: Career Selection Persistence
* **Issue:** `00_MASTER_CONTEXT.md` (Section 14) and `03_APP_FLOW.md` (Section 3) specify that a student selects a target career during onboarding or career exploration. However, `05_DATABASE_SCHEMA.md` (`Profile` entity) lacks a `targetCareerId` or `careerId` field.
* **Impact:** The system cannot persist a student's active target career directly on their profile, forcing lookups against the latest `LearningPath`.
* **Resolution:** Add `targetCareerId` (nullable FK to `Career`) to the `Profile` model in Prisma.

### C-02: Terminology Disconnect: `Roadmap` vs. `LearningPath`
* **Issue:** `06_API_SPECIFICATION.md` (Section 8) defines endpoints using `/roadmap` (`GET /roadmap`, `POST /roadmap/generate`), whereas `05_DATABASE_SCHEMA.md` defines the underlying table as `LearningPath` containing `LearningModule` records.
* **Impact:** Mismatch between REST API resource naming and database ORM model naming.
* **Resolution:** Maintain `/roadmap` in the API contract for user UX while mapping internally to `prisma.learningPath` and `prisma.learningModule`.

### C-03: Initial Career Scope vs. Hardcoded Assumptions
* **Issue:** `00_MASTER_CONTEXT.md` (Section 6) lists 6 initial careers (Frontend, Backend, Full Stack, Data Analyst, Data Scientist, DevOps). However, `01_PRD_SKILLSENSE_AI.md` (Section 11) states that MVP implementation must work end-to-end for at least **one** complete career path first before adding others.
* **Impact:** Risk of scope creep during database seeding and testing.
* **Resolution:** Focus primary seed data and E2E acceptance verification on **Full Stack Developer**, while keeping schema generic for all 6 paths.

---

## 2. Missing Requirements

### M-01: Password Reset API Endpoints
* **Issue:** `04_UI_UX_BRIEF.md` (Section 4) specifies a "Forgot Password" page, but `06_API_SPECIFICATION.md` has no `/auth/forgot-password` or `/auth/reset-password` endpoints.
* **Resolution:** Add `POST /auth/forgot-password` and `POST /auth/reset-password` to `06_API_SPECIFICATION.md` and implement token-based reset logic.

### M-02: Target Career Update Endpoint
* **Issue:** `06_API_SPECIFICATION.md` lacks a dedicated endpoint for a student to change or select their active career goal after onboarding.
* **Resolution:** Extend `PATCH /profile` to accept `targetCareerId` or introduce `POST /student/career` to update target career and trigger roadmap recalculation.

### M-03: Assessment to Module Association
* **Issue:** `03_APP_FLOW.md` (Section 9) specifies Checkpoint Assessments after completing a module, but `LearningModule` in `05_DATABASE_SCHEMA.md` has no reference to an `assessmentId`.
* **Resolution:** Add optional `assessmentId` foreign key to `LearningModule` entity in Prisma.

---

## 3. Database Relationship & Integrity Analysis

### D-01: Profile Table Foreign Keys
* **Missing Field:** `Profile.targetCareerId` -> `Career.id` (Optional/Nullable).
* **Fix:**
```prisma
model Profile {
  id                   String   @id @default(uuid())
  userId               String   @unique
  user                 User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name                 String
  education            String?
  institution          String?
  degree               String?
  year                 String?
  interests            String[]
  weeklyLearningHours  Int      @default(5)
  onboardingCompleted  Boolean  @default(false)
  targetCareerId       String?
  targetCareer         Career?  @relation(fields: [targetCareerId], references: [id])
  createdAt            DateTime @default(now())
  updatedAt            DateTime @updatedAt
}
```

### D-02: Multiple Prerequisites Support
* **Current Schema:** `prerequisiteModuleId String?` (allows only 1 linear prerequisite).
* **Fix:** Retain `prerequisiteModuleId` for MVP simple linear chains, but support array or explicit join table for future non-linear skill graphs.

### D-03: Assessment Entity Scoping
* **Current Schema:** `Assessment` has `careerId` AND `skillId`.
* **Clarification:** Initial diagnostic assessments set `careerId` (evaluating all skills in career), while checkpoint assessments set `skillId` (evaluating a single target skill). Both fields should be optional in Prisma.

---

## 4. API Specification Inconsistencies

### A-01: Request & Response Payload Contracts
* `POST /assessments/:id/submit`: Request body must send `attemptId` and `answers: [{ questionId, selectedOptionId }]`.
* `POST /roadmap/generate`: Request body must accept `{ careerId }` or default to the student's `profile.targetCareerId`.
* `POST /ai/mentor/sessions/:sessionId/messages`: Request body must accept `{ message, currentModuleId? }`.

### A-02: Structured Response Format Enforcement
All responses must strictly adhere to:
```json
// Success
{ "success": true, "data": { ... } }

// Error
{ "success": false, "message": "Human readable error", "code": "INVALID_INPUT" }
```

---

## 5. Authentication & Security Risks

### S-01: Token Storage Security
* **Risk:** Storing JWT refresh tokens in LocalStorage exposes the application to XSS token theft.
* **Mitigation:**
  * Access tokens (short-lived, 15m) returned in response body.
  * Refresh tokens (7 days) set in `httpOnly`, `Secure`, `SameSite=Strict` cookies.

### S-02: Server-Side Authorization Guards
* **Risk:** Relying on client-side routing for role checks.
* **Mitigation:** Implement Express middleware `authenticateToken` and `requireRole('ADMIN')`. Validate resource ownership (`req.user.id === resource.userId`) on all student data endpoints.

### S-03: Prompt Injection Protection
* **Risk:** User input injected directly into LLM prompts without sanitization.
* **Mitigation:** Wrap student queries in structured system delimiters. Never pass raw system prompt overrides from client.

---

## 6. Role & Permission Matrix Audit

* All endpoints verified against `07_ROLE_PERMISSION_MATRIX.md`.
* `ADMIN` role required for:
  * `/careers` (POST, PATCH, DELETE)
  * `/skills` (POST, PATCH, DELETE)
  * `/resources` (POST, PATCH, DELETE)
  * `/admin/*` (Users, Analytics, Questions)
* `STUDENT` restricted strictly to personal records (`req.user.id`).

---

## 7. AI Architecture & Reliability Risks

### AI-01: Deterministic Fallback Strategy (Offline/Hackathon Guard)
* **Risk:** LLM API outage, invalid JSON response, or rate limiting during hackathon demo.
* **Mitigation:** Implement a strict fallback pattern:
  1. Primary: Call LLM API with Zod structured output parser.
  2. Secondary: If parsing fails, retry once with explicit formatting instructions.
  3. Tertiary (Fallback): If LLM fails or API key is absent, use server-side deterministic generator/seed data. The user must never experience a broken UI.

---

## 8. Potential Scalability Problems

### P-01: Skill Gap Calculation Efficiency
* **Optimization:** Calculating skill gaps requires joining `CareerSkill` (required levels) with `StudentSkill` (current levels).
* **Index Strategy:** Ensure composite unique index on `StudentSkill(userId, skillId)` and `CareerSkill(careerId, skillId)`.

---

## 9. Testing Strategy Gaps

* **Unit Testing:** Deterministic score formula testing (`50% assessment + 20% practice + 20% project + 10% consistency`).
* **Integration Testing:** Auth flow (Register -> Login -> Refresh -> Logout), Assessment submission & gap calculation.
* **E2E Testing (Playwright):** Full Hackathon Demo Story (Register -> Career -> Assessment -> Gap Analysis -> Roadmap -> Learning -> Reassessment -> Adapted Roadmap).

---

## 10. Deployment & Infrastructure Risks

* **CORS Setup:** Backend must accept origin `CLIENT_URL` with `credentials: true` for `httpOnly` cookies.
* **Database Migrations:** Run `npx prisma migrate deploy` on production startup.

---

## 11. Ambiguous Requirements Resolved

1. **Weekly Learning Hours:** Used by Roadmap Engine to calculate `estimatedDays` = `totalEstimatedMinutes / (weeklyLearningHours * 60 / 7)`.
2. **Skill Score Recalculation:** Triggered automatically upon `AssessmentAttempt` completion, updating `StudentSkill` and recalculating `LearningPath` module statuses.

---

## 12. Recommended Next Steps & Implementation Order

1. **Phase 1: Project & Repository Setup**
   * Express + TypeScript backend structure (`/backend` or root `src/`).
   * Vite + React + TypeScript + Tailwind CSS + shadcn/ui frontend structure (`/frontend` or root `src/`).
2. **Phase 2: Database & Prisma Setup**
   * Schema definition incorporating all 22 entities + `Profile.targetCareerId` fix.
   * PostgreSQL migration & comprehensive seed data (Full Stack Developer journey).
3. **Phase 3: Auth & Core Services**
   * JWT Auth with `httpOnly` refresh tokens.
   * Assessment & Deterministic Skill Gap Engine.
   * Roadmap Generation Engine.
4. **Phase 4: AI Service Integration**
   * Server-side AI service with Zod schema validation & deterministic fallback.
5. **Phase 5: Verification & E2E Acceptance**
   * Automated unit/integration tests & Playwright demo story verification.

---

> [!IMPORTANT]
> **Status:** Implementation Readiness Report is COMPLETE. No application code has been modified. Awaiting User Approval to begin Phase 1 setup.
