# SkillSense AI — EDUNEXA Smart Learning Platform

SkillSense AI is an AI-powered personalized education and skill-development platform that identifies a student's current skill level, compares it with the requirements of a target career path, identifies skill gaps, generates a personalized learning roadmap, provides contextual AI mentoring, tracks learning progress, and dynamically adapts the roadmap based on performance evidence.

## Repository Structure

```
.
├── docs/                      # Specification & Architecture Documentation
│   ├── 00_MASTER_CONTEXT.md
│   ├── 01_PRD_SKILLSENSE_AI.md
│   ├── 02_TRD_Technical_Requirement.md
│   ├── 03_APP_FLOW.md
│   ├── 04_UI_UX_BRIEF.md
│   ├── 05_DATABASE_SCHEMA.md
│   ├── 06_API_SPECIFICATION.md
│   ├── 07_ROLE_PERMISSION_MATRIX.md
│   ├── 08_AI_ML_SPECIFICATION.md
│   ├── 09_TEST_CASES.md
│   ├── 10_ACCEPTANCE_CRITERIA.md
│   ├── 11_DEVELOPMENT_PHASES.md
│   ├── 12_CODING_RULES.md
│   ├── 13_DEPLOYMENT_AND_BACKUP_PLAN.md
│   └── IMPLEMENTATION_READINESS_REPORT.md
│
├── frontend/                  # React + Vite + TypeScript + Tailwind CSS Frontend
└── backend/                   # Express + Node.js + TypeScript + Prisma Backend
```

## Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Running Tests & Verification

```bash
# Frontend
cd frontend
npm run build
npm run lint
npm run test

# Backend
cd backend
npm run build
npm run lint
npm run test
```
