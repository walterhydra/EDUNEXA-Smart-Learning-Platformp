// EduNexa - Rich Mock Dataset for AI-driven Education & Skill Development

export const INITIAL_USER_PROFILE = {
  name: "Aarav Sharma",
  email: "aarav.sharma@edunexa.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
  education: "B.Tech in Computer Science",
  college: "National Institute of Technology",
  degree: "B.Tech Computer Science & Engineering",
  year: "3rd Year (2025)",
  interests: ["Web Development", "AI / ML", "Cloud", "UI/UX"],
  currentSkills: [
    { name: "JavaScript", level: "Intermediate", score: 68 },
    { name: "React", level: "Beginner", score: 45 },
    { name: "Python", level: "Intermediate", score: 72 },
    { name: "SQL", level: "Beginner", score: 50 },
    { name: "Node.js", level: "Beginner", score: 35 },
    { name: "Data Structures", level: "Intermediate", score: 62 },
  ],
  careerGoal: "Full Stack Developer",
  targetRoleDetail: {
    title: "Full Stack Developer",
    marketDemand: "Very High (+28% YoY)",
    avgSalary: "$112,000 / ₹18.5 LPA",
    readinessScore: 64, // calculated dynamically
  },
  learningAvailability: "1 hour/day",
  learningPreference: ["Videos", "Practical Coding", "Projects"],
  streakDays: 7,
  xpPoints: 3440,
  level: 4,
  rank: "Bronze Scholar",
  weeklyGoalHours: 7,
  completedHoursThisWeek: 5.2,
  onboardingCompleted: true,
};

export const CAREER_PATHS = [
  {
    id: "full-stack",
    title: "Full Stack Developer",
    category: "Software Engineering",
    icon: "Layers",
    color: "from-blue-500 to-indigo-600",
    badge: "Most Popular",
    matchScore: 88,
    avgSalary: "$115,000 / ₹18 LPA",
    marketDemand: "Very High 🔥",
    openPositions: "42,000+",
    description: "Build end-to-end scalable web applications using modern front-end frameworks, robust backends, and cloud databases.",
    coreTechStack: ["JavaScript", "React", "Node.js", "Express", "PostgreSQL", "Docker", "REST/GraphQL", "System Design"],
    readinessBenchmark: {
      "JavaScript": 85,
      "React": 80,
      "Node.js": 75,
      "SQL": 70,
      "Data Structures": 75,
      "DevOps / Docker": 60,
    }
  },
  {
    id: "frontend-dev",
    title: "Frontend Developer",
    category: "UI & Web",
    icon: "Layout",
    color: "from-cyan-500 to-blue-600",
    badge: "Creative Tech",
    matchScore: 82,
    avgSalary: "$102,000 / ₹15 LPA",
    marketDemand: "High",
    openPositions: "31,000+",
    description: "Design sleek, accessible, responsive user interfaces and interactive web experiences using cutting-edge client libraries.",
    coreTechStack: ["HTML5/CSS3", "JavaScript ES6+", "React", "Next.js", "Tailwind CSS", "TypeScript", "State Management", "Web Performance"],
    readinessBenchmark: {
      "JavaScript": 90,
      "React": 88,
      "CSS & Tailwind": 85,
      "TypeScript": 75,
      "Web Performance": 70,
    }
  },
  {
    id: "backend-dev",
    title: "Backend Developer",
    category: "Infrastructure & APIs",
    icon: "Server",
    color: "from-violet-500 to-purple-600",
    badge: "High Pay",
    matchScore: 74,
    avgSalary: "$118,000 / ₹19 LPA",
    marketDemand: "Very High",
    openPositions: "28,500+",
    description: "Architect high-throughput microservices, robust relational/NoSQL databases, security layers, and API infrastructures.",
    coreTechStack: ["Python / Go / Node", "PostgreSQL / MongoDB", "Redis Caching", "Docker & K8s", "Kafka / Message Queues", "Microservices"],
    readinessBenchmark: {
      "Python": 85,
      "SQL": 85,
      "Node.js": 80,
      "System Design": 75,
      "Data Structures": 80,
    }
  },
  {
    id: "data-scientist",
    title: "Data Scientist & AI Engineer",
    category: "Artificial Intelligence",
    icon: "Brain",
    color: "from-emerald-500 to-teal-600",
    badge: "Exponential Growth",
    matchScore: 78,
    avgSalary: "$130,000 / ₹22 LPA",
    marketDemand: "Booming 🚀",
    openPositions: "36,000+",
    description: "Extract predictive insights, train machine learning & deep learning models, and deploy LLM applications into production.",
    coreTechStack: ["Python", "Pandas / NumPy", "Scikit-Learn", "PyTorch / TensorFlow", "SQL", "LangChain / GenAI", "Statistics"],
    readinessBenchmark: {
      "Python": 90,
      "SQL": 80,
      "Machine Learning": 85,
      "Mathematics & Stats": 80,
      "LLMs & GenAI": 75,
    }
  },
  {
    id: "devops-engineer",
    title: "DevOps & Cloud Architect",
    category: "Cloud & Infrastructure",
    icon: "Cloud",
    color: "from-amber-500 to-orange-600",
    badge: "Critical Role",
    matchScore: 62,
    avgSalary: "$125,000 / ₹20 LPA",
    marketDemand: "Very High",
    openPositions: "22,000+",
    description: "Automate CI/CD deployment pipelines, manage container orchestration with Kubernetes, and maintain cloud reliability.",
    coreTechStack: ["AWS / Azure / GCP", "Docker", "Kubernetes", "Terraform / IaC", "GitHub Actions CI/CD", "Linux Admin"],
    readinessBenchmark: {
      "Linux": 85,
      "Docker": 85,
      "Cloud (AWS)": 80,
      "CI/CD": 75,
      "Kubernetes": 70,
    }
  },
];

