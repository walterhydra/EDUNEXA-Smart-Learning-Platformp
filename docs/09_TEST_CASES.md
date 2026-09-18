# SkillSense AI — Test Cases

# 1. Authentication

## TC-AUTH-001

Valid registration.

Expected:
Account created successfully.

## TC-AUTH-002

Duplicate email.

Expected:
409 Conflict.

## TC-AUTH-003

Invalid email.

Expected:
Validation error.

## TC-AUTH-004

Invalid password.

Expected:
Validation error.

## TC-AUTH-005

Valid login.

Expected:
Authenticated session.

## TC-AUTH-006

Invalid credentials.

Expected:
401.

## TC-AUTH-007

Expired access token.

Expected:
401.

## TC-AUTH-008

Valid refresh token.

Expected:
New access token.

## TC-AUTH-009

Logout.

Expected:
Refresh token revoked.

---

# 2. Profile

TC-PROFILE-001

Create profile.

TC-PROFILE-002

Update own profile.

TC-PROFILE-003

Student attempts to access another profile.

Expected:
403 or 404.

TC-PROFILE-004

Invalid profile input.

Expected:
400.

---

# 3. Career

TC-CAREER-001

Student can view careers.

TC-CAREER-002

Student can view career requirements.

TC-CAREER-003

Student cannot create career.

TC-CAREER-004

Admin can create career.

TC-CAREER-005

Admin can update career.

TC-CAREER-006

Admin can delete career.

---

# 4. Assessment

TC-ASSESS-001

Start assessment.

TC-ASSESS-002

Load questions.

TC-ASSESS-003

Submit valid answers.

TC-ASSESS-004

Calculate score.

TC-ASSESS-005

Incomplete assessment.

TC-ASSESS-006

Duplicate question answer.

TC-ASSESS-007

Student cannot manipulate score from frontend.

---

# 5. Skill Gap

TC-SKILL-001

Calculate skill gap.

TC-SKILL-002

Current score equals required score.

Expected:
Gap = 0.

TC-SKILL-003

Current score exceeds required score.

Expected:
Gap = 0.

TC-SKILL-004

Multiple career skills.

Expected:
Correct prioritization.

---

# 6. Roadmap

TC-ROADMAP-001

Generate roadmap.

TC-ROADMAP-002

Respect prerequisites.

TC-ROADMAP-003

Respect student skill level.

TC-ROADMAP-004

Update roadmap after reassessment.

TC-ROADMAP-005

Unlock completed prerequisite.

---

# 7. Learning

TC-LEARN-001

Open module.

TC-LEARN-002

Start module.

TC-LEARN-003

Update progress.

TC-LEARN-004

Complete module.

TC-LEARN-005

Cannot complete locked module.

---

# 8. AI

TC-AI-001

AI Mentor responds.

TC-AI-002

AI provider timeout.

TC-AI-003

AI provider failure.

TC-AI-004

Malformed structured output.

TC-AI-005

AI retry.

TC-AI-006

Prompt injection attempt.

TC-AI-007

AI cannot modify permissions.

---

# 9. RBAC

TC-RBAC-001

Student accesses own data.

TC-RBAC-002

Student accesses another student's data.

TC-RBAC-003

Student accesses admin endpoint.

Expected:
403.

TC-RBAC-004

Admin accesses admin endpoint.

Expected:
Success.

TC-RBAC-005

Student attempts role manipulation.

Expected:
403.

---

# 10. UI

TC-UI-001

Desktop responsive.

TC-UI-002

Mobile responsive.

TC-UI-003

Loading state.

TC-UI-004

Empty state.

TC-UI-005

API error state.

TC-UI-006

Form validation.

TC-UI-007

Keyboard navigation.

---

# 11. End-to-End

TC-E2E-001

Complete student journey:

Register
→ Profile
→ Career
→ Assessment
→ Skill Gap
→ Roadmap
→ Learning
→ Reassessment
→ Updated Roadmap

Expected:
Complete journey succeeds.

TC-E2E-002

AI Mentor journey.

Expected:
Contextual response.

TC-E2E-003

Admin management journey.

Expected:
Admin can manage educational data.
