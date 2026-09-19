// Student-Specific Dataset Generator for 3 Distinct Student Accounts
// 1. Rahul Sharma (rahul.python@edunexa.edu) - Python & Data Science Track
// 2. Priya Patel (priya.fullstack@edunexa.edu) - Full Stack Web Development Track
// 3. Arjun Verma (arjun.ai@edunexa.edu) - AI Systems & Cloud MLOps Track

export const STUDENT_PROFILES_DATA = {
  // ==========================================
  // STUDENT 1: Rahul Sharma (Python & Data Science)
  // ==========================================
  'rahul.python@edunexa.edu': {
    targetRole: 'Python Data Analyst & Science Track',
    readinessScore: 48,
    careerGoal: 'Python & Data Science Fundamentals',
    institution: 'Delhi Technological University',
    degree: 'B.Tech Computer Science (2nd Year)',
    streakDays: 5,
    xpPoints: 1450,
    rank: 'Silver Apprentice',
    dailyPace: '1.5 hours/day',

    roadmap: [
      {
        phaseId: 'p1',
        phaseTitle: 'Phase 1: Python Basic Syntax & Logic Building',
        duration: 'Weeks 1-3',
        progressPercent: 40,
        description: 'Master variables, data types, conditional control flow, loops, and function declarations.',
        modules: [
          {
            id: 'm1_py',
            title: 'Python Variables & Primitive Types',
            duration: '45 mins',
            status: 'completed',
            type: 'Interactive Coding',
            score: 85,
            progress: 100,
            skillsGained: ['Python Syntax', 'Variables', 'Data Types'],
          },
          {
            id: 'm2_py',
            title: 'Control Flow: Iterative Loops & Pattern Logic',
            duration: '1.5 hrs',
            status: 'in-progress',
            type: 'Hands-on Lab',
            progress: 40,
            skillsGained: ['For Loops', 'While Loops', 'Conditionals'],
          },
          {
            id: 'm3_py',
            title: 'Functions & Scope Management',
            duration: '1 hr',
            status: 'unlocked',
            type: 'Practice Project',
            skillsGained: ['Def Functions', 'Parameters', 'Return Values'],
          },
        ],
      },
      {
        phaseId: 'p2',
        phaseTitle: 'Phase 2: Data Wrangling with NumPy & Pandas',
        duration: 'Weeks 4-6',
        progressPercent: 0,
        description: 'Clean unstructured datasets, filter rows, compute aggregates, and merge DataFrames.',
        modules: [
          {
            id: 'm4_py',
            title: 'NumPy N-Dimensional Arrays & Vectorization',
            duration: '2 hrs',
            status: 'locked',
            type: 'Hands-on Lab',
            skillsGained: ['NumPy Arrays', 'Slicing', 'Math Operations'],
          },
          {
            id: 'm5_py',
            title: 'Pandas DataFrames & CSV Dataset Parsing',
            duration: '2.5 hrs',
            status: 'locked',
            type: 'Data Project',
            skillsGained: ['Pandas', 'Data Filtering', 'CSV Parsing'],
          },
        ],
      },
      {
        phaseId: 'p3',
        phaseTitle: 'Phase 3: Exploratory Data Analysis & Visualization',
        duration: 'Weeks 7-9',
        progressPercent: 0,
        description: 'Create charts with Matplotlib & Seaborn to uncover hidden insights.',
        modules: [
          {
            id: 'm6_py',
            title: 'Matplotlib & Seaborn Data Charts',
            duration: '2 hrs',
            status: 'locked',
            type: 'Visualization Lab',
            skillsGained: ['Matplotlib', 'Bar Charts', 'Scatter Plots'],
          },
        ],
      },
    ],

    assessments: [
      {
        id: 'assg_py_1',
        title: 'Python Logic, Control Flow & Data Science Benchmark',
        subject: 'Python Fundamentals',
        category: 'Python',
        level: 'Beginner - Intermediate',
        timeLimitMinutes: 15,
        questionsCount: 5,
        rewardXP: 250,
        score: 48,
        totalMarks: 100,
        status: 'Evaluated',
        weakAreas: ['Control Flow Loops', 'File Handling I/O', 'Dictionary Operations'],
        strongAreas: ['Variables & Data Types', 'Basic Arithmetic', 'Print Formatting'],
        questions: [
          {
            id: 'q1_py',
            question: 'What will be the output of print([x**2 for x in range(4) if x % 2 == 0]) in Python?',
            options: ['[0, 4]', '[0, 1, 4, 9]', '[1, 9]', '[4]'],
            correctAnswer: 0,
            explanation: 'range(4) produces 0, 1, 2, 3. The condition x % 2 == 0 filters 0 and 2. 0^2 = 0, 2^2 = 4. Result is [0, 4].',
          },
          {
            id: 'q2_py',
            question: 'Which method safely retrieves a value from dictionary data = {"a": 1} without raising KeyError if key "b" is missing?',
            options: ['data.get("b", 0)', 'data["b"]', 'data.fetch("b")', 'data.read("b")'],
            correctAnswer: 0,
            explanation: 'dict.get(key, default) returns the specified default value (0) instead of throwing a KeyError.',
          },
          {
            id: 'q3_py',
            question: 'Which mode string should be passed to open("data.txt", mode) to append data to an existing file?',
            options: ['"w"', '"a"', '"r+"', '"x"'],
            correctAnswer: 1,
            explanation: 'Mode "a" stands for append, writing new content to the end of the file without overwriting.',
          },
          {
            id: 'q4_py',
            question: 'What happens if you attempt to reassign an element of a tuple t = (1, 2, 3) via t[0] = 9?',
            options: [
              'Tuple becomes (9, 2, 3)',
              'Raises TypeError: tuple object does not support item assignment',
              'Creates a new list automatically',
              'Silently ignores the assignment'
            ],
            correctAnswer: 1,
            explanation: 'Tuples in Python are immutable sequence types. Attempting item assignment raises a TypeError.',
          },
          {
            id: 'q5_py',
            question: 'In Pandas, which function is used to calculate summary statistics (count, mean, std, min, max) of a DataFrame?',
            options: ['df.summary()', 'df.describe()', 'df.stats()', 'df.info()'],
            correctAnswer: 1,
            explanation: 'df.describe() generates descriptive numerical statistics for numerical columns in a Pandas DataFrame.',
          },
        ],
      },
    ],

    practiceChallenges: [
      {
        id: 'chal_py_1',
        title: 'Python List Comprehension & Filter Lab',
        category: 'Python Logic',
        difficulty: 'Easy',
        xp: 150,
        description: 'Write a Python function to filter even numbers and calculate square values using list comprehensions.',
        initialCode: `def filter_squares(numbers):\n    # TODO: Return list of squared even numbers\n    pass\n\nprint(filter_squares([1, 2, 3, 4, 5, 6]))`,
        expectedOutput: `[4, 16, 36]`,
        hints: ['Use list comprehension syntax [x**2 for x in numbers if x % 2 == 0]', 'Verify modulo check % 2 == 0'],
      },
      {
        id: 'chal_py_2',
        title: 'Dictionary Nested Data Parsing Challenge',
        category: 'Data Structures',
        difficulty: 'Medium',
        xp: 200,
        description: 'Extract student emails and highest grade from a nested JSON dictionary.',
        initialCode: `def parse_student_data(data):\n    # TODO: Extract high scores\n    pass`,
        expectedOutput: `{"top_student": "Rahul", "score": 92}`,
        hints: ['Iterate using dict.items()', 'Keep track of max score variable'],
      },
    ],

    projects: [
      {
        id: 'proj_py_1',
        title: 'Automated CSV Sales Data Cleaner Script',
        category: 'Data Science',
        level: 'Beginner',
        description: 'Build a Python CLI script that removes duplicate rows, replaces missing values, and exports cleaned CSV reports.',
        skillsRequired: ['Python', 'Pandas', 'File I/O'],
      },
      {
        id: 'proj_py_2',
        title: 'E-Commerce Customer Behavior EDA Dashboard',
        category: 'Data Analytics',
        level: 'Intermediate',
        description: 'Perform exploratory data analysis on 10,000 retail transaction records using Pandas and Seaborn.',
        skillsRequired: ['Pandas', 'Seaborn', 'Statistical Analysis'],
      },
    ],

    plannerEvents: [
      { id: 'ev1', title: 'Python Control Flow & Loops Practice', time: '05:00 PM - 06:00 PM', day: 'Mon', status: 'done', xp: 45 },
      { id: 'ev2', title: 'Dictionary & Tuple Operations Lab', time: '06:00 PM - 07:30 PM', day: 'Wed', status: 'pending', xp: 60 },
      { id: 'ev3', title: 'CSV Data Cleaner Project Setup', time: '04:00 PM - 05:30 PM', day: 'Fri', status: 'pending', xp: 100 },
    ],

    exploreResources: [
      { title: 'Python for Data Analysis (3rd Edition)', type: 'Book / Reference', author: 'Wes McKinney', link: '#' },
      { title: 'Automate the Boring Stuff with Python', type: 'Interactive Guide', author: 'Al Sweigart', link: '#' },
    ],
  },

  // ==========================================
  // STUDENT 2: Priya Patel (Full Stack Web Development)
  // ==========================================
  'priya.fullstack@edunexa.edu': {
    targetRole: 'Full Stack Web Developer (MERN)',
    readinessScore: 78,
    careerGoal: 'Full Stack Web Development (MERN/React+Node)',
    institution: 'BITS Pilani',
    degree: 'M.Tech Software Engineering (1st Year)',
    streakDays: 14,
    xpPoints: 5800,
    rank: 'Gold Scholar',
    dailyPace: '2 hours/day',

    roadmap: [
      {
        phaseId: 'p1',
        phaseTitle: 'Phase 1: Advanced Modern JavaScript & React Architecture',
        duration: 'Weeks 1-4',
        progressPercent: 100,
        description: 'Master ES6+, React Hooks, State Management with Zustand, and Component lifecycle.',
        modules: [
          {
            id: 'm1_fs',
            title: 'ES6+ Async/Await & Microtask Event Loop',
            duration: '1 hr',
            status: 'completed',
            type: 'Coding Lab',
            score: 95,
            progress: 100,
            skillsGained: ['Async/Await', 'Promises', 'Event Loop'],
          },
          {
            id: 'm2_fs',
            title: 'React Custom Hooks & State Synchronization',
            duration: '2 hrs',
            status: 'completed',
            type: 'Component Lab',
            score: 90,
            progress: 100,
            skillsGained: ['React Hooks', 'Zustand', 'Context API'],
          },
        ],
      },
      {
        phaseId: 'p2',
        phaseTitle: 'Phase 2: Node.js, Express REST API & Auth Security',
        duration: 'Weeks 5-8',
        progressPercent: 65,
        description: 'Build production REST APIs with Express, JWT authentication, and Zod input validation.',
        modules: [
          {
            id: 'm3_fs',
            title: 'Express.js Router & JWT Auth Middleware',
            duration: '2.5 hrs',
            status: 'in-progress',
            type: 'Backend Lab',
            progress: 65,
            skillsGained: ['Express.js', 'JWT Auth', 'Middleware'],
          },
          {
            id: 'm4_fs',
            title: 'Zod Input Schema Validation & Error Handling',
            duration: '1.5 hrs',
            status: 'unlocked',
            type: 'API Lab',
            skillsGained: ['Zod Validation', 'Centralized Errors'],
          },
        ],
      },
      {
        phaseId: 'p3',
        phaseTitle: 'Phase 3: PostgreSQL Database Integration & Prisma ORM',
        duration: 'Weeks 9-12',
        progressPercent: 0,
        description: 'Design relational database schemas, migrations, seed scripts, and complex JOIN queries.',
        modules: [
          {
            id: 'm5_fs',
            title: 'Prisma ORM PostgreSQL Schema & Migrations',
            duration: '3 hrs',
            status: 'locked',
            type: 'Database Project',
            skillsGained: ['PostgreSQL', 'Prisma ORM', 'Schema Migration'],
          },
        ],
      },
    ],

    assessments: [
      {
        id: 'assg_fs_1',
        title: 'Full Stack React, Node.js & Database Architecture Benchmark',
        subject: 'Web Development',
        category: 'Full Stack Web',
        level: 'Intermediate',
        timeLimitMinutes: 15,
        questionsCount: 5,
        rewardXP: 350,
        score: 78,
        totalMarks: 100,
        status: 'Evaluated',
        weakAreas: ['Async Event Loop', 'Prisma ORM Migrations', 'Express Error Middleware'],
        strongAreas: ['React Hooks', 'Flexbox/Grid CSS', 'REST API Routing', 'Zod Validation'],
        questions: [
          {
            id: 'q1_fs',
            question: 'When does the effect callback in useEffect(fn, []) with an empty dependency array execute in React?',
            options: [
              'On every component render',
              'Only once after the initial component mount',
              'Before component renders',
              'Whenever state changes'
            ],
            correctAnswer: 1,
            explanation: 'An empty dependency array [] tells React that the effect does not depend on any props or state, so it executes only once after mounting.',
          },
          {
            id: 'q2_fs',
            question: 'In Express.js middleware (req, res, next) => {}, what is the purpose of invoking next()?',
            options: [
              'Closes the HTTP connection',
              'Passes control to the next middleware in the execution stack',
              'Restarts the Express application',
              'Renders an HTML template'
            ],
            correctAnswer: 1,
            explanation: 'next() tells Express to hand off execution to the next middleware in line. Omitting it hangs the request.',
          },
          {
            id: 'q3_fs',
            question: 'Which HTTP method should be used for making partial updates to an existing API resource?',
            options: ['GET', 'POST', 'PATCH', 'DELETE'],
            correctAnswer: 2,
            explanation: 'HTTP PATCH is specified for partial modifications to a resource, while PUT replaces the entire resource entity.',
          },
          {
            id: 'q4_fs',
            question: 'In PostgreSQL & Prisma ORM, which command applies schema changes to the database and syncs Prisma Client?',
            options: ['npx prisma migrate dev', 'npx prisma init', 'npx prisma push --force', 'npx prisma compile'],
            correctAnswer: 0,
            explanation: 'npx prisma migrate dev creates SQL migration files, runs them on PostgreSQL, and updates the generated Prisma Client.',
          },
          {
            id: 'q5_fs',
            question: 'Where should JWT tokens be attached when making secure authenticated API requests?',
            options: [
              'Authorization: Bearer <token> in HTTP Request Headers',
              'Body JSON payload only',
              'URL query string ?token=...',
              'HTML meta tag'
            ],
            correctAnswer: 0,
            explanation: 'Standard security practices mandate passing JWT tokens in the Authorization HTTP header with Bearer schema.',
          },
        ],
      },
    ],

    practiceChallenges: [
      {
        id: 'chal_fs_1',
        title: 'Express REST API with JWT Auth & Zod Schema',
        category: 'Node.js Backend',
        difficulty: 'Medium',
        xp: 250,
        description: 'Implement Express middleware for JWT bearer token verification and return sanitized JSON user payload.',
        initialCode: `const express = require('express');\nconst app = express();\n// TODO: Implement JWT Middleware\napp.use(express.json());`,
        expectedOutput: `200 OK: User Authenticated`,
        hints: ['Extract Bearer token from req.headers.authorization', 'Use jwt.verify(token, secret)'],
      },
      {
        id: 'chal_fs_2',
        title: 'Full-Stack React + Prisma Integration Project',
        category: 'Full Stack',
        difficulty: 'Hard',
        xp: 350,
        description: 'Connect React frontend with Express REST endpoints and query Prisma PostgreSQL database.',
        initialCode: `import { prisma } from './db';\n// TODO: Query users with profiles`,
        expectedOutput: `Database Query Executed Successfully`,
        hints: ['Use prisma.user.findMany({ include: { profile: true } })'],
      },
    ],

    projects: [
      {
        id: 'proj_fs_1',
        title: 'Multi-Tenant SaaS Backend with Express & Prisma',
        category: 'Backend Architecture',
        level: 'Intermediate',
        description: 'Build a production-ready Express backend service featuring role-based access control, Prisma ORM, and JWT refresh tokens.',
        skillsRequired: ['Node.js', 'Express', 'Prisma', 'PostgreSQL'],
      },
      {
        id: 'proj_fs_2',
        title: 'Real-Time Collaborative Kanban Workspace',
        category: 'Full Stack Web',
        level: 'Advanced',
        description: 'Develop a modern drag-and-drop task board with React, Socket.io real-time web-sockets, and TailwindCSS.',
        skillsRequired: ['React', 'Zustand', 'Socket.io', 'TailwindCSS'],
      },
    ],

    plannerEvents: [
      { id: 'ev1', title: 'Express REST Router & Middleware Setup', time: '04:00 PM - 06:00 PM', day: 'Tue', status: 'done', xp: 80 },
      { id: 'ev2', title: 'Prisma Relational Schema & Migration', time: '06:00 PM - 08:00 PM', day: 'Thu', status: 'pending', xp: 120 },
      { id: 'ev3', title: 'Full Stack React Integration Testing', time: '03:00 PM - 05:00 PM', day: 'Sat', status: 'pending', xp: 150 },
    ],

    exploreResources: [
      { title: 'Node.js & Express Design Patterns Guide', type: 'Architecture Spec', author: 'Mario Casciaro', link: '#' },
      { title: 'Prisma ORM Official Production Docs', type: 'Official Docs', author: 'Prisma Team', link: '#' },
    ],
  },

  // ==========================================
  // STUDENT 3: Arjun Verma (AI Systems & Cloud MLOps)
  // ==========================================
  'arjun.ai@edunexa.edu': {
    targetRole: 'AI Systems Lead & Cloud MLOps Architect',
    readinessScore: 92,
    careerGoal: 'AI Systems & Cloud Machine Learning',
    institution: 'IIT Delhi',
    degree: 'B.Tech Artificial Intelligence (4th Year)',
    streakDays: 21,
    xpPoints: 11200,
    rank: 'Master Innovator',
    dailyPace: '3 hours/day',

    roadmap: [
      {
        phaseId: 'p1',
        phaseTitle: 'Phase 1: PyTorch Deep Learning & Transformer Models',
        duration: 'Weeks 1-4',
        progressPercent: 100,
        description: 'Build custom neural network architectures, attention mechanisms, and Transformer encoders in PyTorch.',
        modules: [
          {
            id: 'm1_ai',
            title: 'PyTorch Neural Network Forward/Backward Pass',
            duration: '2 hrs',
            status: 'completed',
            type: 'DL Lab',
            score: 98,
            progress: 100,
            skillsGained: ['PyTorch', 'Autograd', 'Tensors'],
          },
          {
            id: 'm2_ai',
            title: 'Transformer Self-Attention & Multi-Head Heads',
            duration: '3 hrs',
            status: 'completed',
            type: 'Advanced AI',
            score: 94,
            progress: 100,
            skillsGained: ['Self-Attention', 'Transformers', 'Embeddings'],
          },
        ],
      },
      {
        phaseId: 'p2',
        phaseTitle: 'Phase 2: RAG Architecture & Dense Vector Search',
        duration: 'Weeks 5-8',
        progressPercent: 95,
        description: 'Build high-performance Retrieval-Augmented Generation pipelines using vector databases.',
        modules: [
          {
            id: 'm3_ai',
            title: 'ChromaDB & FAISS Vector Indexing',
            duration: '2.5 hrs',
            status: 'completed',
            type: 'Vector Search',
            score: 92,
            progress: 100,
            skillsGained: ['Vector DB', 'Embeddings', 'Cosine Similarity'],
          },
        ],
      },
      {
        phaseId: 'p3',
        phaseTitle: 'Phase 3: Cloud MLOps & Docker Container Deployment',
        duration: 'Weeks 9-12',
        progressPercent: 70,
        description: 'Package inference microservices into lightweight Docker images and deploy with FastAPI on cloud compute.',
        modules: [
          {
            id: 'm4_ai',
            title: 'Containerize AI Microservice with Docker & FastAPI',
            duration: '3 hrs',
            status: 'in-progress',
            type: 'Cloud MLOps Lab',
            progress: 70,
            skillsGained: ['Docker', 'FastAPI', 'Cloud MLOps'],
          },
          {
            id: 'm5_ai',
            title: 'LLM Model Quantization (AWQ/GGUF) & GPU Serving',
            duration: '3 hrs',
            status: 'unlocked',
            type: 'Model Optimization',
            skillsGained: ['Quantization', 'vLLM', 'CUDA'],
          },
        ],
      },
    ],

    assessments: [
      {
        id: 'assg_ai_1',
        title: 'Advanced AI Systems, RAG Pipelines & Cloud MLOps Benchmark',
        subject: 'Artificial Intelligence',
        category: 'AI & Cloud MLOps',
        level: 'Advanced',
        timeLimitMinutes: 15,
        questionsCount: 5,
        rewardXP: 450,
        score: 92,
        totalMarks: 100,
        status: 'Evaluated',
        weakAreas: ['Distributed Multi-GPU Training', 'Quantization (GGUF/AWQ)'],
        strongAreas: ['PyTorch Neural Nets', 'RAG Pipelines', 'Vector Databases', 'Transformers'],
        questions: [
          {
            id: 'q1_ai',
            question: 'What is the primary role of Dense Vector Embeddings in RAG (Retrieval-Augmented Generation) architectures?',
            options: [
              'Compiling Python code to C++',
              'Converting raw text into high-dimensional vector representations for semantic similarity search',
              'Encrypting API keys in database',
              'Generating frontend CSS layouts'
            ],
            correctAnswer: 1,
            explanation: 'Embeddings map text tokens into vector space where semantically similar documents lie close together for vector search.',
          },
          {
            id: 'q2_ai',
            question: 'In PyTorch model training loops, why is optimizer.zero_grad() called before loss.backward()?',
            options: [
              'To reset model weights to zero',
              'To clear accumulated gradients from previous iterations',
              'To free up GPU memory',
              'To log metrics to TensorBoard'
            ],
            correctAnswer: 1,
            explanation: 'PyTorch accumulates gradients by default. Calling zero_grad() ensures gradients from previous mini-batches do not contaminate current step calculations.',
          },
          {
            id: 'q3_ai',
            question: 'Which distance metric measures the angle between two embedding vectors regardless of their magnitude?',
            options: ['Manhattan Distance', 'Cosine Similarity', 'Euclidean Distance', 'Hamming Distance'],
            correctAnswer: 1,
            explanation: 'Cosine Similarity evaluates the cosine of the angle between two multi-dimensional vectors, normalizing for vector length.',
          },
          {
            id: 'q4_ai',
            question: 'What is the main advantage of Multi-Stage Docker builds for deploying AI inference services?',
            options: [
              'Increases Internet download speed',
              'Drastically reduces final container image size by discarding build dependencies',
              'Auto-tunes model hyperparameters',
              'Generates synthetic datasets'
            ],
            correctAnswer: 1,
            explanation: 'Multi-stage Docker builds isolate build environments from runtime images, producing lightweight images (<450MB) for fast cloud deployment.',
          },
          {
            id: 'q5_ai',
            question: 'What is the primary benefit of 4-bit/8-bit Model Quantization (AWQ/GGUF) in LLM inference?',
            options: [
              'Increases parameter count by 4x',
              'Reduces GPU VRAM footprint allowing large models to run on edge/smaller GPUs with minimal accuracy loss',
              'Converts PyTorch code to JavaScript',
              'Eliminates the need for training data'
            ],
            correctAnswer: 1,
            explanation: 'Quantization compresses FP16 weights into 4-bit integers, reducing VRAM usage by ~70% while preserving benchmark accuracy.',
          },
        ],
      },
    ],

    practiceChallenges: [
      {
        id: 'chal_ai_1',
        title: 'Build Production RAG Pipeline with ChromaDB Vector Store',
        category: 'AI Engineering',
        difficulty: 'Hard',
        xp: 400,
        description: 'Chunk technical documentation, compute dense embeddings, set up cosine similarity retriever and synthesize AI responses.',
        initialCode: `import chromadb\n# TODO: Initialize vector collection and query top 3 chunks`,
        expectedOutput: `Top-k Matches Retrieved with Cosine Similarity > 0.85`,
        hints: ['Use chromadb.Client()', 'Pass query_embeddings to collection.query()'],
      },
      {
        id: 'chal_ai_2',
        title: 'Containerize AI Microservice with Docker & FastAPI',
        category: 'Cloud MLOps',
        difficulty: 'Hard',
        xp: 500,
        description: 'Write optimized multi-stage Dockerfile for PyTorch FastAPI inference microservice.',
        initialCode: `FROM python:3.11-slim\n# TODO: Write Docker container setup`,
        expectedOutput: `Docker Image Built Successfully (Size < 450MB)`,
        hints: ['Use --no-cache-dir pip install', 'Expose port 8000 for FastAPI uvicorn'],
      },
    ],

    projects: [
      {
        id: 'proj_ai_1',
        title: 'Autonomous Multi-Agent AI Code Auditor System',
        category: 'Autonomous Agents',
        level: 'Advanced',
        description: 'Orchestrate 5 specialized LLM subagents to audit codebases for security vulnerabilities, static lint errors, and performance bottlenecks.',
        skillsRequired: ['LangGraph', 'Python', 'FastAPI', 'Vector Search'],
      },
      {
        id: 'proj_ai_2',
        title: 'Scalable Distributed RAG Engine on Cloud Infrastructure',
        category: 'Cloud MLOps',
        level: 'Expert',
        description: 'Deploy a hybrid vector-keyword search engine handling 100,000 document queries per minute with latency < 50ms.',
        skillsRequired: ['PyTorch', 'vLLM', 'Docker', 'Kubernetes'],
      },
    ],

    plannerEvents: [
      { id: 'ev1', title: 'Dense Embeddings & Vector Indexing Lab', time: '02:00 PM - 05:00 PM', day: 'Mon', status: 'done', xp: 150 },
      { id: 'ev2', title: 'Docker Multi-Stage Build & FastAPI Deploy', time: '03:00 PM - 06:00 PM', day: 'Wed', status: 'pending', xp: 200 },
      { id: 'ev3', title: 'LLM Agent Fine-Tuning & Quantization', time: '01:00 PM - 04:00 PM', day: 'Sun', status: 'pending', xp: 250 },
    ],

    exploreResources: [
      { title: 'Deep Learning with PyTorch & Transformers Guide', type: 'Research Paper', author: 'Vaswani et al.', link: '#' },
      { title: 'Production MLOps Engineering Best Practices', type: 'Architecture Spec', author: 'Google DeepMind AI', link: '#' },
    ],
  },
};