export const ROADMAP_DATA = [
  {
    phaseId: 1,
    phaseTitle: "Phase 1: Foundation & JavaScript Mastery",
    duration: "Weeks 1 - 3",
    status: "in-progress",
    progressPercent: 75,
    description: "Deep dive into modern ES6+, asynchronous programming, closures, DOM manipulation, and data structures.",
    modules: [
      {
        id: "m101",
        title: "ES6+ Modern Syntax & Functional Paradigms",
        type: "Interactive Video + Lab",
        duration: "2.5 hrs",
        status: "completed",
        score: "94%",
        skillsGained: ["Arrow functions", "Destructuring", "Promises", "Map/Filter/Reduce"],
      },
      {
        id: "m102",
        title: "Async JavaScript, Event Loop & Promises",
        type: "Coding Lab + Quiz",
        duration: "3 hrs",
        status: "completed",
        score: "88%",
        skillsGained: ["Async/Await", "Microtasks queue", "Fetch API", "Error Handling"],
      },
      {
        id: "m103",
        title: "Object Oriented & Prototype Chain Deep Dive",
        type: "Interactive Lesson",
        duration: "2 hrs",
        status: "in-progress",
        progress: 60,
        skillsGained: ["Prototypes", "Classes", "Inheritance", "Memory management"],
      },
      {
        id: "m104",
        title: "DOM & Browser Performance Optimization",
        type: "Hands-on Project",
        duration: "3 hrs",
        status: "unlocked",
        skillsGained: ["Virtual DOM concepts", "Debouncing", "Throttling", "Event Delegation"],
      }
    ]
  },
  {
    phaseId: 2,
    phaseTitle: "Phase 2: React 18 & Frontend Architecture",
    duration: "Weeks 4 - 7",
    status: "unlocked",
    progressPercent: 30,
    description: "Build reactive, reusable web components, manage state with Context/Redux, and integrate REST APIs.",
    modules: [
      {
        id: "m201",
        title: "React Component Lifecycle & Custom Hooks",
        type: "Hands-on Lab",
        duration: "4 hrs",
        status: "in-progress",
        progress: 40,
        skillsGained: ["useState", "useEffect", "useMemo", "Custom Hooks"],
      },
      {
        id: "m202",
        title: "Global State Management with Zustand & Redux",
        type: "Interactive Lab",
        duration: "3.5 hrs",
        status: "unlocked",
        skillsGained: ["Zustand Store", "Async actions", "Immutability", "Selectors"],
      },
      {
        id: "m203",
        title: "Tailwind CSS & Responsive UI Design Systems",
        type: "Project Sprint",
        duration: "3 hrs",
        status: "unlocked",
        skillsGained: ["Flexbox/Grid", "Utility First", "Dark Mode", "Animations"],
      },
      {
        id: "m204",
        title: "Building a Full Single Page App (SPA)",
        type: "Capstone Mini",
        duration: "5 hrs",
        status: "locked",
        skillsGained: ["React Router v6", "Axios Interceptors", "Skeleton Loaders"],
      }
    ]
  },
  {
    phaseId: 3,
    phaseTitle: "Phase 3: Backend APIs & Database Engineering",
    duration: "Weeks 8 - 11",
    status: "locked",
    progressPercent: 0,
    description: "Construct resilient REST & GraphQL APIs with Node.js, Express, PostgreSQL relational modeling, and JWT Auth.",
    modules: [
      {
        id: "m301",
        title: "Node.js Architecture & Express Server Pipeline",
        type: "Backend Lab",
        duration: "4 hrs",
        status: "locked",
        skillsGained: ["Node streams", "Middleware chaining", "CORS", "Rate limiting"],
      },
      {
        id: "m302",
        title: "PostgreSQL Schema Design, Indexing & Prisma ORM",
        type: "Database Lab",
        duration: "4.5 hrs",
        status: "locked",
        skillsGained: ["ACID transactions", "Foreign Keys", "Prisma Migrations", "Query optimization"],
      },
      {
        id: "m303",
        title: "JWT Authentication, OAuth2 & Role-Based Access",
        type: "Security Sprint",
        duration: "3 hrs",
        status: "locked",
        skillsGained: ["Bcrypt hashing", "Refresh Tokens", "RBAC", "CSRF Protection"],
      }
    ]
  },
  {
    phaseId: 4,
    phaseTitle: "Phase 4: Full Stack Capstone & Cloud Deployment",
    duration: "Weeks 12 - 14",
    status: "locked",
    progressPercent: 0,
    description: "Containerize with Docker, deploy on Cloud (AWS/Vercel/Render), and set up automated CI/CD pipelines.",
    modules: [
      {
        id: "m401",
        title: "Containerization with Docker & Multi-stage Builds",
        type: "DevOps Sandbox",
        duration: "3.5 hrs",
        status: "locked",
        skillsGained: ["Dockerfile", "docker-compose", "Port forwarding", "Volume mounts"],
      },
      {
        id: "m402",
        title: "CI/CD Pipeline with GitHub Actions & Cloud Deploy",
        type: "Live Deployment",
        duration: "4 hrs",
        status: "locked",
        skillsGained: ["Automated testing", "Vercel / Render", "Environment configs"],
      }
    ]
  }
];

