# SkillSense AI — Product Requirements Document

## 1. Product Vision

SkillSense AI helps students understand their current abilities, identify skill gaps against career requirements, and follow an adaptive learning journey designed around their individual needs.

---

# 2. Problem Statement

Students have different learning abilities, interests, skill levels, and career goals.

Traditional learning systems often provide:

- Generic courses
- Fixed learning sequences
- Broad recommendations
- Limited personalization
- Limited understanding of individual skill gaps

Students need a system that answers:

1. Where am I currently?
2. What career paths are relevant to my interests?
3. What skills does my selected career require?
4. Which skills am I missing?
5. What should I learn first?
6. What should I learn next?
7. Am I actually improving?
8. How should my learning path change based on my progress?

---

# 3. Product Goal

Build a platform that transforms:

Current Skills + Career Goal + Performance Evidence

into:

Personalized Learning Path + Continuous Skill Development.

---

# 4. Product Objectives

## Objective 1

Identify current student skill levels through assessments.

## Objective 2

Map student skills against career requirements.

## Objective 3

Identify and prioritize skill gaps.

## Objective 4

Generate personalized learning roadmaps.

## Objective 5

Provide contextual AI tutoring.

## Objective 6

Track learning progress.

## Objective 7

Adapt learning recommendations based on new assessment evidence.

---

# 5. Personas

## Persona A — Exploring Student

Does not know which technical career to pursue.

Needs:

- Career exploration
- Skill comparison
- Clear explanations

## Persona B — Goal-Oriented Student

Already knows the target career.

Needs:

- Skill gap analysis
- Roadmap
- Learning resources
- Progress tracking

## Persona C — Struggling Student

Has difficulty understanding specific topics.

Needs:

- AI explanations
- Remedial learning
- Additional practice

## Persona D — Admin

Manages platform educational content.

Needs:

- Career management
- Skill management
- Questions
- Resources
- Analytics

---

# 6. Core Features

## F-001 Authentication

Users can:

- Register
- Login
- Logout
- Refresh sessions

---

## F-002 Student Profile

Student can enter:

- Name
- Education
- Institution
- Degree
- Year
- Interests
- Existing skills
- Weekly learning availability

---

## F-003 Career Selection

Students can:

- Browse careers
- View career descriptions
- View required skills
- Select a target career

---

## F-004 Skill Assessment

Students complete assessments designed to measure relevant skills.

Assessment supports:

- Multiple choice
- Difficulty levels
- Skill association
- Explanations
- Scoring

---

## F-005 Skill Analysis

System calculates:

- Current skill level
- Required skill level
- Skill gap
- Gap priority

---

## F-006 Personalized Roadmap

System creates a learning sequence based on:

- Career
- Current skills
- Skill gaps
- Prerequisites
- Available learning time

---

## F-007 Learning

Students can:

- Open learning modules
- View resources
- Mark modules complete
- Practice skills
- Take checkpoints

---

## F-008 AI Mentor

Students can ask questions about their learning.

AI should use relevant context such as:

- Current career
- Current module
- Weak skills
- Recent assessments

---

## F-009 Adaptive Roadmap

After reassessment:

- Update skill scores
- Recalculate gaps
- Update roadmap
- Unlock new modules
- Recommend remedial modules where necessary

---

## F-010 Progress Analytics

Student sees:

- Overall skill coverage
- Skill-wise scores
- Skill improvement
- Assessment history
- Learning completion
- Roadmap progress

---

## F-011 Project Recommendations

Based on learned skills, system recommends practical projects.

---

## F-012 Admin Management

Admin manages:

- Users
- Careers
- Skills
- Career requirements
- Questions
- Learning resources

---

# 7. Non-Goals

MVP will NOT attempt to build:

- Full video streaming infrastructure
- Massive course marketplace
- Social networking
- Live classrooms
- Payment system
- Job placement marketplace
- Fully autonomous AI agent
- Complex deep learning model

---

# 8. Success Metrics

Hackathon MVP metrics:

- Assessment completion
- Skill gap generation success
- Roadmap generation success
- Roadmap adaptation success
- Learning completion
- AI Mentor response success
- End-to-end demo completion

---

# 9. Product Principle

The system should always answer:

> "What should this student do next, and why?"

---

# 10. MVP User Story

As a student,

I want to select a career goal and assess my current skills,

so that SkillSense AI can identify my skill gaps and create a personalized learning roadmap.

As I learn and complete assessments,

I want my roadmap to adapt to my new skill level.

---

# 11. MVP Boundary

The first implementation should focus on technical career development.

The system must work end-to-end for at least one complete career journey before additional career paths are added.