/**
 * Zero-State Dataset for newly registered accounts
 */
export const NEW_STUDENT_ZERO_DATA = {
  targetRole: 'General Software Engineering & Skill Diagnostic Track',
  readinessScore: 0,
  careerGoal: 'General Computer Science & Skill Assessment',
  institution: 'EduNexa Student Portal',
  degree: 'Self-Learner (New Account)',
  streakDays: 0,
  xpPoints: 0,
  rank: 'Novice Learner (Level 1)',
  dailyPace: '1 hour/day',

  roadmap: [
    {
      phaseId: 'p1_new',
      phaseTitle: 'Phase 1: Initial Skill Assessment & Logic Foundations',
      duration: 'Week 1',
      progressPercent: 0,
      description: 'Complete your initial diagnostic test to unlock customized AI recommendations and learning modules.',
      modules: [
        {
          id: 'm1_new',
          title: 'EduNexa Diagnostic Skill Assessment',
          duration: '30 mins',
          status: 'in-progress',
          type: 'Diagnostic Test',
          progress: 0,
          skillsGained: ['Logic Assessment', 'Skill Gap Analysis'],
        },
        {
          id: 'm2_new',
          title: 'Programming Logic Warmup Lab',
          duration: '45 mins',
          status: 'unlocked',
          type: 'Hands-on Lab',
          progress: 0,
          skillsGained: ['Control Flow', 'Basic Syntax'],
        },
      ],
    },
  ],

  practiceChallenges: [
    {
      id: 'pc_new_1',
      title: 'Starter Challenge: Hello World & Syntax Warmup',
      category: 'Fundamentals',
      difficulty: 'Easy',
      xp: 100,
      description: 'Write your first starter code block to verify your environment.',
      initialCode: `// Welcome to EduNexa!\n// Write code to output: Hello EduNexa\nconsole.log("Hello EduNexa!");`,
      expectedOutput: `Hello EduNexa!`,
      hints: ['Output text to the standard console'],
    },
  ],

  projects: [
    {
      id: 'proj_new_1',
      title: 'Starter Capstone: Personal Portfolio Showcase',
      category: 'Starter Project',
      level: 'Beginner',
      description: 'Build a basic interactive profile showcase to present your learning progress.',
      skillsRequired: ['HTML', 'CSS', 'JavaScript'],
    },
  ],

  assessments: [
    {
      id: 'ass_new_1',
      title: 'EduNexa Core Software Engineering & Diagnostic Assessment',
      subject: 'General Fundamentals',
      category: 'Diagnostic',
      level: 'Beginner',
      timeLimitMinutes: 15,
      questionsCount: 5,
      rewardXP: 100,
      score: 0,
      totalMarks: 100,
      status: 'Not Started',
      weakAreas: ['Diagnostic Test Pending - Take test to identify skill gaps'],
      strongAreas: ['New Account Registered - Ready to start learning!'],
      questions: [
        {
          id: 'q1_new',
          question: 'Which data structure operates on a First-In-First-Out (FIFO) ordering principle?',
          options: ['Stack', 'Queue', 'Binary Tree', 'Hash Map'],
          correctAnswer: 1,
          explanation: 'A Queue enforces FIFO (First-In, First-Out), where elements are inserted at the back and removed from the front.',
        },
        {
          id: 'q2_new',
          question: 'What is the time complexity of searching an element using Binary Search on a sorted array of size N?',
          options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
          correctAnswer: 2,
          explanation: 'Binary Search halves the search space in each step, resulting in O(log N) logarithmic time complexity.',
        },
        {
          id: 'q3_new',
          question: 'In Web Architecture, what does REST stand for?',
          options: [
            'Remote Execution System Protocol',
            'Representational State Transfer',
            'Realtime Encoding Standard Technology',
            'Relational Storage Format'
          ],
          correctAnswer: 1,
          explanation: 'REST (Representational State Transfer) is an architectural style for designing networked applications over HTTP.',
        },
        {
          id: 'q4_new',
          question: 'What is the primary function of Git in software engineering?',
          options: [
            'Deploying cloud servers',
            'Distributed version control and source code history tracking',
            'Executing SQL database queries',
            'Compiling C++ source code'
          ],
          correctAnswer: 1,
          explanation: 'Git is a distributed version control system designed to track changes in source code during software development.',
        },
        {
          id: 'q5_new',
          question: 'In Relational Databases (SQL), what constraint links a column in one table to the Primary Key in another table?',
          options: ['Unique Key', 'Foreign Key', 'Index Clause', 'Default Constraint'],
          correctAnswer: 1,
          explanation: 'A Foreign Key is a field that references the Primary Key of another table, establishing referential integrity between tables.',
        },
      ],
    },
  ],

  plannerEvents: [
    { id: 'ev_new_1', title: 'Complete Initial Diagnostic Test', time: '10:00 AM - 11:00 AM', day: 'Today', status: 'pending', xp: 100 },
  ],

  exploreResources: [
    { title: 'EduNexa New Student Onboarding & Orientation Guide', type: 'Documentation', author: 'EduNexa Team', link: '#' },
    { title: 'Beginner Problem Solving & Logic Fundamentals', type: 'Interactive Course', author: 'EduNexa AI', link: '#' },
  ],
};

/**
 * Get student dataset by email with resilient zero-state fallback for new signups
 */
export function getStudentDataByEmail(email) {
  if (!email) return NEW_STUDENT_ZERO_DATA;
  const key = email.trim().toLowerCase();
  return STUDENT_PROFILES_DATA[key] || NEW_STUDENT_ZERO_DATA;
}

