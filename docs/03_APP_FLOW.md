# SkillSense AI — Application Flow

# 1. Overall Flow

Landing
↓
Register/Login
↓
Onboarding
↓
Student Profile
↓
Career Selection
↓
Initial Assessment
↓
Assessment Result
↓
Skill Gap Analysis
↓
Personalized Roadmap
↓
Learning
↓
Practice
↓
Reassessment
↓
Skill Update
↓
Roadmap Adaptation
↓
Progress Dashboard

---

# 2. Authentication Flow

Register
↓
Validate Input
↓
Hash Password
↓
Create User
↓
Create Profile
↓
Login

Login
↓
Validate Credentials
↓
Generate Access Token
↓
Generate Refresh Token
↓
Authenticated Session

Logout
↓
Revoke Refresh Token
↓
Session Ends

---

# 3. Onboarding Flow

Student Login
↓
Check Profile Completion
↓
If incomplete:
    ↓
Education
    ↓
Interests
    ↓
Existing Skills
    ↓
Career Goal
    ↓
Weekly Availability
↓
Profile Complete

---

# 4. Career Exploration Flow

Career Explorer
↓
Career List
↓
Career Details
↓
Required Skills
↓
Student Current Skills
↓
Skill Difference
↓
Select Career

---

# 5. Assessment Flow

Start Assessment
↓
Load Questions
↓
Answer Question
↓
Next Question
↓
Submit Assessment
↓
Backend Validates Attempt
↓
Calculate Score
↓
Calculate Skill Scores
↓
Save Result
↓
Generate Analysis

---

# 6. Skill Gap Flow

Student Skill Scores
+
Career Skill Requirements
↓
Normalize Scores
↓
Calculate Gap
↓
Calculate Priority
↓
Display:

Current Skill
Required Skill
Gap
Priority

---

# 7. Roadmap Flow

Career
+
Skill Gaps
+
Prerequisites
+
Weekly Time
↓
Roadmap Engine
↓
Learning Modules
↓
Sequence
↓
Checkpoints
↓
Student Roadmap

---

# 8. Learning Flow

Open Roadmap
↓
Select Module
↓
Open Resources
↓
Study
↓
Practice
↓
Mark Progress
↓
Complete Module
↓
Checkpoint Assessment

---

# 9. Adaptive Flow

Checkpoint Assessment
↓
Calculate New Skill Score
↓
Update Student Skill
↓
Recalculate Skill Gaps
↓
Check Roadmap State

If competency achieved:
    ↓
Unlock next module

If competency not achieved:
    ↓
Recommend remedial module

If advanced performance:
    ↓
Recommend advanced module

---

# 10. AI Mentor Flow

Student
↓
Ask Question
↓
Backend
↓
Build Safe Context
↓
AI Service
↓
LLM
↓
Validate Response
↓
Return Answer
↓
Store Conversation

---

# 11. Admin Flow

Admin Login
↓
Admin Dashboard

Modules:

Users
Careers
Skills
Career Requirements
Questions
Resources
Analytics

Every administrative operation requires server-side ADMIN authorization.

---

# 12. Error Flow

API Error
↓
Central Error Handler
↓
Log Technical Details
↓
Return Safe User Message

AI Error
↓
Log Error
↓
Fallback Message
↓
Allow Retry