export const SKILL_GAP_ANALYSIS = {
  overallReadiness: 64,
  targetJob: "Full Stack Developer",
  criticalGaps: [
    {
      skill: "React Architecture",
      current: 45,
      required: 80,
      gap: 35,
      priority: "High",
      impact: "Essential for 92% of full-stack job listings",
      recommendedModule: "m201: React Component Lifecycle & Custom Hooks",
    },
    {
      skill: "Backend & Node.js",
      current: 35,
      required: 75,
      gap: 40,
      priority: "High",
      impact: "Required for building REST endpoints and server logic",
      recommendedModule: "m301: Node.js Architecture & Express Server",
    },
    {
      skill: "SQL & Database Modeling",
      current: 50,
      required: 70,
      gap: 20,
      priority: "Medium",
      impact: "Crucial for complex query optimization and schema design",
      recommendedModule: "m302: PostgreSQL Schema Design & Prisma",
    }
  ],
  masteredSkills: [
    {
      skill: "Python Fundamentals",
      current: 72,
      required: 60,
      status: "Exceeds Requirement",
    },
    {
      skill: "Core JavaScript",
      current: 68,
      required: 65,
      status: "On Track",
    }
  ],
  radarData: [
    { subject: "JavaScript", student: 68, target: 85, fullMark: 100 },
    { subject: "React", student: 45, target: 80, fullMark: 100 },
    { subject: "Node.js", student: 35, target: 75, fullMark: 100 },
    { subject: "SQL / DB", student: 50, target: 70, fullMark: 100 },
    { subject: "Data Structures", student: 62, target: 75, fullMark: 100 },
    { subject: "DevOps / Git", student: 40, target: 65, fullMark: 100 },
  ]
};

