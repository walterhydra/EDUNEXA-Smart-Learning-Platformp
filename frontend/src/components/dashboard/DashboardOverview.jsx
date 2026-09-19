import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Target, 
  Flame, 
  Zap, 
  ArrowRight, 
  Play, 
  BrainCircuit, 
  Code2, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Compass,
  Search,
  GraduationCap,
  Database,
  Smartphone,
  SearchX,
  Video,
  Heart,
  X,
  Star,
  UserCheck,
  PlayCircle,
  Bot,
  Lightbulb,
  Crown,
  Medal,
  Users,
  ShieldCheck
} from 'lucide-react';
import demoVideo from '../../assets/b8bd4e4273cceae2889d9d259b04f732.mp4';

export const DashboardOverview = () => {
  const { 
    user, 
    studentDashboard, 
    setActiveTab, 
    SKILL_GAP_ANALYSIS, 
    skillGapAnalysis, 
    addXP, 
    showToast,
    searchQuery,
    setSearchQuery 
  } = useApp();

  const [activeDemoCourse, setActiveDemoCourse] = useState(null);
  const [activeMentorsCourse, setActiveMentorsCourse] = useState(null);
  const [mentorFilter, setMentorFilter] = useState('all');
  const [teachingRating, setTeachingRating] = useState(null);
  const [ratingSaved, setRatingSaved] = useState(false);

  const userName = studentDashboard?.studentInfo?.name || user?.name || 'Aarav';
  const userEmail = studentDashboard?.studentInfo?.email || user?.email || '';
  const careerGoal = studentDashboard?.studentInfo?.targetTrack || user?.careerGoal || 'Full Stack Web Development';

  const readinessScore = typeof user?.targetRoleDetail?.readinessScore === 'number'
    ? user.targetRoleDetail.readinessScore
    : (user?.readinessScore ?? (studentDashboard?.studentInfo?.readinessScore ?? 0));
  const streakDays = typeof user?.streakDays === 'number'
    ? user.streakDays
    : (studentDashboard?.studentInfo?.streakDays ?? 0);
  const xpPoints = typeof user?.xpPoints === 'number'
    ? user.xpPoints
    : (studentDashboard?.studentInfo?.xpPoints ?? 0);

  const FEATURED_COURSES = [
    {
      id: 'course-fullstack',
      title: 'Full Stack Web Development',
      description: 'Master modern front-end & back-end web development with React, Node.js, Express, PostgreSQL & Tailwind CSS.',
      icon: Code2,
      gradient: 'from-indigo-600 to-blue-600',
      level: 'Beginner to Advanced',
      modules: '12 Modules',
      duration: '8 Weeks',
      instructor: 'Dr. Sarah Lin (Ex-Google Lead)',
      skills: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind'],
      trackName: 'Full Stack Web Development',
      mentors: [
        {
          rank: 1,
          name: 'Dr. Sarah Lin',
          title: 'Ex-Google Staff Engineer & System Architect',
          rating: 4.9,
          reviewsCount: 1420,
          exp: '12+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'System Design & React/Node Microservices'
        },
        {
          rank: 2,
          name: 'Prof. Rajesh Kumar',
          title: 'Ex-Microsoft Principal Architect',
          rating: 4.8,
          reviewsCount: 980,
          exp: '10+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'Full Stack Scalability & Cloud Backend'
        },
        {
          rank: 3,
          name: 'Ananya Sharma',
          title: 'Senior Staff Frontend Engineer (Uber)',
          rating: 4.7,
          reviewsCount: 750,
          exp: '8+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'UI Architecture, React & Performance'
        },
        {
          rank: 4,
          name: 'Vikramaditya Verma',
          title: 'Full Stack Technical Lead',
          rating: 4.6,
          reviewsCount: 520,
          exp: '5+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'API Engineering & Database Integration'
        },
        {
          rank: 5,
          name: 'Rohan Deshmukh',
          title: 'Full Stack Web Instructor',
          rating: 4.5,
          reviewsCount: 340,
          exp: '3+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'JavaScript Fundamentals & Git'
        }
      ]
    },
    {
      id: 'course-python-ds',
      title: 'Python & Data Science Fundamentals',
      description: 'Learn data analysis, statistical modeling, data visualization, and automated data wrangling with Python.',
      icon: BarChart3,
      gradient: 'from-emerald-600 to-teal-600',
      level: 'Beginner',
      modules: '10 Modules',
      duration: '6 Weeks',
      instructor: 'Prof. Rajesh Kumar (IIT Delhi)',
      skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'SQL'],
      trackName: 'Python & Data Science',
      mentors: [
        {
          rank: 1,
          name: 'Prof. Rajesh Kumar',
          title: 'Head of Data Science & AI (IIT Delhi Alumni)',
          rating: 4.9,
          reviewsCount: 1650,
          exp: '14+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'Statistical Modeling & Advanced Python'
        },
        {
          rank: 2,
          name: 'Dr. Priya Sundaram',
          title: 'Senior Data Scientist (Amazon)',
          rating: 4.8,
          reviewsCount: 1120,
          exp: '9+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'Predictive Analytics & Pandas Automation'
        },
        {
          rank: 3,
          name: 'Aarav Mehta',
          title: 'Lead Quantitative Analyst',
          rating: 4.7,
          reviewsCount: 810,
          exp: '7+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'Data Visualization & SQL Querying'
        },
        {
          rank: 4,
          name: 'Neha Gupta',
          title: 'Data Science Technical Specialist',
          rating: 4.6,
          reviewsCount: 490,
          exp: '4+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'NumPy & Exploratory Data Analysis'
        },
        {
          rank: 5,
          name: 'Siddharth Rao',
          title: 'Python Lab Instructor',
          rating: 4.5,
          reviewsCount: 310,
          exp: '3+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Python Syntax & Logic Building'
        }
      ]
    },
    {
      id: 'course-ai-mlops',
      title: 'AI Systems & Cloud MLOps',
      description: 'Build and deploy enterprise AI applications, neural networks, fine-tuned LLMs, and RAG vector pipelines.',
      icon: BrainCircuit,
      gradient: 'from-purple-600 to-pink-600',
      level: 'Intermediate',
      modules: '14 Modules',
      duration: '10 Weeks',
      instructor: 'Dr. Yannis Thorne (Ex-Meta AI)',
      skills: ['PyTorch', 'LLMs', 'LangChain', 'Docker', 'Vector DB'],
      trackName: 'AI Systems & Cloud MLOps',
      mentors: [
        {
          rank: 1,
          name: 'Dr. Yannis Thorne',
          title: 'Principal AI Scientist (Ex-Meta AI)',
          rating: 4.95,
          reviewsCount: 1890,
          exp: '15+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'Deep Learning, LLM Fine-Tuning & RAG'
        },
        {
          rank: 2,
          name: 'Kavita Menon',
          title: 'MLOps Tech Lead (Microsoft AI)',
          rating: 4.85,
          reviewsCount: 1040,
          exp: '10+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'Model Deployment, Docker & Vector DBs'
        },
        {
          rank: 3,
          name: 'Marcus Vance',
          title: 'Senior AI Engineer & Researcher',
          rating: 4.75,
          reviewsCount: 690,
          exp: '7+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'LangChain & PyTorch Neural Networks'
        },
        {
          rank: 4,
          name: 'Aditya Kapoor',
          title: 'AI Solutions Engineer',
          rating: 4.6,
          reviewsCount: 410,
          exp: '5+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'Prompt Engineering & API Integration'
        },
        {
          rank: 5,
          name: 'Tanvi Joshi',
          title: 'ML Lab Assistant',
          rating: 4.5,
          reviewsCount: 280,
          exp: '2+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Model Evaluation & Data Pipeline Prep'
        }
      ]
    },
    {
      id: 'course-cybersecurity',
      title: 'Cybersecurity & Ethical Hacking',
      description: 'Learn penetration testing, vulnerability assessment, threat mitigation, network defense, and ethical hacking.',
      icon: Target,
      gradient: 'from-rose-600 to-amber-600',
      level: 'Beginner to Intermediate',
      modules: '11 Modules',
      duration: '8 Weeks',
      instructor: 'Alex Vance (Cert. Security Architect)',
      skills: ['Network Security', 'Pentesting', 'Linux', 'Wireshark'],
      trackName: 'Cybersecurity',
      mentors: [
        {
          rank: 1,
          name: 'Alex Vance',
          title: 'Certified Chief Information Security Officer (CISO)',
          rating: 4.9,
          reviewsCount: 1380,
          exp: '13+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'Penetration Testing & Zero-Trust Defense'
        },
        {
          rank: 2,
          name: 'Vikramaditya Sengupta',
          title: 'Red Team Security Specialist',
          rating: 4.8,
          reviewsCount: 920,
          exp: '9+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'Ethical Hacking & Vulnerability Analysis'
        },
        {
          rank: 3,
          name: 'Samantha Reed',
          title: 'Cyber Threat Intelligence Lead',
          rating: 4.7,
          reviewsCount: 640,
          exp: '7+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'Wireshark Packet Analysis & Linux Security'
        },
        {
          rank: 4,
          name: 'Harsh Vardhan',
          title: 'Security Operations Center (SOC) Analyst',
          rating: 4.6,
          reviewsCount: 450,
          exp: '4+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'Incident Response & Network Firewalls'
        },
        {
          rank: 5,
          name: 'Karan Singhania',
          title: 'Junior Cyber Auditor',
          rating: 4.5,
          reviewsCount: 290,
          exp: '2+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Security Basics & Password Hashing'
        }
      ]
    },
    {
      id: 'course-devops',
      title: 'Cloud Engineering & DevOps',
      description: 'Master container orchestration, cloud infrastructure as code, automated CI/CD pipelines, and site reliability.',
      icon: Compass,
      gradient: 'from-cyan-600 to-indigo-600',
      level: 'Intermediate',
      modules: '12 Modules',
      duration: '9 Weeks',
      instructor: 'David Miller (AWS Principal Architect)',
      skills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
      trackName: 'Cloud Engineering',
      mentors: [
        {
          rank: 1,
          name: 'David Miller',
          title: 'AWS Principal Cloud Architect & Author',
          rating: 4.9,
          reviewsCount: 1720,
          exp: '14+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'AWS Enterprise Infra & Kubernetes Clusters'
        },
        {
          rank: 2,
          name: 'Rohan Chatterji',
          title: 'Site Reliability Engineering Lead (Google)',
          rating: 4.8,
          reviewsCount: 1050,
          exp: '10+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'Docker Containerization & Terraform IaC'
        },
        {
          rank: 3,
          name: 'Emily Watson',
          title: 'Senior DevOps Architect',
          rating: 4.7,
          reviewsCount: 780,
          exp: '8+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'Automated CI/CD Pipelines & Monitoring'
        },
        {
          rank: 4,
          name: 'Abhinav Saxena',
          title: 'Cloud Systems Engineer',
          rating: 4.6,
          reviewsCount: 470,
          exp: '5+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'Linux Shell & Cloud Security Basics'
        },
        {
          rank: 5,
          name: 'Varun Nair',
          title: 'DevOps Associate',
          rating: 4.5,
          reviewsCount: 310,
          exp: '3+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Git Workflows & Basic Dockerizing'
        }
      ]
    },
    {
      id: 'course-uiux',
      title: 'UI/UX Design & Product Systems',
      description: 'Design stunning user interfaces, interactive wireframes, design tokens, design systems, and user-centered products.',
      icon: Sparkles,
      gradient: 'from-fuchsia-600 to-rose-600',
      level: 'All Levels',
      modules: '8 Modules',
      duration: '5 Weeks',
      instructor: 'Elena Rostova (Lead UX Designer)',
      skills: ['Figma', 'Wireframing', 'Design Systems', 'User Research'],
      trackName: 'UI/UX Design',
      mentors: [
        {
          rank: 1,
          name: 'Elena Rostova',
          title: 'VP of Product Design (Ex-Airbnb Lead)',
          rating: 4.95,
          reviewsCount: 1540,
          exp: '11+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'Design Systems, Figma Mastery & Micro-Interactions'
        },
        {
          rank: 2,
          name: 'Siddharth Kashyap',
          title: 'Lead UX Researcher & Product Strategist',
          rating: 4.8,
          reviewsCount: 890,
          exp: '9+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'User Research, Wireframing & Usability Testing'
        },
        {
          rank: 3,
          name: 'Chloe Bennett',
          title: 'Senior UI/UX Designer',
          rating: 4.7,
          reviewsCount: 670,
          exp: '7+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'Design Tokens, Color Theory & Mobile UI'
        },
        {
          rank: 4,
          name: 'Rhea Kulkarni',
          title: 'Product Interaction Designer',
          rating: 4.6,
          reviewsCount: 430,
          exp: '4+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'Prototyping & Component Libraries'
        },
        {
          rank: 5,
          name: 'Aakash Roy',
          title: 'UI Design Assistant',
          rating: 4.5,
          reviewsCount: 260,
          exp: '2+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Figma Auto-Layout Basics'
        }
      ]
    },
    {
      id: 'course-mobile',
      title: 'Mobile App Development',
      description: 'Build native iOS and Android mobile apps using React Native, Expo, and Flutter with sleek offline storage.',
      icon: Smartphone,
      gradient: 'from-violet-600 to-indigo-600',
      level: 'Intermediate',
      modules: '10 Modules',
      duration: '7 Weeks',
      instructor: 'Kenji Sato (Mobile Tech Lead)',
      skills: ['React Native', 'Flutter', 'Dart', 'iOS', 'Android'],
      trackName: 'Mobile Development',
      mentors: [
        {
          rank: 1,
          name: 'Kenji Sato',
          title: 'Principal Mobile Engineer (Ex-Spotify)',
          rating: 4.9,
          reviewsCount: 1480,
          exp: '12+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'React Native & Cross-Platform iOS/Android Architecture'
        },
        {
          rank: 2,
          name: 'Tanya Bhardwaj',
          title: 'Flutter & Dart Lead Specialist',
          rating: 4.8,
          reviewsCount: 960,
          exp: '8+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'Flutter Animations & Offline State Sync'
        },
        {
          rank: 3,
          name: 'Lucas Dupont',
          title: 'Senior iOS & Swift Architect',
          rating: 4.7,
          reviewsCount: 710,
          exp: '7+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'SwiftUI & Mobile App Store Deployment'
        },
        {
          rank: 4,
          name: 'Deepak Choudhury',
          title: 'Android & React Native Developer',
          rating: 4.6,
          reviewsCount: 480,
          exp: '4+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'Expo Router & Push Notifications'
        },
        {
          rank: 5,
          name: 'Nikhil Saxena',
          title: 'Mobile Instructor Assistant',
          rating: 4.5,
          reviewsCount: 300,
          exp: '3+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Mobile UI Layouts & Navigation'
        }
      ]
    },
    {
      id: 'course-database',
      title: 'Database Architecture & SQL Mastery',
      description: 'Architect high-throughput relational & NoSQL databases, query optimization, indexing, and data security.',
      icon: Database,
      gradient: 'from-amber-600 to-orange-600',
      level: 'Beginner to Advanced',
      modules: '9 Modules',
      duration: '6 Weeks',
      instructor: 'Dr. Sarah Lin (Data Architect)',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'SQL', 'Indexing'],
      trackName: 'Database Architecture',
      mentors: [
        {
          rank: 1,
          name: 'Dr. Sarah Lin',
          title: 'Database & Distributed Storage Architect',
          rating: 4.95,
          reviewsCount: 1610,
          exp: '13+ Years Exp',
          monthlyFee: 3000,
          highlightTag: '🥇 #1 Top Ranked Expert',
          isTop3: true,
          specialty: 'PostgreSQL Query Optimization & Indexing'
        },
        {
          rank: 2,
          name: 'Gautam Nambiar',
          title: 'Principal NoSQL Data Engineer',
          rating: 4.85,
          reviewsCount: 1020,
          exp: '10+ Years Exp',
          monthlyFee: 2499,
          highlightTag: '🥈 #2 Featured Educator',
          isTop3: true,
          specialty: 'MongoDB Sharding & Redis Caching'
        },
        {
          rank: 3,
          name: 'Elena Vance',
          title: 'Senior Database Reliability Engineer',
          rating: 4.75,
          reviewsCount: 740,
          exp: '8+ Years Exp',
          monthlyFee: 1999,
          highlightTag: '🥉 #3 Senior Mentor',
          isTop3: true,
          specialty: 'SQL Schema Design & ACID Compliance'
        },
        {
          rank: 4,
          name: 'Vishal Tripathi',
          title: 'Database Administrator',
          rating: 4.6,
          reviewsCount: 460,
          exp: '5+ Years Exp',
          monthlyFee: 1499,
          highlightTag: '#4 Associate Mentor',
          isTop3: false,
          specialty: 'Database Backups & Security Policies'
        },
        {
          rank: 5,
          name: 'Manish Pandey',
          title: 'SQL Lab Assistant',
          rating: 4.5,
          reviewsCount: 290,
          exp: '2+ Years Exp',
          monthlyFee: 999,
          highlightTag: '#5 Junior Mentor',
          isTop3: false,
          specialty: 'Basic SQL Joins & Data Cleaning'
        }
      ]
    }
  ];

  const filteredCourses = FEATURED_COURSES.filter((course) => {
    if (!searchQuery || !searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      course.title.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.trackName.toLowerCase().includes(q) ||
      course.level.toLowerCase().includes(q) ||
      course.skills.some((skill) => skill.toLowerCase().includes(q))
    );
  });

  const handleOpenDemoVideo = (course) => {
    setActiveDemoCourse(course);
    setRatingSaved(false);
    setTeachingRating(null);
  };

  const handleRateTeacher = (ratingLabel) => {
    setTeachingRating(ratingLabel);
    setRatingSaved(true);
    addXP(25, 'Evaluated Course Demo Lecture');
    if (showToast) {
      showToast(`⭐ Recorded faculty rating "${ratingLabel}" for ${activeDemoCourse?.title}! Saved +25 XP!`, 'success');
    }
  };

  const handleEnrollCourse = (course) => {
    if (showToast) {
      showToast(`🚀 Enrolled in ${course.title}! Loading your learning path...`, 'success');
    }
    setActiveTab('learning-path');
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* 1. Hero Welcome & Motivational AI Banner with Stylish Ambient Lights */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-indigo-50/40 to-slate-50 border border-indigo-100/90 shadow-soft-lg p-6 sm:p-8">
        {/* Ambient Light Flares & Orbs */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 via-purple-400/15 to-pink-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-cyan-400/20 via-blue-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50/90 border border-indigo-200/80 rounded-full text-xs font-bold text-indigo-700 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              AI Intelligent Study Engine Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
              Good day, {userName.split(' ')[0]}! 🚀
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed font-quicksand font-medium">
              You are currently on track for <strong className="text-indigo-600 font-bold font-satoshi">{careerGoal}</strong>. 
              Search courses below or watch Demo Class - 1 lectures to evaluate faculty teaching styles.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium font-quicksand">
              <span className="flex items-center gap-1 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/60">
                <Clock className="w-3.5 h-3.5 text-indigo-500" /> Target: {user?.learningAvailability || '1 hr/day'}
              </span>
              <span className="flex items-center gap-1 bg-amber-50/90 px-2.5 py-1 rounded-lg border border-amber-200/60 text-amber-800 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {streakDays} Day Streak
              </span>
              <span className="flex items-center gap-1 bg-indigo-50/90 px-2.5 py-1 rounded-lg border border-indigo-200/60 text-indigo-800 font-bold">
                <Zap className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> {xpPoints} XP
              </span>
            </div>
          </div>

          {/* Target Readiness Circular Dial Card - Dynamic Progress Ring */}
          <div className="shrink-0 bg-gradient-to-br from-indigo-50/80 via-white to-slate-50 p-5 rounded-2xl border border-indigo-100 text-center shadow-sm flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-600 transition-all duration-1000 ease-out"
                  strokeDasharray={`${readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-900 font-satoshi">{readinessScore}%</span>
                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider font-satoshi">
                  {readinessScore === 0 ? 'Beginner' : 'Ready'}
                </span>
              </div>
            </div>

            <p className="mt-2 text-xs font-bold text-slate-800 font-satoshi relative z-10">{careerGoal}</p>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="mt-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-satoshi relative z-10 hover:underline cursor-pointer"
            >
              View Gap Analysis <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. COURSES SECTION BENEATH GOOD DAY GREETING (SEARCH BAR + DEMO LECTURE VIDEOS) */}
      <div className="space-y-5">
        {/* Course Search Container - Clean, Decent & Matching Page Theme */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-soft-sm space-y-4">
          <div>
            <h2 className="text-lg font-black font-satoshi text-slate-900 tracking-tight flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              Explore Courses & Demo Lectures
            </h2>
            <p className="text-xs text-slate-500 font-quicksand font-medium mt-0.5">
              Search courses by technology or click "Watch Demo Lecture" to preview faculty teaching style.
            </p>
          </div>

          {/* Clean Decent Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search courses by topic or skill (e.g. React, Python, AI, Security)..."
              className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 text-sm font-medium placeholder:text-slate-400 pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all outline-none font-satoshi"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery && setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold bg-slate-200/70 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer transition-colors"
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Decent Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-satoshi font-semibold">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mr-1">Filters:</span>
            {['Web Dev', 'Python', 'AI Systems', 'Cybersecurity', 'DevOps', 'UI/UX', 'Mobile'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery && setSearchQuery(tag)}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer font-medium ${
                  searchQuery?.toLowerCase() === tag.toLowerCase()
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200/60'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Course Cards Grid OR No Courses Found State */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => {
              const CourseIcon = course.icon;
              return (
                <div
                  key={course.id}
                  className="white-card p-5 rounded-3xl flex flex-col justify-between group hover:border-indigo-300 transition-all border border-slate-200/90 shadow-2xs space-y-4"
                >
                  <div className="space-y-3">
                    {/* Header Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${course.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        <CourseIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 font-satoshi">
                        {course.level}
                      </span>
                    </div>

                    {/* Course Title & Description */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-satoshi">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 font-quicksand font-medium leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Instructor Info & Duration */}
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 font-quicksand pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-slate-700">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                        {course.instructor}
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-cyan-500" />
                        {course.duration}
                      </span>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {course.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-satoshi"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* 5 Course Mentors & Fees Preview Box */}
                    {course.mentors && (
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/90 space-y-2 font-satoshi">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                          <span className="flex items-center gap-1.5 text-indigo-700 font-black">
                            <Users className="w-3.5 h-3.5 text-indigo-600" /> 5 Faculty Mentors
                          </span>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                            ₹999 – ₹3,000/mo
                          </span>
                        </div>

                        <div className="space-y-1 text-[11px] font-medium text-slate-600">
                          <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                            <span className="flex items-center gap-1">
                              <Crown className="w-3 h-3 fill-amber-500 text-amber-600" />
                              Top #1: {course.mentors[0].name}
                            </span>
                            <span className="font-black text-emerald-800">₹3,000/mo</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-700 px-1 font-satoshi">
                            <span>🥈 #2 {course.mentors[1].name}</span>
                            <span className="font-bold text-slate-900">₹2,499/mo</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-700 px-1 font-satoshi">
                            <span>🥉 #3 {course.mentors[2].name}</span>
                            <span className="font-bold text-slate-900">₹1,999/mo</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons: View 5 Mentors & Fees, Watch Demo, Start Course */}
                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    {course.mentors && (
                      <button
                        onClick={() => setActiveMentorsCourse(course)}
                        className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-all border border-indigo-200/80 flex items-center justify-center gap-1.5 cursor-pointer font-satoshi"
                      >
                        <Users className="w-3.5 h-3.5 text-indigo-600" /> View All 5 Mentors & Monthly Fees
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenDemoVideo(course)}
                      className="w-full py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer font-satoshi"
                    >
                      <PlayCircle className="w-4 h-4 fill-white" /> Watch Demo Lecture (Demo Class - 1)
                    </button>

                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 font-satoshi">
                        Free Track • Paid Mentorship
                      </span>
                      <button
                        onClick={() => handleEnrollCourse(course)}
                        className="px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 rounded-xl transition-all flex items-center gap-1 cursor-pointer font-satoshi border border-slate-200"
                      >
                        Start Course <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* NO COURSES AVAILABLE EMPTY STATE */
          <div className="white-card p-10 rounded-3xl text-center space-y-4 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-xs">
              <SearchX className="w-8 h-8" />
            </div>
            <div className="space-y-1.5 max-w-md">
              <h3 className="text-xl font-black text-slate-900 font-satoshi">
                No Courses Available
              </h3>
              <p className="text-xs text-slate-500 font-quicksand font-medium leading-relaxed">
                No learning courses matching <span className="font-bold text-indigo-600">"{searchQuery}"</span> were found. Try searching for <strong className="text-slate-800">React, Python, AI, Security, DevOps, UI/UX, or Mobile</strong>.
              </p>
            </div>
            <button
              onClick={() => setSearchQuery && setSearchQuery('')}
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm cursor-pointer font-satoshi"
            >
              Clear Search & Show All Courses
            </button>
          </div>
        )}
      </div>

      {/* DEMO LECTURE VIDEO POPUP MODAL FOR ANY SELECTED COURSE */}
      {activeDemoCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl border border-indigo-500/30 shadow-2xl max-w-3xl w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-bold border border-pink-500/30 flex items-center gap-1.5 font-satoshi">
                  <Video className="w-3.5 h-3.5 text-pink-400" /> Demo Class - 1 Lecture Preview
                </span>
                <span className="text-xs text-slate-400 font-mono">15:00 Mins</span>
              </div>
              
              <button
                onClick={() => setActiveDemoCourse(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="space-y-2">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                <video
                  src={demoVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-300 px-1 font-quicksand gap-1">
                <span className="font-bold text-white font-satoshi">🎓 Course: {activeDemoCourse.title}</span>
                <span className="text-purple-300 font-medium">👨‍🏫 Instructor: {activeDemoCourse.instructor}</span>
              </div>
            </div>

            {/* Faculty Teaching Method Evaluator */}
            <div className="bg-gradient-to-br from-indigo-950/90 via-purple-950/60 to-slate-950 p-5 rounded-2xl border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-satoshi flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" /> Rate Faculty Teaching Style
                </h4>
                <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full font-satoshi">
                  +25 XP Reward
                </span>
              </div>

              <p className="text-xs text-indigo-200 font-quicksand">
                How would you rate {activeDemoCourse.instructor}'s explanation & teaching style in Demo Class - 1?
              </p>

              {ratingSaved ? (
                <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2 font-satoshi">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Your rating "{teachingRating}" for {activeDemoCourse.title} has been saved (+25 XP)!</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { label: '😍 Loved It! (100% Match)', val: 'Loved It' },
                    { label: '👍 Clear & Good Pace', val: 'Clear & Good Pace' },
                    { label: '👌 Satisfactory', val: 'Satisfactory' },
                    { label: '👎 Needs Slower Pace', val: 'Needs Slower Pace' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleRateTeacher(opt.val)}
                      className="p-2.5 bg-white/10 hover:bg-pink-600/80 text-white rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-pink-400 cursor-pointer text-center font-satoshi active:scale-95"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveDemoCourse(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Close Demo
              </button>
              <button
                onClick={() => {
                  setActiveDemoCourse(null);
                  handleEnrollCourse(activeDemoCourse);
                }}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                Enroll & Start Full Course <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5 COURSE MENTORS & MONTHLY FEES DIRECTORY MODAL */}
      {activeMentorsCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 relative font-sans max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-bold text-amber-800 font-satoshi">
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  5 Course Mentors • Top 3 Highlighted Teachers
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-satoshi tracking-tight">
                  Mentors & Monthly Fees — {activeMentorsCourse.title}
                </h2>
                <p className="text-xs text-slate-500 font-quicksand font-medium">
                  Rank #1 Master Instructor fee starts at <strong className="text-emerald-700 font-bold font-satoshi">₹3,000 / month</strong>. Fees reduce progressively by mentor rank down to <strong className="text-emerald-700 font-bold font-satoshi">₹999 / month</strong>.
                </p>
              </div>
              
              <button
                onClick={() => setActiveMentorsCourse(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200/80 text-xs font-satoshi font-bold">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMentorFilter('all')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    mentorFilter === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  All 5 Mentors
                </button>
                <button
                  onClick={() => setMentorFilter('top3')}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    mentorFilter === 'top3'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 fill-current" /> Top 3 Highlighted Teachers Only
                </button>
              </div>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Showing {mentorFilter === 'top3' ? '3 Highlighted Teachers' : 'All 5 Mentors'}
              </span>
            </div>

            {/* 5 Mentors List Grid */}
            <div className="space-y-3">
              {activeMentorsCourse.mentors
                .filter((m) => mentorFilter === 'all' || m.isTop3)
                .map((mentor) => (
                  <div
                    key={mentor.rank}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-satoshi ${
                      mentor.rank === 1
                        ? 'bg-gradient-to-r from-amber-500/10 via-amber-100/40 to-yellow-500/10 border-amber-300 shadow-xs ring-1 ring-amber-400/50'
                        : mentor.rank === 2
                        ? 'bg-slate-50/90 border-slate-300 ring-1 ring-slate-300/60'
                        : mentor.rank === 3
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    {/* Left Column: Avatar, Rank Badge, Name & Specialty */}
                    <div className="flex items-start gap-3.5 max-w-xl">
                      <div className="relative shrink-0">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black shadow-xs ${
                          mentor.rank === 1
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : mentor.rank === 2
                            ? 'bg-slate-300 text-slate-900 font-bold'
                            : mentor.rank === 3
                            ? 'bg-amber-800 text-white font-bold'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold'
                        }`}>
                          {mentor.name.charAt(0)}
                        </div>
                        {mentor.isTop3 && (
                          <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow-xs">
                            <Crown className="w-3 h-3 fill-slate-950" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md border ${
                            mentor.rank === 1
                              ? 'bg-amber-500 text-slate-950 border-amber-400 font-black'
                              : mentor.rank === 2
                              ? 'bg-slate-200 text-slate-800 border-slate-300 font-bold'
                              : mentor.rank === 3
                              ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                              : 'bg-slate-100 text-slate-600 border-slate-200 font-semibold'
                          }`}>
                            {mentor.highlightTag}
                          </span>
                          <span className="text-xs text-amber-700 font-bold flex items-center gap-0.5">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            {mentor.rating} ({mentor.reviewsCount} reviews)
                          </span>
                        </div>

                        <h3 className="text-base font-black text-slate-900 leading-snug">
                          {mentor.name}
                        </h3>
                        <p className="text-xs font-semibold text-slate-600">
                          {mentor.title} • <span className="text-indigo-600 font-bold">{mentor.exp}</span>
                        </p>
                        <p className="text-xs text-slate-500 font-quicksand font-medium pt-0.5">
                          🎯 Specialty: {mentor.specialty}
                        </p>
                        {/* Student Enrolled Count (Children Learning) */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 font-satoshi">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                            mentor.rank === 1
                              ? 'bg-amber-100 text-amber-950 border-amber-300 font-black'
                              : 'bg-indigo-50/80 text-indigo-950 border-indigo-200 font-bold'
                          }`}>
                            <Users className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                            <span>{mentor.studentsCount || (mentor.rank === 1 ? 58 : mentor.rank === 2 ? 46 : mentor.rank === 3 ? 32 : mentor.rank === 4 ? 18 : 4)} Students Enrolled</span>
                            <span className="text-[10px] text-slate-400 font-normal">(Max 60 Batch)</span>
                          </span>
                          {mentor.rank === 1 && (
                            <span className="text-[10px] font-black text-amber-950 bg-amber-300 px-2 py-0.5 rounded-md border border-amber-400 font-satoshi shadow-2xs">
                              🏆 Highest Enrolled (58/60 Students)
                            </span>
                          )}
                          {mentor.rank === 5 && (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 font-satoshi">
                              🌱 Smallest Batch (4/60 Students)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Monthly Fee & Select Button */}
                    <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200/80">
                      <div className="text-left sm:text-right font-satoshi">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Monthly Fee</div>
                        <div className={`text-xl font-black tracking-tight ${
                          mentor.rank === 1
                            ? 'text-emerald-700 text-2xl'
                            : mentor.rank === 2
                            ? 'text-emerald-700'
                            : mentor.rank === 3
                            ? 'text-emerald-700'
                            : 'text-slate-800'
                        }`}>
                          ₹{mentor.monthlyFee.toLocaleString('en-IN')}<span className="text-xs font-semibold text-slate-500">/mo</span>
                        </div>
                        {mentor.rank === 1 && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 font-satoshi">
                            🏆 Top Ranked Tier (₹3,000/mo)
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          addXP(30, `Selected Mentor ${mentor.name}`);
                          if (showToast) {
                            showToast(`🤝 Mentorship requested with ${mentor.name} (₹${mentor.monthlyFee}/mo)! +30 XP!`, 'success');
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 font-satoshi ${
                          mentor.isTop3
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Book Mentor (₹{mentor.monthlyFee}/mo)
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-quicksand">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                Includes 1-on-1 code reviews, weekly live Q&A & personalized career guidance.
              </span>
              <button
                onClick={() => setActiveMentorsCourse(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs cursor-pointer font-satoshi shrink-0"
              >
                Close Mentors Window
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. Quick Action Grid (4 Interactive Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Resume Learning Path',
            desc: 'Module 1.3: Prototype Chain',
            icon: Play,
            color: 'bg-indigo-600 text-white shadow-indigo-600/20',
            tab: 'learning-path',
            tag: 'Next Milestone',
          },
          {
            title: 'Code Practice Lab',
            desc: 'Challenge: Array Debounce',
            icon: Code2,
            color: 'bg-emerald-600 text-white shadow-emerald-600/20',
            tab: 'practice-lab',
            tag: 'Hands-on',
          },
          {
            title: 'Skill Assessment',
            desc: 'React Hooks Diagnostic (4 Qs)',
            icon: BrainCircuit,
            color: 'bg-purple-600 text-white shadow-purple-600/20',
            tab: 'skill-assessment',
            tag: '+180 XP',
          },
          {
            title: 'AI Career Navigator',
            desc: 'Match: 42,000+ open roles',
            icon: Target,
            color: 'bg-blue-600 text-white shadow-blue-600/20',
            tab: 'career-navigator',
            tag: 'Industry Insights',
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              onClick={() => setActiveTab(item.tab)}
              className="white-card-interactive p-4 rounded-2xl cursor-pointer flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${item.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {item.tag}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 truncate">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Dashboard 2-Column Split (AI Daily Focus + Skill Gap Spotlight) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 spans): AI Recommended Daily Focus */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Recommended Tasks Card */}
          <div className="white-card p-6 rounded-3xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Today’s AI Recommended Study Plan</h2>
                  <p className="text-xs text-slate-500">Calibrated for your {user.learningAvailability || '1 hour/day'} preference</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('study-planner')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Full Planner <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {[
                {
                  id: 1,
                  title: 'Complete ES6 Async/Await & Microtask Queue Lab',
                  type: 'Hands-on Coding',
                  time: '25 mins',
                  xp: '+60 XP',
                  tab: 'practice-lab',
                  completed: false,
                },
                {
                  id: 2,
                  title: 'React Custom Hooks & State Sync Video Lesson',
                  type: 'Interactive Video',
                  time: '20 mins',
                  xp: '+45 XP',
                  tab: 'learn',
                  completed: false,
                },
                {
                  id: 3,
                  title: 'Take Quick 4-Question React Diagnostic Assessment',
                  type: 'Assessment Quiz',
                  time: '15 mins',
                  xp: '+180 XP',
                  tab: 'skill-assessment',
                  completed: false,
                }
              ].map((task) => (
                <div 
                  key={task.id}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => addXP(30, 'Completed daily microtask')}
                      className="w-5 h-5 rounded-lg border-2 border-slate-300 hover:border-indigo-600 flex items-center justify-center transition-colors bg-white"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-transparent hover:text-indigo-600" />
                    </button>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{task.title}</p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                        <span className="text-indigo-600 font-semibold">{task.type}</span>
                        <span>•</span>
                        <span>{task.time}</span>
                        <span>•</span>
                        <span className="text-amber-600 font-bold">{task.xp}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab(task.tab)}
                    className="px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-400 text-slate-700 hover:text-indigo-600 text-xs font-bold rounded-xl transition-all shadow-sm shrink-0"
                  >
                    Start Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Learning Path Progress Tracker */}
          <div className="white-card p-6 rounded-3xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Current Phase: Foundation & JS Mastery</h2>
                  <p className="text-xs text-slate-500">Phase 1 of 4 • 75% Complete</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('learning-path')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                View Node Roadmap <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-full rounded-full" style={{ width: '75%' }}></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="font-semibold text-emerald-800">✓ ES6 Syntax & Paradigms</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-md">94% Mastered</span>
                </div>
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span className="font-semibold text-emerald-800">✓ Async Event Loop</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-md">88% Mastered</span>
                </div>
                <div className="p-3 bg-indigo-50/60 rounded-xl border border-indigo-200 flex items-center justify-between">
                  <span className="font-bold text-indigo-900">▶ Object Oriented & Prototypes</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md">60% In-Progress</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-slate-400">
                  <span>🔒 DOM Performance Opt.</span>
                  <span className="text-[10px] font-medium">Up Next</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (1 span): Skill Gap Spotlight & AI Mentor Card */}
        <div className="space-y-6">
          
          {/* Skill Gap Matrix Card */}
          <div className="white-card p-6 rounded-3xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-600" /> Top Priority Skill Gaps
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-700 rounded-full border border-red-100">
                Action Required
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(
                Array.isArray(SKILL_GAP_ANALYSIS)
                  ? SKILL_GAP_ANALYSIS
                  : (SKILL_GAP_ANALYSIS?.criticalGaps || SKILL_GAP_ANALYSIS?.radarData || [])
              ).slice(0, 3).map((gap, i) => {
                const skillName = gap?.skill || gap?.subject || 'Skill Gap';
                const currentVal = gap?.current ?? gap?.student ?? 50;
                const targetVal = gap?.required ?? gap?.target ?? 80;
                const gapVal = gap?.gap ?? Math.abs(targetVal - currentVal);

                return (
                  <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 font-quicksand">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800 font-satoshi">{skillName}</span>
                      <span className="text-red-600 font-extrabold">-{gapVal}% Gap</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-red-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${currentVal}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Current: {currentVal}%</span>
                      <span>Industry Target: {targetVal}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveTab('skill-gap')}
              className="mt-4 w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-colors flex items-center justify-center gap-1.5"
            >
              Bridge These Gaps with AI <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
