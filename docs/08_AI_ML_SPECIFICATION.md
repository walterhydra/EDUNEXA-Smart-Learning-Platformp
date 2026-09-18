# SkillSense AI — AI/ML Specification

# 1. AI Philosophy

AI should enhance personalization, not replace deterministic application logic.

---

# 2. AI Components

## AI-001 Question Generation

Input:

- Skill
- Difficulty
- Topic
- Number of questions

Output:

- Question
- Options
- Correct answer
- Explanation
- Difficulty

Output must be validated using a schema.

---

# 3. AI-002 Personalized Explanation

Input:

- Topic
- Student level
- Previous performance
- Learning context

Output:

- Explanation
- Example
- Practice suggestion

---

# 4. AI-003 Roadmap Recommendation

Input:

- Career
- Required skills
- Student skills
- Skill gaps
- Weekly learning time

Output:

Structured learning recommendations.

The backend validates the output.

---

# 5. AI-004 Resource Recommendation

Input:

- Current skill
- Learning objective
- Difficulty
- Module

Output:

Recommended resource types and topics.

---

# 6. AI-005 AI Mentor

Context:

- Student career
- Current roadmap module
- Current skill score
- Weak areas
- Recent assessment

The AI should answer in the student's learning context.

---

# 7. AI-006 Project Recommendation

Input:

- Career
- Learned skills
- Remaining skill gaps

Output:

- Project idea
- Difficulty
- Required skills
- Requirements
- Expected learning outcomes

---

# 8. Deterministic Skill Gap Engine

Do NOT ask the LLM to calculate authoritative skill scores.

Formula:

gap = requiredLevel - currentLevel

Normalize:

normalizedGap = max(gap, 0)

Priority can incorporate:

- Gap size
- Skill weight
- Prerequisite importance

---

# 9. Skill Score

Initial implementation:

Assessment contribution:
50%

Practice:
20%

Project:
20%

Consistency:
10%

All weights must be configurable.

---

# 10. Career Readiness

Do not present the metric as a guaranteed employment probability.

Use terminology such as:

"Skill Coverage"

"Skill Progress"

"Career Skill Alignment"

The metric represents coverage of defined career skill requirements.

---

# 11. AI Output Validation

Every structured AI response must be validated before use.

Invalid response:

→ Retry once where appropriate

If still invalid:

→ Fallback

Never directly persist unvalidated AI-generated structured data.

---

# 12. Prompt Injection Protection

Student-provided text must be treated as untrusted input.

Do not allow user messages to override:

- System instructions
- Application rules
- Authorization
- Data access policies

---

# 13. Privacy

Send only necessary student context to AI.

Do not send:

- Passwords
- Tokens
- Internal security information
- Unnecessary personal information

---

# 14. AI Failure Handling

Possible failures:

- Timeout
- Rate limit
- Provider unavailable
- Invalid response
- Content filtering
- Network error

UI should show:

"AI Mentor is temporarily unavailable. Please retry."

---

# 15. Optional ML Layer

For the hackathon MVP, a deterministic recommendation engine is acceptable.

Future ML capabilities:

- Student clustering
- Learning-resource recommendation
- Learning difficulty prediction
- Dropout-risk signals
- Personalized content ranking

ML should only be added if sufficient quality data exists.