export const ASSESSMENTS = [
  {
    id: "quiz-js",
    title: "JavaScript Engine & Modern ES6+ Proficiency Test",
    category: "JavaScript",
    level: "Intermediate",
    questionsCount: 5,
    timeLimitMinutes: 10,
    rewardXP: 150,
    questions: [
      {
        id: 1,
        question: "What is the output of `console.log(typeof NaN)` and `NaN === NaN` in JavaScript?",
        options: [
          "'number' and true",
          "'number' and false",
          "'nan' and false",
          "'undefined' and false"
        ],
        correctAnswer: 1,
        explanation: "`typeof NaN` evaluates to `'number'`. In JavaScript IEEE-754 standard, `NaN` is not equal to any value, including itself, so `NaN === NaN` is `false`."
      },
      {
        id: 2,
        question: "Which of the following creates a microtask in the JavaScript Event Loop?",
        options: [
          "setTimeout(() => {}, 0)",
          "setInterval(() => {}, 100)",
          "Promise.resolve().then(() => {})",
          "setImmediate(() => {})"
        ],
        correctAnswer: 2,
        explanation: "`Promise` callbacks (`.then`, `.catch`, `.finally`) and `queueMicrotask()` go to the Microtask Queue, which is processed immediately after the current macrotask before browser re-rendering."
      },
      {
        id: 3,
        question: "What will `[1, 2, 3].map(parseInt)` return?",
        options: [
          "[1, 2, 3]",
          "[1, NaN, NaN]",
          "[1, 2, NaN]",
          "[NaN, NaN, NaN]"
        ],
        correctAnswer: 1,
        explanation: "`map` passes 3 arguments: `(element, index, array)`. `parseInt` accepts `(string, radix)`. So it computes: `parseInt('1', 0)` -> 1, `parseInt('2', 1)` -> NaN (radix 1 is invalid), `parseInt('3', 2)` -> NaN (3 is invalid in binary)."
      },
      {
        id: 4,
        question: "How do closures work in JavaScript?",
        options: [
          "They copy variables from outer scope to inner scope as static constants.",
          "A function retains lexical access to its outer scope variables even after the outer function has finished execution.",
          "They only exist for global variables in the window object.",
          "They prevent garbage collection of the entire application memory."
        ],
        correctAnswer: 1,
        explanation: "A closure is the combination of a function bundled together with references to its lexical environment. It allows inner functions to access outer scope variables even after the parent function returns."
      },
      {
        id: 5,
        question: "Which array method does NOT mutate the original array in place?",
        options: [
          "Array.prototype.splice()",
          "Array.prototype.sort()",
          "Array.prototype.reverse()",
          "Array.prototype.toSorted()"
        ],
        correctAnswer: 3,
        explanation: "`toSorted()` (introduced in ES2023) creates and returns a new sorted copy without mutating the original array, unlike `.sort()` which sorts in place."
      }
    ]
  },
  {
    id: "quiz-react",
    title: "React 18 Hooks & Architecture Diagnostic",
    category: "React",
    level: "Intermediate",
    questionsCount: 4,
    timeLimitMinutes: 8,
    rewardXP: 180,
    questions: [
      {
        id: 1,
        question: "Why should you pass a callback function to `setCount(prev => prev + 1)` instead of `setCount(count + 1)`?",
        options: [
          "It improves garbage collection performance.",
          "To guarantee state updates use the most recent value when updates are batched asynchronously.",
          "To avoid re-rendering the component entirely.",
          "It is mandatory by React compiler syntax."
        ],
        correctAnswer: 1,
        explanation: "Because React state updates are batched, reading `count` directly might capture stale closures. The functional updater receives the latest guaranteed state."
      },
      {
        id: 2,
        question: "What is the primary purpose of the `useMemo` hook?",
        options: [
          "To remember network requests permanently.",
          "To cache the result of an expensive calculation between re-renders unless dependencies change.",
          "To trigger side-effects after the DOM has been painted.",
          "To create a global singleton state."
        ],
        correctAnswer: 1,
        explanation: "`useMemo` memoizes computed values to prevent computationally expensive re-calculations on every render when its dependency array hasn't changed."
      },
      {
        id: 3,
        question: "In React 18, what does the `useTransition` hook allow you to do?",
        options: [
          "Apply CSS transitions to SVG elements.",
          "Mark UI updates as non-urgent transitions so the browser remains responsive for urgent user inputs.",
          "Transition users between different routing endpoints.",
          "Convert class components into functional components automatically."
        ],
        correctAnswer: 1,
        explanation: "`useTransition` is a Concurrent React feature that lets you mark state updates as non-blocking transitions (e.g. search filter results) while keeping inputs responsive."
      },
      {
        id: 4,
        question: "What is a major pitfall of using an index as a `key` in dynamic lists in React?",
        options: [
          "Keys must always be strings, never numbers.",
          "It can lead to incorrect component state retention and visual bugs when list items are reordered, inserted, or removed.",
          "It throws a fatal runtime compile error in production.",
          "It doubles the memory usage of the Virtual DOM."
        ],
        correctAnswer: 1,
        explanation: "Using array index as a key confuses React's reconciliation algorithm when items are deleted or prepended, causing input fields or state to stick to the wrong list item."
      }
    ]
  },
  {
    id: "quiz-python",
    title: "Python Data Structures & OOP Evaluation",
    category: "Python",
    level: "Intermediate",
    questionsCount: 3,
    timeLimitMinutes: 6,
    rewardXP: 120,
    questions: [
      {
        id: 1,
        question: "What is the average time complexity of looking up a key in a Python dictionary?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correctAnswer: 2,
        explanation: "Python dictionaries are implemented using high-performance hash tables with open addressing, giving an average time complexity of O(1) for lookups and insertions."
      },
      {
        id: 2,
        question: "What keyword is used in Python to create a generator function?",
        options: ["return", "yield", "generate", "async"],
        correctAnswer: 1,
        explanation: "`yield` pauses the function execution and returns a generator iterator that produces values lazily on-demand, saving memory for large data streams."
      },
      {
        id: 3,
        question: "What is the output of `[x**2 for x in range(5) if x % 2 == 0]`?",
        options: ["[0, 4, 16]", "[1, 9]", "[0, 1, 4, 9, 16]", "[4, 16]"],
        correctAnswer: 0,
        explanation: "`range(5)` is [0, 1, 2, 3, 4]. Even numbers are 0, 2, 4. Their squares are 0^2=0, 2^2=4, 4^2=16."
      }
    ]
  }
];

