import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
let isDbAvailable = true;

export interface StudentDashboardPayload {
  studentInfo: {
    id: string;
    email: string;
    name: string;
    targetTrack: string;
    education: string;
    institution: string;
    streakDays: number;
    xpPoints: number;
    rank: string;
    dailyPace: string;
    readinessScore: number;
  };
  assessment: {
    title: string;
    subject: string;
    score: number;
    totalMarks: number;
    level: string;
    weakAreas: string[];
    strongAreas: string[];
    evaluatedAt: string;
  };
  skillRequirements: Array<{
    skillName: string;
    category: string;
    currentProficiency: number;
    requiredProficiency: number;
    status: string;
  }>;
  learningRules: Array<{
    condition: string;
    recommendation: string;
    actionItem: string;
    appliedStatus: string;
  }>;
  assignments: Array<{
    id: string;
    title: string;
    subject: string;
    description: string;
    difficulty: string;
    dueDate: string;
    status: string;
    xpReward: number;
  }>;
  performanceData: {
    overallAccuracy: number;
    completedLabs: number;
    totalLabsAssigned: number;
    recommendedTrack: string;
    decisionReason: string;
  };
}

// Fallback structured dataset for 3 students if DB connection is offline
const fallbackStore: Record<string, StudentDashboardPayload> = {
  'rahul.python@edunexa.edu': {
    studentInfo: {
      id: 'usr_student_1_rahul',
      email: 'rahul.python@edunexa.edu',
      name: 'Rahul Sharma',
      targetTrack: 'Python & Data Science Fundamentals',
      education: 'Undergraduate (B.Tech Computer Science)',
      institution: 'Delhi Technological University',
      streakDays: 5,
      xpPoints: 1450,
      rank: 'Silver Apprentice',
      dailyPace: '1.5 hours/day',
      readinessScore: 48,
    },
    assessment: {
      title: 'Python Core Assessment',
      subject: 'Python Fundamentals',
      score: 48,
      totalMarks: 100,
      level: 'Beginner',
      weakAreas: ['Control Flow Loops', 'File Handling I/O', 'Dictionary Operations'],
      strongAreas: ['Variables & Data Types', 'Basic Arithmetic', 'Print Formatting'],
      evaluatedAt: new Date().toISOString(),
    },
    skillRequirements: [
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
    learningRules: [
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
    assignments: [
      {
        id: 'asg_py_1',
        title: 'Python Fundamentals: Control Flow & Iterative Loops Lab',
        subject: 'Python',
        description: 'Implement nested loops, pattern generation, and conditional filtering on dataset lists.',
        difficulty: 'Easy',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        status: 'PENDING',
        xpReward: 150,
      },
      {
        id: 'asg_py_2',
        title: 'Data Structures: Dictionary & Tuple Operations Challenge',
        subject: 'Python Data Structures',
        description: 'Store student records in nested dictionaries and parse json datasets using standard Python modules.',
        difficulty: 'Medium',
        dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        status: 'PENDING',
        xpReward: 200,
      },
    ],
    performanceData: {
      overallAccuracy: 48.5,
      completedLabs: 1,
      totalLabsAssigned: 5,
      recommendedTrack: 'Python & Data Science Foundations',
      decisionReason: 'Score is below 60%. Adaptive engine directed student to strengthen Python logic building before Data Analytics.',
    },
  },

  'priya.fullstack@edunexa.edu': {
    studentInfo: {
      id: 'usr_student_2_priya',
      email: 'priya.fullstack@edunexa.edu',
      name: 'Priya Patel',
      targetTrack: 'Full Stack Web Development (MERN/React+Node)',
      education: 'Postgraduate (M.Tech Software Engineering)',
      institution: 'BITS Pilani',
      streakDays: 14,
      xpPoints: 5800,
      rank: 'Gold Scholar',
      dailyPace: '2 hours/day',
      readinessScore: 78,
    },
    assessment: {
      title: 'Full Stack Web Architecture Benchmark',
      subject: 'Web Development',
      score: 78,
      totalMarks: 100,
      level: 'Intermediate',
      weakAreas: ['Async Event Loop', 'Prisma ORM Migrations', 'Express Error Middleware'],
      strongAreas: ['React Hooks', 'Flexbox/Grid CSS', 'REST API Routing', 'Zod Validation'],
      evaluatedAt: new Date().toISOString(),
    },
    skillRequirements: [
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
    learningRules: [
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
    assignments: [
      {
        id: 'asg_fs_1',
        title: 'Express.js REST API with JWT Authentication & Zod Schema Validation',
        subject: 'Node.js Backend',
        description: 'Implement full CRUD routes with JWT token verification and centralized error handler middleware.',
        difficulty: 'Medium',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        status: 'PENDING',
        xpReward: 250,
      },
      {
        id: 'asg_fs_2',
        title: 'Full-Stack React + Prisma Integration Project',
        subject: 'Full Stack',
        description: 'Connect React frontend with Express API using Axios, state management, and Prisma PostgreSQL database.',
        difficulty: 'Hard',
        dueDate: new Date(Date.now() + 86400000 * 6).toISOString(),
        status: 'PENDING',
        xpReward: 350,
      },
    ],
    performanceData: {
      overallAccuracy: 78.0,
      completedLabs: 4,
      totalLabsAssigned: 6,
      recommendedTrack: 'Full Stack Modern Web Application Architecture',
      decisionReason: 'Score is 78%. Strong frontend proficiency detected. Recommended focus on Node.js backend & PostgreSQL integration.',
    },
  },

  'arjun.ai@edunexa.edu': {
    studentInfo: {
      id: 'usr_student_3_arjun',
      email: 'arjun.ai@edunexa.edu',
      name: 'Arjun Verma',
      targetTrack: 'AI Systems & Cloud Machine Learning Engineering',
      education: 'Graduate (B.Tech Artificial Intelligence)',
      institution: 'IIT Delhi',
      streakDays: 21,
      xpPoints: 11200,
      rank: 'Master Innovator',
      dailyPace: '3 hours/day',
      readinessScore: 92,
    },
    assessment: {
      title: 'AI & Advanced Machine Learning Assessment',
      subject: 'Artificial Intelligence',
      score: 92,
      totalMarks: 100,
      level: 'Advanced',
      weakAreas: ['Distributed Multi-GPU Training', 'Quantization (GGUF/AWQ)'],
      strongAreas: ['PyTorch Neural Nets', 'RAG Pipelines', 'Vector Databases', 'Transformers'],
      evaluatedAt: new Date().toISOString(),
    },
    skillRequirements: [
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
    learningRules: [
      {
        condition: 'Assessment Score > 85%',
        recommendation: 'Accelerated Track: Advanced AI Engineering & Autonomous Agent Orchestration',
        actionItem: 'Deploy Custom Fine-Tuned Model with Docker & FastAPI on Cloud Infrastructure',
        appliedStatus: 'ACTIVE',
      },
    ],
    assignments: [
      {
        id: 'asg_ai_1',
        title: 'Build Production-Grade RAG Pipeline with ChromaDB Vector Store',
        subject: 'AI Engineering',
        description: 'Chunk technical documentation, compute dense embeddings, set up cosine similarity retriever and synthesize responses.',
        difficulty: 'Hard',
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        status: 'PENDING',
        xpReward: 400,
      },
      {
        id: 'asg_ai_2',
        title: 'Containerize AI Microservice with Docker & FastAPI',
        subject: 'Cloud MLOps',
        description: 'Write Dockerfile, build lightweight image for PyTorch inference backend, and deploy with rate-limiting.',
        difficulty: 'Hard',
        dueDate: new Date(Date.now() + 86400000 * 4).toISOString(),
        status: 'PENDING',
        xpReward: 500,
      },
    ],
    performanceData: {
      overallAccuracy: 92.5,
      completedLabs: 8,
      totalLabsAssigned: 8,
      recommendedTrack: 'Advanced AI Systems & Scalable Cloud MLOps',
      decisionReason: 'Score is 92%. High mastery in AI fundamentals. Directed to advanced containerization, vector retrieval, and LLM deployment.',
    },
  },
};

const createZeroStatePayload = (userId: string, name: string, email: string): StudentDashboardPayload => ({
  studentInfo: {
    id: userId,
    email: email,
    name: name || email.split('@')[0],
    targetTrack: 'General Software Engineering & Skill Diagnostic Track',
    education: 'Self-Learner (New Account)',
    institution: 'EduNexa Student Portal',
    streakDays: 0,
    xpPoints: 0,
    rank: 'Novice Learner (Level 1)',
    dailyPace: '1 hour/day',
    readinessScore: 0,
  },
  assessment: {
    title: 'Initial Diagnostic Skill Assessment',
    subject: 'General Foundations',
    score: 0,
    totalMarks: 100,
    level: 'Unassessed',
    weakAreas: ['Diagnostic Test Pending - Complete assessment to identify skill gaps'],
    strongAreas: ['New Account Registered - Ready to start learning!'],
    evaluatedAt: new Date().toISOString(),
  },
  skillRequirements: [
    { skillName: 'Programming Fundamentals', category: 'Foundation', currentProficiency: 0, requiredProficiency: 80, status: 'NOT_STARTED' },
    { skillName: 'Logic & Problem Solving', category: 'Core Competency', currentProficiency: 0, requiredProficiency: 80, status: 'NOT_STARTED' },
    { skillName: 'Web & System Basics', category: 'Target Skill', currentProficiency: 0, requiredProficiency: 75, status: 'NOT_STARTED' },
  ],
  learningRules: [
    {
      condition: 'New Account (Score: 0%)',
      recommendation: 'Complete Diagnostic Assessment to Generate AI Learning Path',
      actionItem: 'Take initial diagnostic skill assessment in Skill Assessments tab',
      appliedStatus: 'PENDING_ASSESSMENT',
    },
  ],
  assignments: [
    {
      id: `asg_new_${Date.now()}`,
      title: 'Welcome Lab: Complete Diagnostic Assessment',
      subject: 'Onboarding',
      description: 'Take your first skill diagnostic test to help NexaAI understand your strengths and customize your learning path.',
      difficulty: 'Easy',
      dueDate: new Date(Date.now() + 86400000).toISOString(),
      status: 'PENDING',
      xpReward: 100,
    },
  ],
  performanceData: {
    overallAccuracy: 0.0,
    completedLabs: 0,
    totalLabsAssigned: 1,
    recommendedTrack: 'Diagnostic Assessment Recommended',
    decisionReason: 'New account registered. Take your initial diagnostic test to unlock customized assignments.',
  },
});

export const adaptiveService = {
  /**
   * Fetch complete student adaptive data payload by User ID or Email
   */
  async getStudentDashboardData(userId: string, userEmail?: string): Promise<StudentDashboardPayload> {
    const zeroState = createZeroStatePayload(userId, userEmail?.split('@')[0] || 'New Student', userEmail || 'newstudent@edunexa.edu');

    if (isDbAvailable) {
      try {
        const user = await prisma.user.findFirst({
          where: {
            OR: [{ id: userId }, ...(userEmail ? [{ email: userEmail.toLowerCase() }] : [])],
          },
          include: {
            profile: true,
            assessments: { orderBy: { evaluatedAt: 'desc' }, take: 1 },
            skillRequirements: true,
            learningRules: true,
            assignments: true,
            performanceData: true,
          },
        });

        if (user && user.profile) {
          const latestAssessment = user.assessments[0];
          return {
            studentInfo: {
              id: user.id,
              email: user.email,
              name: user.profile.name,
              targetTrack: user.profile.targetTrack || zeroState.studentInfo.targetTrack,
              education: user.profile.education || zeroState.studentInfo.education,
              institution: user.profile.institution || zeroState.studentInfo.institution,
              streakDays: user.profile.streakDays ?? 0,
              xpPoints: user.profile.xpPoints ?? 0,
              rank: user.profile.rank || zeroState.studentInfo.rank,
              dailyPace: user.profile.dailyPace || zeroState.studentInfo.dailyPace,
              readinessScore: user.profile.readinessScore ?? 0,
            },
            assessment: latestAssessment
              ? {
                  title: latestAssessment.title,
                  subject: latestAssessment.subject,
                  score: latestAssessment.score,
                  totalMarks: latestAssessment.totalMarks,
                  level: latestAssessment.level,
                  weakAreas: latestAssessment.weakAreas,
                  strongAreas: latestAssessment.strongAreas,
                  evaluatedAt: latestAssessment.evaluatedAt.toISOString(),
                }
              : zeroState.assessment,
            skillRequirements: user.skillRequirements.length > 0
              ? user.skillRequirements.map((s) => ({
                  skillName: s.skillName,
                  category: s.category,
                  currentProficiency: s.currentProficiency,
                  requiredProficiency: s.requiredProficiency,
                  status: s.status,
                }))
              : zeroState.skillRequirements,
            learningRules: user.learningRules.length > 0
              ? user.learningRules.map((r) => ({
                  condition: r.condition,
                  recommendation: r.recommendation,
                  actionItem: r.actionItem,
                  appliedStatus: r.appliedStatus,
                }))
              : zeroState.learningRules,
            assignments: user.assignments.length > 0
              ? user.assignments.map((a) => ({
                  id: a.id,
                  title: a.title,
                  subject: a.subject,
                  description: a.description,
                  difficulty: a.difficulty,
                  dueDate: a.dueDate.toISOString(),
                  status: a.status,
                  xpReward: a.xpReward,
                }))
              : zeroState.assignments,
            performanceData: user.performanceData
              ? {
                  overallAccuracy: user.performanceData.overallAccuracy,
                  completedLabs: user.performanceData.completedLabs,
                  totalLabsAssigned: user.performanceData.totalLabsAssigned,
                  recommendedTrack: user.performanceData.recommendedTrack,
                  decisionReason: user.performanceData.decisionReason,
                }
              : zeroState.performanceData,
          };
        }
      } catch (err) {
        isDbAvailable = false;
      }
    }

    // Match by email or return zero state for new account
    if (userEmail && fallbackStore[userEmail.toLowerCase()]) {
      return fallbackStore[userEmail.toLowerCase()];
    }

    return zeroState;
  },

  /**
   * Evaluate adaptive rules based on assessment score & target subject
   */
  async evaluateAdaptiveRules(score: number, targetSubject: string) {
    let recommendedTrack = '';
    let decisionReason = '';
    let rulesApplied = [] as string[];

    if (score < 60) {
      recommendedTrack = `${targetSubject} Foundations & Core Logic Building`;
      decisionReason = `Assessment score (${score}/100) is below 60%. Rule R1 applied: Direct student to fundamentals before advanced projects.`;
      rulesApplied.push('RULE_BEGINNER_FOUNDATION');
    } else if (score >= 60 && score <= 85) {
      recommendedTrack = `Intermediate ${targetSubject} Architecture & Full Project Integration`;
      decisionReason = `Assessment score (${score}/100) is solid (60-85%). Rule R2 applied: Direct student to intermediate implementation labs.`;
      rulesApplied.push('RULE_INTERMEDIATE_BUILDER');
    } else {
      recommendedTrack = `Advanced ${targetSubject} Systems & Cloud Microservices`;
      decisionReason = `Assessment score (${score}/100) is excellent (>85%). Rule R3 applied: Accelerated path with production architecture.`;
      rulesApplied.push('RULE_ADVANCED_ACCELERATED');
    }

    return {
      score,
      targetSubject,
      recommendedTrack,
      decisionReason,
      rulesApplied,
    };
  },
};
