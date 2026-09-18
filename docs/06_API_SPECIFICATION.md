# SkillSense AI — API Specification

# Base URL

/api

---

# 1. Authentication

POST /auth/register

POST /auth/login

POST /auth/refresh

POST /auth/logout

---

# 2. Profile

GET /profile

PATCH /profile

---

# 3. Careers

GET /careers

GET /careers/:careerId

POST /careers

PATCH /careers/:careerId

DELETE /careers/:careerId

Admin only for mutation.

---

# 4. Skills

GET /skills

GET /skills/:skillId

POST /skills

PATCH /skills/:skillId

DELETE /skills/:skillId

Admin only for mutation.

---

# 5. Student Skills

GET /student/skills

GET /student/skills/:skillId

---

# 6. Assessments

GET /assessments

GET /assessments/:assessmentId

POST /assessments/:assessmentId/start

POST /assessments/:assessmentId/submit

GET /assessments/attempts

GET /assessments/attempts/:attemptId

---

# 7. Skill Analysis

GET /skill-analysis

GET /skill-analysis/:careerId

---

# 8. Roadmap

POST /roadmap/generate

GET /roadmap

GET /roadmap/:roadmapId

POST /roadmap/:roadmapId/regenerate

---

# 9. Learning

GET /learning/modules/:moduleId

POST /learning/modules/:moduleId/start

POST /learning/modules/:moduleId/progress

POST /learning/modules/:moduleId/complete

---

# 10. Resources

GET /resources

GET /resources/:resourceId

Admin:

POST /resources

PATCH /resources/:resourceId

DELETE /resources/:resourceId

---

# 11. Progress

GET /progress

GET /progress/skills

GET /progress/assessments

GET /progress/roadmap

---

# 12. AI Mentor

POST /ai/mentor/sessions

GET /ai/mentor/sessions

GET /ai/mentor/sessions/:sessionId

POST /ai/mentor/sessions/:sessionId/messages

---

# 13. Admin

GET /admin/users

GET /admin/analytics

POST /admin/questions

PATCH /admin/questions/:questionId

DELETE /admin/questions/:questionId

---

# 14. Request Rules

Every protected endpoint must validate:

1. Authentication
2. Authorization
3. Request body
4. Parameters
5. Query parameters

---

# 15. Response Rules

Success:

{
  "success": true,
  "data": {}
}

Error:

{
  "success": false,
  "message": "...",
  "code": "..."
}

---

# 16. HTTP Status Rules

200 — Successful request

201 — Created

400 — Validation error

401 — Unauthenticated

403 — Unauthorized

404 — Resource not found

409 — Conflict

429 — Rate limited

500 — Internal server error