export const PRACTICE_CHALLENGES = [
  {
    id: "lab-1",
    title: "Implement Custom Array Debounce Function",
    difficulty: "Medium",
    category: "JavaScript",
    xp: 80,
    description: "Write a high-order `debounce(fn, delay)` function in JavaScript that prevents multiple rapid calls from triggering `fn` until after `delay` milliseconds of silence.",
    initialCode: `// Implement the debounce function below
function debounce(fn, delay) {
  let timerId;
  
  return function(...args) {
    // Your code here
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Test Run
let counter = 0;
const increment = () => { counter++; console.log("Invoked! Counter is now:", counter); };
const debouncedInc = debounce(increment, 300);

debouncedInc();
debouncedInc();
debouncedInc(); // Only this final call should fire after 300ms
console.log("Registered 3 rapid calls. Awaiting execution...");
`,
    expectedOutput: "Registered 3 rapid calls. Awaiting execution...\nInvoked! Counter is now: 1",
    hints: [
      "Use `clearTimeout(timerId)` to cancel previous pending timeouts.",
      "Store `timerId` in the outer closure scope.",
      "Remember to preserve `this` context with `.apply(this, args)` or lexical arrow functions."
    ]
  },
  {
    id: "lab-2",
    title: "Palindrome Permutation Checker (Python / JS)",
    difficulty: "Easy",
    category: "Algorithms",
    xp: 50,
    description: "Given a string, write a function `canFormPalindrome(str)` that checks if any permutation of the string can form a palindrome (case-insensitive, ignoring spaces).",
    initialCode: `function canFormPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const charCounts = {};
  
  for (const char of clean) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }
  
  let oddCount = 0;
  for (const count of Object.values(charCounts)) {
    if (count % 2 !== 0) oddCount++;
  }
  
  // At most 1 character can have an odd count
  return oddCount <= 1;
}

// Verification Test Cases
console.log("Test 1 ('Tact Coa' -> 'taco cat'):", canFormPalindrome("Tact Coa")); // true
console.log("Test 2 ('edunexa'):", canFormPalindrome("edunexa")); // false
console.log("Test 3 ('civic'):", canFormPalindrome("civic")); // true
console.log("Test 4 ('racecar'):", canFormPalindrome("racecar")); // true
`,
    expectedOutput: "Test 1 ('Tact Coa' -> 'taco cat'): true\nTest 2 ('edunexa'): false\nTest 3 ('civic'): true\nTest 4 ('racecar'): true",
    hints: [
      "A palindrome can have at most ONE character with an odd frequency count (which sits in the exact middle).",
      "Clean up non-alphanumeric characters first."
    ]
  },
  {
    id: "lab-3",
    title: "Deep Object Flattening Function",
    difficulty: "Hard",
    category: "JavaScript",
    xp: 120,
    description: "Given a deeply nested JSON object, write a function `flattenObject(obj)` that transforms nested keys into dot-separated paths (e.g. `{ user: { name: 'Aarav' } }` -> `{ 'user.name': 'Aarav' }`).",
    initialCode: `function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const propKey = prefix ? \`\${prefix}.\${key}\` : key;
      const val = obj[key];
      
      if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
        flattenObject(val, propKey, result);
      } else {
        result[propKey] = val;
      }
    }
  }
  return result;
}

// Test
const nestedProfile = {
  user: {
    profile: {
      name: "Aarav",
      role: "Full Stack Dev"
    },
    metrics: {
      streak: 7,
      xp: 3420
    }
  }
};

console.log("Flattened Result:", JSON.stringify(flattenObject(nestedProfile), null, 2));
`,
    expectedOutput: "Flattened Result: {\n  \"user.profile.name\": \"Aarav\",\n  \"user.profile.role\": \"Full Stack Dev\",\n  \"user.metrics.streak\": 7,\n  \"user.metrics.xp\": 3420\n}",
    hints: [
      "Use recursion to traverse nested objects.",
      "Check `typeof val === 'object' && val !== null` to avoid treating primitives or nulls as child objects."
    ]
  }
];

