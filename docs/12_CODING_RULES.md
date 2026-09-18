# SkillSense AI — Coding Rules

# 1. General

Use TypeScript.

Avoid `any`.

Use strict typing.

Do not duplicate business logic.

Do not introduce unnecessary dependencies.

Do not implement undocumented features without approval.

---

# 2. Architecture

Frontend:

Pages
↓
Components
↓
Hooks
↓
API Layer

Backend:

Routes
↓
Controllers
↓
Services
↓
Repositories
↓
Database

---

# 3. Business Logic

Business rules belong in services/domain logic.

Do not place important business calculations inside:

- React components
- Route definitions
- Controllers

---

# 4. Database

Use Prisma.

Do not write raw SQL unless necessary.

Use transactions for multi-step operations requiring atomicity.

Use indexes for frequently queried fields.

---

# 5. Validation

Validate all external input using Zod or equivalent schema validation.

Never trust:

- Frontend
- User input
- AI output

---

# 6. Authentication

Never:

- Store plaintext passwords
- Expose secrets
- Store secrets in source code
- Trust frontend role information

Authorization must be server-side.

---

# 7. AI

AI output must be treated as untrusted.

Validate structured output.

Do not allow AI to directly modify protected system state.

---

# 8. React

Prefer reusable components.

Avoid unnecessarily large components.

Use proper loading and error states.

Avoid unnecessary re-renders.

---

# 9. API

Use consistent response structure.

Use correct HTTP status codes.

Do not expose stack traces to users.

---

# 10. Error Handling

Use centralized backend error handling.

Errors should contain:

- Safe message
- Error code
- Request ID where appropriate

Logs can contain technical details.

---

# 11. Security

Never commit:

.env

credentials

API keys

private certificates

tokens

---

# 12. Naming

Use descriptive names.

Variables:

camelCase

Types/interfaces:

PascalCase

Constants:

UPPER_SNAKE_CASE where appropriate

Files should use a consistent naming convention.

---

# 13. Comments

Write comments only where they explain:

- Why something exists
- Complex business logic
- Non-obvious decisions

Do not write comments that simply repeat the code.

---

# 14. Git

Use conventional commit prefixes:

feat:
fix:
refactor:
test:
docs:
chore:
perf:
security:

---

# 15. Pull/Change Rule

Every meaningful change must:

1. Identify impacted modules.
2. Update tests.
3. Run lint.
4. Run tests.
5. Run build.

---

# 16. Antigravity Rule

Before modifying code:

1. Read relevant docs.
2. Inspect existing implementation.
3. Identify dependencies.
4. Make the smallest appropriate change.
5. Run validation.

Do not rewrite working modules unnecessarily.

---

# 17. Documentation Rule

If implementation changes behavior:

Update the corresponding documentation.

Code and documentation must remain consistent.

---

# 18. Definition of Done

A feature is DONE only when:

- Implemented
- Validated
- Tested
- Error handled
- Responsive where applicable
- Documented
- Build passes
