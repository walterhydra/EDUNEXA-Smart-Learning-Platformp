# SkillSense AI — Acceptance Criteria

# AC-001 Authentication

Given a valid student,

When registration is completed,

Then an account must be created.

Given valid credentials,

When login occurs,

Then the student receives an authenticated session.

---

# AC-002 Profile

Student must be able to create and update their own profile.

Students must not access another student's private profile.

---

# AC-003 Career

Student must be able to browse careers and view their required skills.

Only administrators can modify career definitions.

---

# AC-004 Assessment

Student must be able to start and complete an assessment.

The backend must calculate the authoritative result.

Frontend manipulation must not change the final score.

---

# AC-005 Skill Analysis

After assessment completion:

The system must calculate skill scores.

The system must compare current skills against career requirements.

The system must display:

- Current level
- Required level
- Gap
- Priority

---

# AC-006 Personalized Roadmap

After skill analysis:

The student must receive a learning roadmap.

The roadmap must reflect:

- Career goal
- Skill gaps
- Prerequisites
- Learning availability

---

# AC-007 Learning

Student must be able to:

- Open learning modules
- Access resources
- Track progress
- Complete modules

---

# AC-008 AI Mentor

Student must be able to ask learning-related questions.

AI responses must use relevant learning context.

If AI is unavailable, the application must provide a retry/fallback state.

---

# AC-009 Adaptive Roadmap

When a student completes a reassessment:

1. Skill score updates.
2. Skill gaps recalculate.
3. Roadmap state updates.
4. New appropriate modules become available.
5. Remedial modules may be recommended where necessary.

---

# AC-010 Analytics

Student dashboard must display current progress based on backend data.

---

# AC-011 RBAC

Unauthorized users must not access protected resources.

Admin APIs must reject student users.

---

# AC-012 Security

Secrets must not be exposed to frontend code.

Passwords must never be stored in plaintext.

AI provider credentials must remain server-side.

---

# AC-013 Responsive UI

Core student flows must work on desktop and mobile.

---

# AC-014 Error Handling

The application must provide understandable UI states for:

- Validation errors
- Network failures
- Server errors
- AI failures
- Empty data

---

# AC-015 MVP Completion

The MVP is accepted when the complete student journey works:

Register
→ Login
→ Profile
→ Career
→ Assessment
→ Skill Analysis
→ Roadmap
→ Learning
→ Reassessment
→ Adaptive Roadmap
→ AI Mentor
→ Progress