export const PROJECTS_DATA = [
  {
    id: "p1",
    title: "AI Course Companion & Smart Flashcard Generator",
    difficulty: "Advanced Capstone",
    category: "Full Stack + GenAI",
    tags: ["React", "FastAPI", "OpenAI / Claude API", "PostgreSQL", "Tailwind CSS"],
    stars: "4.9",
    enrolledCount: 1420,
    estimatedHours: "24 hours",
    description: "Build an end-to-end web app that parses PDF textbooks, extracts key concept cards, and conducts intelligent spaced repetition quizzes with AI explanations.",
    deliverables: [
      "JWT authentication & User Dashboard",
      "Document ingestion pipeline & Vector Embeddings",
      "Interactive flashcard review UI with flip animations",
      "Progress analytics & Spaced Repetition Algorithm (SM-2)"
    ],
    recommendedFor: "Aspiring Full Stack & AI Engineers",
    starterGithub: "https://github.com/edunexa-labs/ai-course-companion",
  },
  {
    id: "p2",
    title: "Real-time Collaborative Code Editor (Socket.io)",
    difficulty: "Intermediate",
    category: "Full Stack & WebSockets",
    tags: ["React", "Node.js", "Socket.io", "Monaco Editor", "Docker"],
    stars: "4.8",
    enrolledCount: 2310,
    estimatedHours: "18 hours",
    description: "Develop a Google Docs / Replit style real-time collaborative coding sandbox where multiple developers can edit simultaneously with active cursor indicators.",
    deliverables: [
      "Operational Transformation / CRDT sync engine",
      "Multi-room socket namespace architecture",
      "Live terminal execution mockup",
      "Syntax highlighted Monaco editor integration"
    ],
    recommendedFor: "Frontend & Backend Developers",
    starterGithub: "https://github.com/edunexa-labs/collab-code-sandbox",
  },
  {
    id: "p3",
    title: "DevOps Automated CI/CD & Microservices Suite",
    difficulty: "Intermediate",
    category: "Cloud & DevOps",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "Nginx", "Terraform"],
    stars: "4.7",
    enrolledCount: 980,
    estimatedHours: "15 hours",
    description: "Architect a resilient microservice cluster with automated linting, unit testing, docker multi-stage containerization, and zero-downtime rolling deployments.",
    deliverables: [
      "Multi-stage Dockerfile configurations",
      "GitHub Actions workflow for test & push",
      "Kubernetes deployment and service manifests",
      "Nginx reverse proxy load balancer"
    ],
    recommendedFor: "DevOps & Cloud Engineers",
    starterGithub: "https://github.com/edunexa-labs/cloud-cicd-pipeline",
  }
];

