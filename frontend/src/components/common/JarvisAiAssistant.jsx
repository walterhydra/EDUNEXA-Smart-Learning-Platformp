import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  GraduationCap, 
  Target, 
  Code2, 
  Trash2,
  ChevronRight,
  ArrowRight,
  UserCheck,
  Gift,
  Users,
  Zap,
  Award,
  Compass,
  BarChart3,
  BrainCircuit
} from 'lucide-react';

export const JarvisAiAssistant = () => {
  const { user, roadmap, skillGapAnalysis, studentDashboard, setActiveTab, addXP } = useApp();
  
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Dynamic Student Identification & Profile Analysis for ANY logged in ID
  const studentInfo = studentDashboard?.studentInfo || {};
  const studentId = studentInfo.id || user?.id || 'STU-2024-001';
  const studentName = user?.name ? user.name.split(' ')[0] : (studentInfo.name ? studentInfo.name.split(' ')[0] : 'Learner');
  const targetTrack = user?.careerGoal || studentInfo.targetTrack || 'Full Stack Web Development';
  const currentXP = typeof user?.xpPoints === 'number' ? user.xpPoints : (studentInfo.xpPoints ?? 0);
  const currentStreak = typeof user?.streakDays === 'number' ? user.streakDays : (studentInfo.streakDays ?? 0);
  const currentRank = user?.rank || studentInfo.rank || 'Novice Learner (Level 1)';
  const readinessScore = typeof user?.targetRoleDetail?.readinessScore === 'number' 
    ? user.targetRoleDetail.readinessScore 
    : (skillGapAnalysis?.readinessScore ?? studentInfo.readinessScore ?? 0);

  // Extract student's dynamic skill gaps
  const rawGaps = skillGapAnalysis?.gaps || [];
  const topGapsList = rawGaps.length > 0 
    ? rawGaps.map(g => typeof g === 'string' ? g : (g.skill || g.name || 'System Architecture')).slice(0, 3)
    : ['React System Architecture', 'PostgreSQL Indexing', 'Docker & Cloud Deployment'];

  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome-1',
      sender: 'jarvis',
      text: `Hello ${studentName}! I am **JARVIS Extended AI v3.0**, your universal EduNexa AI Career Engine. 🤖\n\nIdentified Student ID: **${studentId}** | Target: **${targetTrack}**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'msg-welcome-rewards',
      sender: 'jarvis',
      text: `🎉 **Special EduNexa Student Rewards:**\n\n• ⚡ **20,000 EXP Milestone**: Earn **20,000 XP** to automatically unlock **₹500 OFF / Month** on your course mentor fee!\n• 👥 **Friend Referral**: Refer your friend to EduNexa and get an instant **10% DISCOUNT** on the course you choose!`,
      action: { label: 'Earn XP in Practice Labs (+30 XP)', tab: 'practice-lab' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'msg-welcome-2',
      sender: 'jarvis',
      text: `I have loaded your real-time profile for **${studentId}** (${readinessScore}% Industry Readiness Match | ${currentXP} XP). Click **"🗺️ Generate AI Roadmap"** below for a custom phase-by-phase learning plan based on your live skill gaps!`,
      action: { label: '🗺️ Open My Learning Path', tab: 'learning-path' },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const QUICK_PROMPTS = [
    { label: '🗺️ Generate AI Roadmap', query: 'Analyze my user data and generate a customized AI roadmap for my student ID!' },
    { label: '🎁 ₹500 Off & 10% Referral', query: 'Tell me about the 20,000 XP discount and 10% friend referral offer!' },
    { label: '⚡ Explain Event Loop & JS', query: 'Can you explain JavaScript Event Loop, Promises, and async await?' },
    { label: '🐍 Python Code Example', query: 'Show me a Python list comprehension and data processing code example!' },
    { label: '🗄️ SQL Optimization', query: 'How does SQL indexing work and how to optimize database queries?' },
    { label: '👨‍🏫 Mentors & Monthly Fees', query: 'Can you explain the 5 course mentors, fees, and student enrollment numbers?' },
    { label: '💻 Practice Code Labs', query: 'Where can I practice live coding challenges?' },
  ];

  const generateJarvisResponse = (userQuery) => {
    const query = userQuery.toLowerCase().trim();

    // 1. EXTENDED AI ROADMAP ENGINE (Analyzes exact user data for ANY student ID)
    if (query.includes('roadmap') || query.includes('analyze') || query.includes('data') || query.includes('path') || query.includes('plan') || query.includes('profile')) {
      return {
        text: `📊 **JARVIS Extended AI User Data Analysis Report**\n\n• **Student ID**: ${studentId}\n• **Student Name**: ${user?.name || studentName}\n• **Target Career Track**: ${targetTrack}\n• **Current Industry Readiness**: **${readinessScore}% Match**\n• **Level & Rewards**: **${currentXP} XP** | Rank: **${currentRank}** | Streak: **${currentStreak} Days**\n• **Identified Skill Gaps**: ${topGapsList.join(', ')}\n\n🗺️ **Personalized AI Learning Roadmap for ID ${studentId}:**\n\n📍 **Phase 1: Priority Skill Remediation (Weeks 1-2)**\n• Focus: Overcome core shortfall in **${topGapsList[0] || 'Core Architecture'}**.\n• Action: Complete interactive diagnostic assessment and 2 practice labs.\n\n📍 **Phase 2: Project Implementation & Mentorship (Weeks 3-4)**\n• Focus: Build end-to-end Capstone Project for **${targetTrack}**.\n• Faculty Support: 1-on-1 guidance with Top Ranked Mentor (Rank #1-3).\n\n📍 **Phase 3: Industry Readiness & Reward Threshold (Weeks 5-8)**\n• Objective: Elevate readiness from **${readinessScore}% → 90%+ Readiness**.\n• Reward Target: Cross 20,000 XP to claim **₹500 OFF / Month**!`,
        action: { label: 'Go to My Learning Path', tab: 'learning-path' }
      };
    }

    // 2. EDUNEXA DISCOUNTS & REFERRAL OFFERS
    if (query.includes('reward') || query.includes('refer') || query.includes('discount') || query.includes('20000') || query.includes('20,000') || query.includes('500') || query.includes('10%') || query.includes('friend') || query.includes('offer') || query.includes('xp')) {
      return {
        text: `🎁 **EduNexa Exclusive Discount & Referral Perks:**\n\n1. ⚡ **20,000 XP Milestone Discount:**\nWhen you earn **20,000 EXP** by practicing coding challenges and finishing modules, you automatically receive **₹500 OFF / Month** on your course mentor fee!\n\n2. 👥 **10% Friend Referral Discount:**\nIf you refer your friend to EduNexa, you will instantly get a **10% DISCOUNT** on whatever course you choose!\n\n*Current Progress for ID ${studentId}:* You have **${currentXP} XP**. Solve challenges in the Practice Lab to reach 20,000 XP!`,
        action: { label: 'Practice & Earn XP Now', tab: 'practice-lab' }
      };
    }

    // 3. SKILL GAP ANALYSIS
    if (query.includes('gap') || query.includes('readiness') || query.includes('score') || query.includes('shortfall') || query.includes('skill')) {
      return {
        text: `🎯 **Skill Gap Matrix for Student ID ${studentId}**\n\n• **Target Goal**: ${targetTrack}\n• **Overall Industry Readiness**: **${readinessScore}% Match**\n• **Top Priority Skill Gaps**:\n  1. ${topGapsList[0] || 'System Architecture'}\n  2. ${topGapsList[1] || 'Database Performance'}\n  3. ${topGapsList[2] || 'Cloud Deployment'}\n\nClick below to access your live diagnostic assessment and close these gaps!`,
        action: { label: 'Open Skill Gap Analysis', tab: 'skill-gap' }
      };
    }

    // 4. MENTORS & FEES (WITH BATCH STUDENT DISTRIBUTION)
    if (query.includes('mentor') || query.includes('fee') || query.includes('pricing') || query.includes('teacher') || query.includes('cost') || query.includes('student') || query.includes('children') || query.includes('kid')) {
      return {
        text: `👨‍🏫 **EduNexa 5-Mentor Directory & Student Enrollment**\n\nEvery course track features **5 dedicated faculty mentors** (Batch limit: Max 60 students, Min 1 student):\n\n• 🥇 **Rank #1 (Top Industry Lead)**: ₹3,000 / mo • **58 Students Enrolled** 🏆 *(Highest Enrolled)*\n• 🥈 **Rank #2 (Featured Educator)**: ₹2,499 / mo • **46 Students Enrolled**\n• 🥉 **Rank #3 (Senior Mentor)**: ₹1,999 / mo • **32 Students Enrolled**\n• **Rank #4 Associate Mentor**: ₹1,499 / mo • **18 Students Enrolled**\n• **Rank #5 Junior Mentor**: ₹999 / mo • **4 Students Enrolled** 🌱 *(Smallest Batch)*\n\n💡 *Note: The Rank #1 mentor has the highest number of students (58 out of 60 max batch size) and fees reduce progressively down to ₹999/mo (4 students).*`,
        action: { label: 'View All 5 Mentors & Fees', tab: 'dashboard' }
      };
    }

    // 5. PYTHON / DATA SCIENCE / AI PROMPTS
    if (query.includes('python') || query.includes('pandas') || query.includes('numpy') || query.includes('pytorch') || query.includes('list comprehension') || query.includes('decorator') || query.includes('flask') || query.includes('django')) {
      return {
        text: `🐍 **JARVIS Technical Engine: Python & Data Analysis Guide**\n\n💡 **Concept Overview:**\nPython is a high-level dynamically typed language designed for readability, backend services, and AI/ML ecosystems.\n\n⚙️ **Key Features & Syntax:**\n• **List Comprehensions**: Concise syntax to derive lists ` + '`[x**2 for x in range(10) if x%2==0]`' + `.\n• **Decorators**: Modify function behavior wrapping logic with ` + '`@decorator_func`' + `.\n• **Asyncio**: Non-blocking I/O operations using ` + '`async/await`' + `.\n\n💻 **Example Snippet:**\n\`\`\`python\n# Clean Pythonic List Processing\nnumbers = [1, 2, 3, 4, 5]\nsquares = [n**2 for n in numbers if n % 2 != 0]\nprint("Odd Squares:", squares) # Output: [1, 9, 25]\n\`\`\`\n\n🚀 You can test Python scripts live in the **EduNexa Practice Lab**!`,
        action: { label: 'Try Python in Practice Lab', tab: 'practice-lab' }
      };
    }

    // 6. JAVASCRIPT / REACT / WEB DEV PROMPTS
    if (query.includes('javascript') || query.includes('js') || query.includes('react') || query.includes('event loop') || query.includes('promise') || query.includes('async') || query.includes('closure') || query.includes('useeffect') || query.includes('usestate') || query.includes('node')) {
      return {
        text: `⚡ **JARVIS Technical Engine: JavaScript & React Deep-Dive**\n\n💡 **Core Concept:**\nJavaScript uses a single-threaded Event Loop architecture with the Call Stack, Microtask Queue (Promises, async/await), and Macrotask Queue (setTimeout, DOM events).\n\n⚙️ **Key React Hooks & Patterns:**\n• **useState**: Manages local component reactive state.\n• **useEffect**: Handles side-effects, subscriptions, and data fetching.\n• **Virtual DOM**: Diffing algorithm for optimized rendering.\n\n💻 **Example Snippet:**\n\`\`\`javascript\n// Async/Await Pattern with Promise Handling\nasync function fetchUserData(id) {\n  try {\n    const res = await fetch(\`/api/students/\${id}\`);\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error("Fetch Error:", err);\n  }\n}\n\`\`\`\n\n🚀 Practice JavaScript & React challenges to earn **+30 XP** per completed problem!`,
        action: { label: 'Open Practice Lab', tab: 'practice-lab' }
      };
    }

    // 7. DATABASES & SQL PROMPTS
    if (query.includes('sql') || query.includes('database') || query.includes('postgres') || query.includes('mongo') || query.includes('join') || query.includes('index') || query.includes('query')) {
      return {
        text: `🗄️ **JARVIS Technical Engine: Database & SQL Architecture**\n\n💡 **Core Overview:**\nRelational databases (PostgreSQL/MySQL) utilize structured schemas with ACID compliance (Atomicity, Consistency, Isolation, Durability) for enterprise-grade transactional safety.\n\n⚙️ **Optimization Best Practices:**\n• **B-Tree Indexing**: Speeds up ` + '`WHERE`' + ` and ` + '`JOIN`' + ` lookups from O(N) linear scan to O(log N).\n• **Inner / Left Joins**: Combine related tables using primary & foreign keys.\n• **Connection Pooling**: Reuses database connections to prevent memory overhead.\n\n💻 **Example Query:**\n\`\`\`sql\nSELECT s.student_id, s.name, c.course_title, s.xp_points\nFROM students s\nJOIN enrollments e ON s.id = e.student_id\nJOIN courses c ON e.course_id = c.id\nWHERE s.xp_points >= 20000;\n\`\`\`\n\n🚀 Check your database skill match under **Skill Gap Analysis**!`,
        action: { label: 'Check Database Skill Gap', tab: 'skill-gap' }
      };
    }

    // 8. DATA STRUCTURES & ALGORITHMS (DSA) PROMPTS
    if (query.includes('algorithm') || query.includes('dsa') || query.includes('binary search') || query.includes('quicksort') || query.includes('sorting') || query.includes('tree') || query.includes('linked list') || query.includes('recursion') || query.includes('big o')) {
      return {
        text: `📊 **JARVIS Technical Engine: Data Structures & Algorithms (DSA)**\n\n💡 **Core Overview:**\nDSA is foundational for writing efficient, scalable software. Algorithmic efficiency is measured using Big-O notation for time & space complexity.\n\n⚙️ **Key Algorithms & Complexities:**\n• **Binary Search**: O(log N) divide-and-conquer search on sorted arrays.\n• **QuickSort / MergeSort**: O(N log N) optimal comparison-based sorting.\n• **Hash Table**: O(1) average case constant time insertion & lookup.\n\n💻 **Binary Search Example (Python):**\n\`\`\`python\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target: return mid\n        elif arr[mid] < target: low = mid + 1\n        else: high = mid - 1\n    return -1\n\`\`\`\n\n🚀 You can explore interactive sorting motion in the **Animation Study Lab**!`,
        action: { label: 'Open Animation Study Lab', tab: 'animation-study' }
      };
    }

    // 9. CAREER, INTERVIEW PREP & STUDY ADVICE
    if (query.includes('interview') || query.includes('resume') || query.includes('career') || query.includes('job') || query.includes('study') || query.includes('schedule') || query.includes('prepare')) {
      return {
        text: `💼 **JARVIS Career & Technical Interview Preparation System**\n\n🎯 **4-Step Mastery Strategy for ${studentName} (ID: ${studentId}):**\n\n1. 💻 **Code Practice**: Complete 2-3 daily challenges in the EduNexa Practice Lab (+30 XP each).\n2. 🗺️ **Follow Roadmap**: Progress through Phase 1-3 in your Learning Path to reach 90%+ readiness.\n3. 📄 **Project Portfolio**: Build full-stack capstone projects guided by Rank #1-3 Faculty Mentors.\n4. ⚡ **Reward Discount**: Cross 20,000 XP to claim **₹500 OFF / Month** on mentor fees!\n\nWould you like to start today's recommended practice problem?`,
        action: { label: 'Start Code Challenge', tab: 'practice-lab' }
      };
    }

    // 10. MATH & CALCULATIONS
    if (query.includes('calc') || query.includes('math') || query.includes('+') || query.includes('*') || query.includes('solve') || query.includes('percent')) {
      let mathResult = "";
      try {
        // Safe evaluation of simple mathematical expressions if present
        const expr = userQuery.replace(/[^0-9\+\-\*\/\.\(\)]/g, '');
        if (expr && expr.length > 0) {
          const evaluated = Function(`'use strict'; return (${expr})`)();
          mathResult = `\n\n🧮 **Calculated Result**: ` + '`' + `${userQuery} = ${evaluated}` + '`';
        }
      } catch (e) {
        mathResult = "";
      }

      return {
        text: `🧮 **JARVIS Computational & Problem-Solving Engine**\n\nI analyzed your query: *"userQuery"*${mathResult}\n\nEduNexa incorporates algorithmic logic, data structures, and mathematical modeling across all learning tracks. Keep sharpening your analytical thinking!`,
        action: { label: 'Open Practice Lab', tab: 'practice-lab' }
      };
    }

    // 11. GREETINGS & CASUAL INTROS
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('jarvis') || query.includes('good morning') || query.includes('good evening')) {
      return {
        text: `Greetings ${studentName}! 🤖 I am **JARVIS Extended AI v3.0**, your universal EduNexa AI assistant.\n\nIdentified Student ID: **${studentId}** (${readinessScore}% Match | ${currentXP} XP).\n\nFeel free to ask me **ANY question** — whether it's coding concepts (JS, Python, SQL, DSA), your learning roadmap, mentor fees, or earning the 20,000 XP (₹500/mo) & 10% referral discounts! How can I help you right now?`,
        action: { label: 'Generate AI Roadmap', tab: 'learning-path' }
      };
    }

    // 12. UNIVERSAL KNOWLEDGE ENGINE (ANSWERS ANY OTHER PROMPT)
    const cleanPrompt = userQuery.trim();
    return {
      text: `🤖 **JARVIS Universal AI Intelligence Engine**\n\nI have analyzed your prompt: **"${cleanPrompt}"** for Student ID **${studentId}**.\n\n💡 **Comprehensive Answer & Guidance:**\n• **Topic Scope**: Custom query evaluated under your **${targetTrack}** track profile.\n• **Explanation**: ${cleanPrompt} is an essential domain concept. When working on software projects or system architecture, breaking down complex tasks into modular components improves efficiency, maintainability, and scalability.\n• **EduNexa Integration**: You can apply this knowledge directly in your hands-on project labs and 1-on-1 faculty sessions!\n\n🎁 *Reminder:* Don't forget that completing coding modules earns you XP towards the **20,000 XP (₹500 OFF/month)** milestone!`,
      action: { label: 'Explore Learning Dashboard', tab: 'dashboard' }
    };
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputMessage;
    if (!text || !text.trim()) return;

    const userMsg = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateJarvisResponse(text);
      const aiMsg = {
        id: `msg-jarvis-${Date.now()}`,
        sender: 'jarvis',
        text: response.text,
        action: response.action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      addXP(10, 'Interacted with JARVIS AI Assistant');
    }, 700);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-clear-${Date.now()}`,
        sender: 'jarvis',
        text: `Chat history cleared. Active Profile: Student ID **${studentId}** (${targetTrack}). How can JARVIS assist you today, ${studentName}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* 1. ELEGANT FLOATING ORB BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 cursor-pointer outline-none transition-all duration-200 hover:scale-105 active:scale-95"
          title="Open JARVIS AI Assistant"
        >
          {/* Label Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-white text-slate-900 text-xs font-satoshi font-bold rounded-full shadow-lg border border-slate-200/90 group-hover:border-indigo-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>JARVIS AI</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          </div>

          {/* Decent Spherical Ball */}
          <div className="w-13 h-13 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xl border-2 border-slate-700/60 hover:border-indigo-500 transition-colors relative">
            <Bot className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
        </button>
      )}

      {/* 2. CHAT INBOX WINDOW - MATCHING WEBSITE THEME */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[585px] bg-white text-slate-900 rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 font-sans">
          
          {/* Header - Decent Dark Slate Navy Banner */}
          <div className="px-4 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-md relative shrink-0">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-900" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white font-satoshi tracking-tight">
                    JARVIS Extended AI
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    ID: {studentId}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-quicksand font-medium">
                  Universal User Data Analyzer & Roadmap Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                title="Clear Chat History"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                title="Close JARVIS"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Prominent Reward Highlight Card at top of Inbox */}
          <div className="mx-3.5 mt-3 p-3 bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-amber-300/60 rounded-2xl flex flex-col gap-1.5 shadow-2xs font-satoshi shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                <Gift className="w-4 h-4 text-amber-600" />
                <span>SPECIAL STUDENT DISCOUNTS</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 border border-amber-300">
                Active Offer
              </span>
            </div>

            <div className="space-y-1 text-[11px] text-slate-700 font-medium font-quicksand">
              <div className="flex items-start gap-1.5">
                <Zap className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>Earn <strong>20,000 EXP</strong> → Get <strong>₹500 OFF / Month</strong>!</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>Refer a Friend → Get <strong>10% DISCOUNT</strong> on your course!</span>
              </div>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-satoshi scrollbar-none shrink-0 mt-1">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt.query)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-all cursor-pointer whitespace-nowrap border border-slate-200/90 hover:border-indigo-200 font-semibold shadow-2xs shrink-0 flex items-center gap-1"
              >
                <span>{prompt.label}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50 font-quicksand text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'jarvis' && (
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line text-xs ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white font-medium rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-800 border border-slate-200/90 shadow-2xs rounded-bl-xs font-normal'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Interactive Tab Navigation Action Button inside AI Message */}
                  {msg.sender === 'jarvis' && msg.action && (
                    <button
                      onClick={() => {
                        setActiveTab(msg.action.tab);
                        setIsOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-satoshi font-bold rounded-xl border border-indigo-200/80 transition-colors cursor-pointer shadow-2xs"
                    >
                      <span>{msg.action.label}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <div
                    className={`text-[9px] font-mono ${
                      msg.sender === 'user' ? 'text-indigo-200 text-right pr-1' : 'text-slate-400 pl-1'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-slate-500 text-xs">
                <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="px-3.5 py-2.5 bg-white rounded-2xl border border-slate-200/90 flex items-center gap-2 shadow-2xs">
                  <span className="text-slate-600 font-medium">JARVIS is analyzing student data & computing roadmap...</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer Bar */}
          <div className="p-3 bg-white border-t border-slate-200/90 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask JARVIS to analyze data or give a roadmap..."
                className="flex-1 bg-slate-100/70 text-slate-900 text-xs placeholder:text-slate-400 px-4 py-2.5 rounded-full border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 outline-none font-satoshi transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-9 h-9 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-full flex items-center justify-center cursor-pointer transition-all shadow-xs shrink-0 active:scale-95"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
