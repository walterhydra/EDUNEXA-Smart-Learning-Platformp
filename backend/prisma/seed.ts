import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedDatabase() {
  console.log('🌱 Starting EDUNEXA 3-Student Dataset Seeding...');

  const salt = await bcrypt.genSalt(10);
  const commonPassword = await bcrypt.hash('Student123!', salt);

  // Clear existing records to ensure clean state
  await prisma.assignment.deleteMany();
  await prisma.learningRule.deleteMany();
  await prisma.skillRequirement.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.performanceData.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();

  // ==========================================
  // STUDENT 1: Rahul Sharma (Python Track)
  // ==========================================
  const student1 = await prisma.user.create({
    data: {
      email: 'rahul.python@edunexa.edu',
      passwordHash: commonPassword,
      role: 'STUDENT',
      profile: {
        create: {
          name: 'Rahul Sharma',
          education: 'Undergraduate',
          institution: 'Delhi Technological University',
          degree: 'B.Tech Computer Science',
          year: '2nd Year',
          interests: ['Python', 'Data Science', 'Machine Learning', 'Logic Building'],
          targetTrack: 'Python & Data Science Fundamentals',
          weeklyLearningHours: 8,
          streakDays: 5,
          xpPoints: 1450,
          rank: 'Silver Apprentice',
          dailyPace: '1.5 hours/day',
          readinessScore: 48,
        },
      },
      assessments: {
        create: [
          {
            title: 'Python Core Assessment',
            subject: 'Python Fundamentals',
            score: 48,
            totalMarks: 100,
            level: 'Beginner',
            weakAreas: ['Control Flow Loops', 'File Handling I/O', 'Dictionary Operations'],
            strongAreas: ['Variables & Data Types', 'Basic Arithmetic', 'Print Formatting'],
          },
        ],
      },
      skillRequirements: {
        create: [
          {
            skillName: 'Python Syntax & Logic',
            category: 'Prerequisite',
            currentProficiency: 50,
            requiredProficiency: 85,
            status: 'IN_PROGRESS',
          },
          {
            skillName: 'Control Flow & Loops',
            category: 'Core Competency',
            currentProficiency: 30,
            requiredProficiency: 80,
            status: 'LACKING',
          },
          {
            skillName: 'Pandas & Data Wrangling',
            category: 'Target Skill',
            currentProficiency: 10,
            requiredProficiency: 75,
            status: 'LACKING',
          },
        ],
      },
      learningRules: {
        create: [
          {
            condition: 'Assessment Score < 60 in Python Logic',
            recommendation: 'Recommend Python Foundations & Interactive Algorithm Practice',
            actionItem: 'Complete Python Control Flow & Loops Hands-on Lab',
            appliedStatus: 'ACTIVE',
          },
          {
            condition: 'Control Flow Proficiency < 50%',
            recommendation: 'Block Advanced Pandas module until Loops Mastered',
            actionItem: 'Solve 10 Iteration Challenges on Array Slicing',
            appliedStatus: 'ACTIVE',
          },
        ],
      },
      assignments: {
        create: [
          {
            title: 'Python Fundamentals: Control Flow & Iterative Loops Lab',
            subject: 'Python',
            description: 'Implement nested loops, pattern generation, and conditional filtering on dataset lists.',
            difficulty: 'Easy',
            dueDate: new Date(Date.now() + 86400000 * 3), // +3 days
            status: 'PENDING',
            xpReward: 150,
          },
          {
            title: 'Data Structures: Dictionary & Tuple Operations Challenge',
            subject: 'Python Data Structures',
            description: 'Store student records in nested dictionaries and parse json datasets using standard Python modules.',
            difficulty: 'Medium',
            dueDate: new Date(Date.now() + 86400000 * 5), // +5 days
            status: 'PENDING',
            xpReward: 200,
          },
        ],
      },
      performanceData: {
        create: {
          overallAccuracy: 48.5,
          completedLabs: 1,
          totalLabsAssigned: 5,
          recommendedTrack: 'Python & Data Science Foundations',
          decisionReason: 'Score is below 60%. Adaptive engine directed student to strengthen Python logic building before Data Analytics.',
        },
      },
    },
  });

  // ==========================================
  // STUDENT 2: Priya Patel (Full Stack Track)
  // ==========================================
  const student2 = await prisma.user.create({
    data: {
      email: 'priya.fullstack@edunexa.edu',
      passwordHash: commonPassword,
      role: 'STUDENT',
      profile: {
        create: {
          name: 'Priya Patel',
          education: 'Postgraduate',
          institution: 'BITS Pilani',
          degree: 'M.Tech Software Engineering',
          year: '1st Year',
          interests: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'System Design'],
          targetTrack: 'Full Stack Web Development (MERN/React+Node)',
          weeklyLearningHours: 12,
          streakDays: 14,
          xpPoints: 5800,
          rank: 'Gold Scholar',
          dailyPace: '2 hours/day',
          readinessScore: 78,
        },
      },
      assessments: {
        create: [
          {
            title: 'Full Stack Web Architecture Benchmark',
            subject: 'Web Development',
            score: 78,
            totalMarks: 100,
            level: 'Intermediate',
            weakAreas: ['Async Event Loop', 'Prisma ORM Migrations', 'Express Error Middleware'],
            strongAreas: ['React Hooks', 'Flexbox/Grid CSS', 'REST API Routing', 'Zod Validation'],
          },
        ],
      },
      skillRequirements: {
        create: [
          {
            skillName: 'React Components & Hooks',
            category: 'Prerequisite',
            currentProficiency: 85,
            requiredProficiency: 90,
            status: 'MASTERED',
          },
          {
            skillName: 'Node.js & Express REST APIs',
            category: 'Core Competency',
            currentProficiency: 70,
            requiredProficiency: 85,
            status: 'IN_PROGRESS',
          },
          {
            skillName: 'PostgreSQL Database & Prisma ORM',
            category: 'Target Skill',
            currentProficiency: 45,
            requiredProficiency: 80,
            status: 'LACKING',
          },
        ],
      },
      learningRules: {
        create: [
          {
            condition: 'Assessment Score between 60% - 85%',
            recommendation: 'Recommend Intermediate Backend Architecture & Database Integrations',
            actionItem: 'Build Express REST API with JWT Auth and Prisma ORM',
            appliedStatus: 'ACTIVE',
          },
          {
            condition: 'Database Proficiency < 60%',
            recommendation: 'Inject Database Relations & Schema Migration Mini-Project',
            actionItem: 'Design SQL Schema for Multi-Tenant Application',
            appliedStatus: 'ACTIVE',
          },
        ],
      },
      assignments: {
        create: [
          {
            title: 'Express.js REST API with JWT Authentication & Zod Schema Validation',
            subject: 'Node.js Backend',
            description: 'Implement full CRUD routes with JWT token verification and centralized error handler middleware.',
            difficulty: 'Medium',
            dueDate: new Date(Date.now() + 86400000 * 2),
            status: 'PENDING',
            xpReward: 250,
          },
          {
            title: 'Full-Stack React + Prisma Integration Project',
            subject: 'Full Stack',
            description: 'Connect React frontend with Express API using Axios, state management, and Prisma PostgreSQL database.',
            difficulty: 'Hard',
            dueDate: new Date(Date.now() + 86400000 * 6),
            status: 'PENDING',
            xpReward: 350,
          },
        ],
      },
      performanceData: {
        create: {
          overallAccuracy: 78.0,
          completedLabs: 4,
          totalLabsAssigned: 6,
          recommendedTrack: 'Full Stack Modern Web Application Architecture',
          decisionReason: 'Score is 78%. Strong frontend proficiency detected. Recommended focus on Node.js backend & PostgreSQL integration.',
        },
      },
    },
  });

  // ==========================================
  // STUDENT 3: Arjun Verma (AI Systems Track)
  // ==========================================
  const student3 = await prisma.user.create({
    data: {
      email: 'arjun.ai@edunexa.edu',
      passwordHash: commonPassword,
      role: 'STUDENT',
      profile: {
        create: {
          name: 'Arjun Verma',
          education: 'Graduate',
          institution: 'IIT Delhi',
          degree: 'B.Tech Artificial Intelligence',
          year: '4th Year',
          interests: ['PyTorch', 'Large Language Models', 'Vector Search', 'Docker', 'RAG'],
          targetTrack: 'AI Systems & Cloud Machine Learning Engineering',
          weeklyLearningHours: 15,
          streakDays: 21,
          xpPoints: 11200,
          rank: 'Master Innovator',
          dailyPace: '3 hours/day',
          readinessScore: 92,
        },
      },
      assessments: {
        create: [
          {
            title: 'AI & Advanced Machine Learning Assessment',
            subject: 'Artificial Intelligence',
            score: 92,
            totalMarks: 100,
            level: 'Advanced',
            weakAreas: ['Distributed Multi-GPU Training', 'Quantization (GGUF/AWQ)'],
            strongAreas: ['PyTorch Neural Nets', 'RAG Pipelines', 'Vector Databases', 'Transformers'],
          },
        ],
      },
      skillRequirements: {
        create: [
          {
            skillName: 'PyTorch & Neural Networks',
            category: 'Prerequisite',
            currentProficiency: 95,
            requiredProficiency: 95,
            status: 'MASTERED',
          },
          {
            skillName: 'RAG Architecture & Embeddings',
            category: 'Core Competency',
            currentProficiency: 90,
            requiredProficiency: 90,
            status: 'MASTERED',
          },
          {
            skillName: 'Scalable Cloud MLOps & Container Deployment',
            category: 'Target Skill',
            currentProficiency: 65,
            requiredProficiency: 90,
            status: 'IN_PROGRESS',
          },
        ],
      },
      learningRules: {
        create: [
          {
            condition: 'Assessment Score > 85%',
            recommendation: 'Accelerated Track: Advanced AI Engineering & Autonomous Agent Orchestration',
            actionItem: 'Deploy Custom Fine-Tuned Model with Docker & FastAPI on Cloud Infrastructure',
            appliedStatus: 'ACTIVE',
          },
        ],
      },
      assignments: {
        create: [
          {
            title: 'Build Production-Grade RAG Pipeline with ChromaDB Vector Store',
            subject: 'AI Engineering',
            description: 'Chunk technical documentation, compute dense embeddings, set up cosine similarity retriever and synthesize responses.',
            difficulty: 'Hard',
            dueDate: new Date(Date.now() + 86400000 * 2),
            status: 'PENDING',
            xpReward: 400,
          },
          {
            title: 'Containerize AI Microservice with Docker & FastAPI',
            subject: 'Cloud MLOps',
            description: 'Write Dockerfile, build lightweight image for PyTorch inference backend, and deploy with rate-limiting.',
            difficulty: 'Hard',
            dueDate: new Date(Date.now() + 86400000 * 4),
            status: 'PENDING',
            xpReward: 500,
          },
        ],
      },
      performanceData: {
        create: {
          overallAccuracy: 92.5,
          completedLabs: 8,
          totalLabsAssigned: 8,
          recommendedTrack: 'Advanced AI Systems & Scalable Cloud MLOps',
          decisionReason: 'Score is 92%. High mastery in AI fundamentals. Directed to advanced containerization, vector retrieval, and LLM deployment.',
        },
      },
    },
  });

  console.log('✅ Successfully seeded 3 Students Dataset into Neon Database:');
  console.log(` 1. ${student1.email} (Rahul Sharma - Python Track)`);
  console.log(` 2. ${student2.email} (Priya Patel - Full Stack Track)`);
  console.log(` 3. ${student3.email} (Arjun Verma - AI Systems Track)`);
  console.log(` 🔑 Password for all 3 users: Student123!`);
}

if (require.main === module) {
  seedDatabase()
    .catch((err) => {
      console.error('❌ Seeding Error:', err);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