export const EXPLORE_RESOURCES = [
  {
    id: "res-1",
    title: "JavaScript Visualized: The Event Loop & Async Architecture",
    type: "Interactive Guide",
    source: "EduNexa Research",
    format: "Visual Interactive",
    rating: 4.9,
    reviews: 840,
    duration: "45 min read",
    category: "Web Development",
    url: "https://javascript.info",
    tag: "Essential",
    description: "Crystal-clear visual breakdown of call stack, Web APIs, Task Queue, and Microtask priority in modern V8 engines."
  },
  {
    id: "res-2",
    title: "React 18 Design Patterns & State Architecture Cheatsheet",
    type: "Cheatsheet & Code Repo",
    source: "GitHub Community",
    format: "PDF + Snippets",
    rating: 4.8,
    reviews: 1200,
    duration: "1 hour reference",
    category: "React",
    url: "https://react.dev",
    tag: "High Yield",
    description: "Curated compendium of compound components, custom hooks, render props, and performance optimization techniques."
  },
  {
    id: "res-3",
    title: "System Design Primer: Scalable Distributed Systems",
    type: "Full Course Book",
    source: "Hiring Managers & Staff Engineers",
    format: "Interactive Markdown",
    rating: 5.0,
    reviews: 3500,
    duration: "8 hours",
    category: "System Design",
    url: "https://github.com/donnemartin/system-design-primer",
    tag: "Top Rated",
    description: "Learn how to design scalable systems for millions of users: caching, load balancers, database sharding, CAP theorem."
  },
  {
    id: "res-4",
    title: "Python for Data Science & Machine Learning Handbook",
    type: "E-Book + Jupyter Labs",
    source: "Open Data Science",
    format: "Jupyter Notebooks",
    rating: 4.9,
    reviews: 960,
    duration: "12 hours labs",
    category: "AI / ML",
    url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
    tag: "Practical Labs",
    description: "Hands-on walkthroughs with Pandas dataframes, NumPy vectorized arithmetic, Matplotlib charts, and Scikit-learn pipelines."
  }
];

