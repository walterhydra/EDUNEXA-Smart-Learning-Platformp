# SkillSense AI — Database Schema

# 1. Database

PostgreSQL

ORM:

Prisma

---

# 2. Core Entities

User
Profile
Career
Skill
CareerSkill
StudentSkill
Assessment
Question
QuestionOption
AssessmentAttempt
AssessmentAnswer
LearningPath
LearningModule
LearningProgress
Resource
Project
SkillEvidence
ChatSession
ChatMessage
RefreshToken

---

# 3. User

Fields:

id
email
passwordHash
role
createdAt
updatedAt

Constraints:

email UNIQUE

Roles:

STUDENT
ADMIN

---

# 4. Profile

Fields:

id
userId
name
education
institution
degree
year
interests
weeklyLearningHours
onboardingCompleted
createdAt
updatedAt

Relationship:

User 1 → 1 Profile

---

# 5. Career

Fields:

id
name
slug
description
category
isActive
createdAt
updatedAt

---

# 6. Skill

Fields:

id
name
slug
description
category
createdAt
updatedAt

---

# 7. CareerSkill

Maps required skills to careers.

Fields:

id
careerId
skillId
requiredLevel
weight
isCore

Constraints:

careerId + skillId UNIQUE

---

# 8. StudentSkill

Stores current student skill state.

Fields:

id
userId
skillId
score
confidence
lastAssessedAt
createdAt
updatedAt

Constraints:

userId + skillId UNIQUE

---

# 9. Assessment

Fields:

id
title
description
careerId
skillId
difficulty
durationMinutes
isActive
createdAt
updatedAt

---

# 10. Question

Fields:

id
assessmentId
skillId
questionText
questionType
difficulty
explanation
createdAt
updatedAt

---

# 11. QuestionOption

Fields:

id
questionId
optionText
isCorrect

---

# 12. AssessmentAttempt

Fields:

id
userId
assessmentId
startedAt
submittedAt
score
status

Status:

IN_PROGRESS
COMPLETED
ABANDONED

---

# 13. AssessmentAnswer

Fields:

id
attemptId
questionId
selectedOptionId
isCorrect
createdAt

Constraint:

attemptId + questionId UNIQUE

---

# 14. LearningPath

Fields:

id
userId
careerId
version
status
generatedAt
updatedAt

---

# 15. LearningModule

Fields:

id
learningPathId
skillId
title
description
sequence
difficulty
estimatedMinutes
status
prerequisiteModuleId

Status:

LOCKED
AVAILABLE
IN_PROGRESS
COMPLETED

---

# 16. LearningProgress

Fields:

id
userId
moduleId
progressPercent
startedAt
completedAt
updatedAt

Constraint:

userId + moduleId UNIQUE

---

# 17. Resource

Fields:

id
moduleId
title
description
resourceType
url
difficulty
estimatedMinutes
isActive

Resource types:

VIDEO
ARTICLE
DOCUMENTATION
EXERCISE
QUIZ
PROJECT

---

# 18. Project

Fields:

id
title
description
difficulty
careerId
requiredSkills
estimatedHours
requirements
createdAt
updatedAt

---

# 19. SkillEvidence

Fields:

id
userId
skillId
sourceType
sourceId
score
metadata
createdAt

Source types:

ASSESSMENT
PROJECT
PRACTICE
MODULE

---

# 20. ChatSession

Fields:

id
userId
title
createdAt
updatedAt

---

# 21. ChatMessage

Fields:

id
sessionId
role
content
createdAt

Roles:

USER
ASSISTANT
SYSTEM

---

# 22. RefreshToken

Fields:

id
userId
tokenHash
expiresAt
revokedAt
createdAt

---

# 23. Important Indexes

Index:

User.email

StudentSkill.userId

StudentSkill.skillId

CareerSkill.careerId

CareerSkill.skillId

AssessmentAttempt.userId

AssessmentAnswer.attemptId

LearningProgress.userId

LearningModule.learningPathId

ChatMessage.sessionId

---

# 24. Data Integrity

Backend must enforce:

- Foreign keys
- Unique constraints
- Valid enum values
- Non-negative scores
- Scores within 0–100
- Required relationships

Frontend validation is not sufficient.
