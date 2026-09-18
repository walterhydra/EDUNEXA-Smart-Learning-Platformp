# SkillSense AI — Role & Permission Matrix

# Roles

STUDENT
ADMIN

---

# Permission Matrix

| Resource | Student | Admin |
|---|---|---|
| Own Profile | CRUD | View |
| Own Skills | View | View |
| Careers | View | CRUD |
| Skills | View | CRUD |
| Career Requirements | View | CRUD |
| Own Assessment | Create/View | View |
| Questions | No direct management | CRUD |
| Own Roadmap | View | View |
| Learning Modules | View | CRUD |
| Resources | View | CRUD |
| Own Progress | View | View |
| All Student Analytics | No | View |
| Users | Own profile only | CRUD |
| AI Mentor | Use | Use |
| System Settings | No | CRUD |

---

# 1. Student Restrictions

Student cannot:

- Access another student's profile
- Modify career definitions
- Modify skill requirements
- Modify assessment questions
- Access admin analytics
- Change their own role
- Change another user's role

---

# 2. Admin Restrictions

Admin operations must still be authenticated.

Frontend hiding is NOT sufficient.

Every administrative endpoint must enforce authorization on the server.

---

# 3. Ownership Rules

Student requests involving personal data must verify:

authenticatedUser.id === requestedResource.userId

---

# 4. AI Restrictions

AI must never receive permission to:

- Change roles
- Modify scores
- Delete users
- Modify security configuration
- Directly execute database mutations

AI output is advisory unless processed by controlled backend logic.
