# SkillSense AI — Master Project Context

## 1. Project Identity

**Project Name:** SkillSense AI

**Project Type:** AI-powered personalized education and skill-development platform

**Hackathon Domain:** Smart Education & Skill Development

**Primary Objective:**

Build an intelligent education platform that identifies a student's current skill level, compares it with the requirements of a selected career path, identifies skill gaps, generates a personalized learning roadmap, provides contextual AI mentoring, tracks learning progress, and dynamically adapts the roadmap based on new performance evidence.

---

# 2. Core Problem

Students have different:

- Learning abilities
- Existing knowledge
- Interests
- Skill levels
- Learning speeds
- Career goals

Traditional learning systems generally provide the same learning sequence or require students to decide what they should learn next.

The core problem is not lack of educational content.

The core problem is:

> Students often do not know what they should learn next, why they should learn it, how far they are from their target career, or whether their learning is actually improving the required skills.

---

# 3. SkillSense AI Solution

SkillSense AI creates a continuous personalization loop:

Student Profile
↓
Career Goal
↓
Skill Assessment
↓
Skill Analysis
↓
Skill Gap Identification
↓
Personalized Roadmap
↓
Learning
↓
Practice
↓
Assessment
↓
Updated Skill Evidence
↓
Roadmap Adaptation
↓
Continued Learning

The platform should continuously improve the student's learning path based on measurable evidence.

---

# 4. Core Product Philosophy

SkillSense AI is NOT:

- A generic LMS
- A course marketplace
- A simple ChatGPT wrapper
- A generic career recommendation chatbot
- A collection of static educational videos

SkillSense AI IS:

> An adaptive skill-development system that connects career goals, measurable skill evidence, personalized learning paths, AI mentoring, and continuous reassessment.

---

# 5. Target Users

## Primary User

College students and early-career learners.

Typical characteristics:

- 18–25 years old
- Interested in professional careers
- Unsure about skill gaps
- Need structured learning guidance
- Have different starting skill levels

## Secondary User

Teachers, mentors, or institutions.

They can use aggregated student analytics to identify common skill gaps and learning issues.

## Administrative User

Platform administrator responsible for:

- Users
- Careers
- Skills
- Assessment questions
- Learning resources
- Learning modules

---

# 6. Initial Career Scope

The MVP should support a limited set of technical career paths.

Initial careers:

1. Frontend Developer
2. Backend Developer
3. Full Stack Developer
4. Data Analyst
5. Data Scientist
6. DevOps Engineer

Additional careers may be added later.

---

# 7. Core Modules

## Student Modules

- Authentication
- Student Profile
- Career Selection
- Career Explorer
- Skill Assessment
- Assessment Results
- Skill Gap Analysis
- Personalized Roadmap
- Learning Modules
- Learning Resources
- Progress Tracking
- AI Mentor
- Adaptive Roadmap
- Skill Evidence
- Project Recommendations

## Admin Modules

- User Management
- Career Management
- Skill Management
- Career-Skill Management
- Question Management
- Learning Resource Management
- Analytics

---

# 8. Intelligence Architecture

The platform separates deterministic application logic from generative AI.

## Deterministic Logic

Backend controls:

- Authentication
- Authorization
- Assessment scoring
- Skill score calculation
- Skill gap calculation
- Career requirement mapping
- Progress state
- Roadmap state
- Completion state

## AI Responsibilities

AI assists with:

- Question generation
- Explanations
- Personalized teaching
- Roadmap recommendations
- Learning resource recommendations
- Project recommendations
- Mentor conversations
- Qualitative feedback

AI must never be the authoritative source for:

- User permissions
- Assessment scores
- Database authorization
- Financial data
- Security decisions
- Final skill score calculations

---

# 9. Primary Differentiator

The primary differentiator is:

> Continuous adaptive learning based on measurable skill evidence.

Example:

Student starts with:

Node.js = 25%

After learning and reassessment:

Node.js = 72%

The system then recalculates the student's gaps and updates the roadmap.

---

# 10. Technology Direction

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Router
- TanStack Query
- React Hook Form
- Zod
- Recharts

## Backend

- Node.js
- Express.js
- TypeScript
- Zod
- JWT
- Prisma

## Database

- PostgreSQL

## AI

LLM API through a backend-only AI service.

## Testing

- Vitest/Jest
- Supertest
- Playwright

## Deployment

Frontend:

- Vercel or equivalent

Backend:

- Cloud VM / managed backend platform

Database:

- Managed PostgreSQL

---

# 11. Development Principle

The project must be developed incrementally.

Order:

Specification
↓
Architecture Validation
↓
Project Setup
↓
Database
↓
Authentication
↓
Core Student Modules
↓
Assessment
↓
Skill Analysis
↓
Roadmap
↓
Learning
↓
AI
↓
Analytics
↓
Testing
↓
Security
↓
Deployment

---

# 12. Source of Truth

The `/docs` directory is the project's primary specification source.

Antigravity must:

1. Read the relevant documentation before implementation.
2. Follow documented requirements.
3. Never invent major product behavior.
4. Report contradictions before implementing them.
5. Avoid modifying unrelated modules.
6. Run tests after meaningful changes.
7. Keep documentation synchronized with implementation.

---

# 13. Change Management

If a requirement changes:

1. Update the relevant specification.
2. Identify impacted modules.
3. Update acceptance criteria.
4. Update test cases.
5. Implement the change.
6. Run regression tests.

Do not silently change requirements inside application code.

---

# 14. MVP Definition

The MVP is complete when a student can:

Register
→ Login
→ Create Profile
→ Select Career
→ Take Assessment
→ Receive Skill Analysis
→ View Skill Gaps
→ Receive Personalized Roadmap
→ Learn
→ Take Follow-up Assessment
→ See Updated Skill Scores
→ See Adapted Roadmap
→ Use AI Mentor

---

# 15. Hackathon Demo Story

The recommended demonstration:

1. Student creates profile.
2. Student selects Full Stack Developer.
3. Student completes assessment.
4. System identifies skill gaps.
5. System generates roadmap.
6. Student opens recommended learning.
7. Student interacts with AI Mentor.
8. Student completes reassessment.
9. Skill score improves.
10. Roadmap adapts automatically.

This complete feedback loop is the main product story.