export const ACHIEVEMENTS_DATA = [
  {
    id: "ach-1",
    title: "7-Day Streak Warrior",
    description: "Logged in and completed at least 1 learning module for 7 consecutive days.",
    icon: "Flame",
    unlocked: true,
    unlockedDate: "Yesterday",
    badgeColor: "bg-amber-100 text-amber-600 border-amber-300",
    xpReward: 300,
  },
  {
    id: "ach-2",
    title: "JS Mastermind",
    description: "Scored 90%+ in the Advanced JavaScript Diagnostic Assessment.",
    icon: "Award",
    unlocked: true,
    unlockedDate: "3 days ago",
    badgeColor: "bg-indigo-100 text-indigo-600 border-indigo-300",
    xpReward: 500,
  },
  {
    id: "ach-3",
    title: "Code Lab Challenger",
    description: "Successfully passed all unit tests in 3 interactive Practice Labs.",
    icon: "Code2",
    unlocked: true,
    unlockedDate: "5 days ago",
    badgeColor: "bg-emerald-100 text-emerald-600 border-emerald-300",
    xpReward: 400,
  },
  {
    id: "ach-4",
    title: "Gap Buster",
    description: "Reduced skill gap score in Target Career role by 15% or more.",
    icon: "TrendingUp",
    unlocked: false,
    progress: "65%",
    badgeColor: "bg-slate-100 text-slate-400 border-slate-200",
    xpReward: 600,
  },
  {
    id: "ach-5",
    title: "AI Mentor Apprentice",
    description: "Engaged in 10+ personalized tutoring sessions with NexaAI.",
    icon: "Bot",
    unlocked: false,
    progress: "4 / 10 sessions",
    badgeColor: "bg-slate-100 text-slate-400 border-slate-200",
    xpReward: 350,
  }
];

export const STUDY_SCHEDULE = [
  {
    id: "evt-1",
    day: "Monday",
    time: "07:00 PM - 08:00 PM",
    title: "ES6 Async/Await & Microtasks Lab",
    type: "Practice Lab",
    status: "done",
    color: "border-l-indigo-500 bg-indigo-50/50"
  },
  {
    id: "evt-2",
    day: "Tuesday",
    time: "07:30 PM - 08:30 PM",
    title: "React State Management & Zustand Store",
    type: "Course Module",
    status: "done",
    color: "border-l-blue-500 bg-blue-50/50"
  },
  {
    id: "evt-3",
    day: "Wednesday",
    time: "07:00 PM - 08:00 PM",
    title: "Skill Assessment: React Hooks Diagnostic",
    type: "Assessment",
    status: "pending",
    color: "border-l-emerald-500 bg-emerald-50/50"
  },
  {
    id: "evt-4",
    day: "Thursday",
    time: "08:00 PM - 09:00 PM",
    title: "AI Mentor Q&A: Debugging API Fetch Interceptors",
    type: "Mentorship",
    status: "pending",
    color: "border-l-violet-500 bg-violet-50/50"
  },
  {
    id: "evt-5",
    day: "Saturday",
    time: "10:00 AM - 12:00 PM",
    title: "Capstone Sprint: Collaborative Code Editor",
    type: "Project",
    status: "pending",
    color: "border-l-amber-500 bg-amber-50/50"
  }
];
