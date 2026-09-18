# SkillSense AI — Technical Requirements Document

# 1. Architecture

SkillSense AI uses a modular web architecture.

Frontend
↓
REST API
↓
Express Backend
↓
Service Layer
↓
Prisma ORM
↓
PostgreSQL

AI:

Backend
↓
AI Service
↓
LLM Provider

---

# 2. Frontend

## Required

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

---

# 3. Backend

Required:

- Node.js
- Express.js
- TypeScript
- Prisma
- Zod
- JWT
- Password hashing
- Structured logging
- Centralized error handling

---

# 4. Backend Architecture

Recommended:

src/
├── config/
├── middleware/
├── routes/
├── controllers/
├── services/
├── repositories/
├── validators/
├── utils/
├── types/
└── app.ts

Flow:

Route
↓
Controller
↓
Service
↓
Repository/Prisma
↓
Database

---

# 5. Frontend Architecture

src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── api/
├── contexts/
├── types/
└── utils/
└── features/

Business logic should not be embedded heavily inside UI components.

---

# 6. Authentication

Use:

- Short-lived access token
- Refresh token
- Password hashing
- Protected API routes
- Role-based authorization

Access tokens should have a short expiry.

Refresh tokens should be revocable.

---

# 7. API Security

Required:

- CORS configuration
- Input validation
- Rate limiting
- Secure headers
- Authentication middleware
- Authorization middleware
- Request size limits
- Safe error messages
- Secret management

---

# 8. Database

Database:

PostgreSQL

ORM:

Prisma

All important relationships must have appropriate:

- Foreign keys
- Unique constraints
- Indexes

---

# 9. AI Architecture

The frontend must never directly expose the AI provider secret.

Frontend
↓
Backend
↓
AI Service
↓
LLM API

AI output must be validated before application use.

---

# 10. AI Reliability

The system must handle:

- Timeout
- Provider error
- Rate limit
- Invalid response
- Malformed JSON
- Empty response

The application should provide a user-friendly fallback.

---

# 11. API Response Format

Success:

{
  "success": true,
  "data": {}
}

Failure:

{
  "success": false,
  "message": "Human-readable message",
  "code": "ERROR_CODE"
}

---

# 12. Environment Variables

Example:

DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
AI_API_KEY=
CLIENT_URL=
NODE_ENV=

Never commit actual secrets.

---

# 13. Performance Requirements

Target:

- Normal API response: <500ms where practical
- Database queries should use indexes
- Avoid N+1 queries
- AI calls should have explicit timeout
- Frontend should avoid unnecessary API requests

AI response latency is excluded from the normal API latency target.

---

# 14. Observability

Backend should log:

- Request ID
- HTTP method
- Endpoint
- Response status
- Error information
- AI request failure

Never log:

- Passwords
- JWT tokens
- AI API keys
- Sensitive personal information unnecessarily

---

# 15. Testing

Backend:

- Unit tests
- Integration tests

Frontend:

- Component tests where valuable

End-to-end:

- Playwright

---

# 16. Deployment

Frontend:

Vercel or equivalent.

Backend:

Production Node.js environment.

Database:

Managed PostgreSQL.

AI:

Secure server-side API integration.
