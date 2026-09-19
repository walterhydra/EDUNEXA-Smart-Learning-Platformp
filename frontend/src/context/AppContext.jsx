import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USER_PROFILE, 
  ROADMAP_DATA, 
  CAREER_PATHS, 
  SKILL_GAP_ANALYSIS, 
  ASSESSMENTS, 
  PRACTICE_CHALLENGES, 
  PROJECTS_DATA, 
  ACHIEVEMENTS_DATA, 
  STUDY_SCHEDULE,
  EXPLORE_RESOURCES 
} from '../data/mockData';
import { getStudentDataByEmail } from '../data/studentData';
import { api } from '../lib/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load initial state from LocalStorage safely with resilient fallback
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edunexa_user');
      if (saved && saved !== 'undefined' && saved !== 'null') {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return {
            ...INITIAL_USER_PROFILE,
            ...parsed,
            targetRoleDetail: {
              ...INITIAL_USER_PROFILE.targetRoleDetail,
              ...(parsed.targetRoleDetail || {}),
            },
            currentSkills: Array.isArray(parsed.currentSkills) && parsed.currentSkills.length > 0 
              ? parsed.currentSkills 
              : INITIAL_USER_PROFILE.currentSkills,
            interests: Array.isArray(parsed.interests) 
              ? parsed.interests 
              : INITIAL_USER_PROFILE.interests,
            learningPreference: Array.isArray(parsed.learningPreference) 
              ? parsed.learningPreference 
              : INITIAL_USER_PROFILE.learningPreference,
          };
        }
      }
    } catch (err) {
      console.warn('EduNexa: Failed to parse user profile from localStorage, using initial default.', err);
    }
    return INITIAL_USER_PROFILE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const auth = localStorage.getItem('edunexa_auth');
      if (auth !== null && auth !== 'undefined' && auth !== 'null') {
        return JSON.parse(auth);
      }
    } catch (err) {
      console.warn('EduNexa: Failed to parse auth state, using default true.', err);
    }
    return true; // Default true so user directly sees the full interactive dashboard
  });

  // viewMode: 'landing' | 'auth' | 'app'
  const [viewMode, setViewMode] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Student-specific interactive module states
  const [roadmap, setRoadmap] = useState(ROADMAP_DATA);
  const [skillGapAnalysis, setSkillGapAnalysis] = useState(SKILL_GAP_ANALYSIS);
  const [practiceChallenges, setPracticeChallenges] = useState(PRACTICE_CHALLENGES);
  const [projectsData, setProjectsData] = useState(PROJECTS_DATA);
  const [assessmentsList, setAssessmentsList] = useState(ASSESSMENTS);
  const [plannerEvents, setPlannerEvents] = useState(STUDY_SCHEDULE);
  const [exploreResourcesList, setExploreResourcesList] = useState(EXPLORE_RESOURCES);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS_DATA);

  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [studentDashboard, setStudentDashboard] = useState(null);

  // Apply student-specific dataset for all 11 modules
  const applyStudentSpecificModules = (email) => {
    const studentData = getStudentDataByEmail(email);
    if (studentData) {
      setRoadmap(studentData.roadmap);
      setPracticeChallenges(studentData.practiceChallenges);
      setProjectsData(studentData.projects);
      setAssessmentsList(studentData.assessments);
      setPlannerEvents(studentData.plannerEvents);
      setExploreResourcesList(studentData.exploreResources);
    }
  };

  // Student-specific real-time dashboard sync from Neon PostgreSQL DB
  const fetchStudentDashboard = async () => {
    const token = localStorage.getItem('edunexa_token');
    if (!token) return;

    try {
      const res = await api.getStudentDashboard(token);
      if (res.success && res.data) {
        const d = res.data;
        setStudentDashboard(d);

        // Populate all 11 sub-modules for logged-in student email
        applyStudentSpecificModules(d.studentInfo.email);

        // Update user state with student-specific data
        setUser(prev => ({
          ...prev,
          id: d.studentInfo.id,
          name: d.studentInfo.name,
          email: d.studentInfo.email,
          careerGoal: d.studentInfo.targetTrack,
          education: d.studentInfo.education,
          institution: d.studentInfo.institution,
          streakDays: d.studentInfo.streakDays,
          xpPoints: d.studentInfo.xpPoints,
          rank: d.studentInfo.rank,
          learningAvailability: d.studentInfo.dailyPace,
          targetRoleDetail: {
            title: d.studentInfo.targetTrack,
            readinessScore: d.studentInfo.readinessScore,
            marketDemand: 'High Demand 🔥',
            avgSalary: '$115,000 / ₹20 LPA',
          },
        }));

        // Dynamically update Skill Gap Analysis from DB Skill Requirements
        if (Array.isArray(d.skillRequirements) && d.skillRequirements.length > 0) {
          setSkillGapAnalysis(
            d.skillRequirements.map(s => ({
              skill: s.skillName,
              current: s.currentProficiency,
              target: s.requiredProficiency,
              gap: -(s.requiredProficiency - s.currentProficiency),
              category: s.category,
              status: s.status,
            }))
          );
        }
      }
    } catch (err) {
      console.warn('EduNexa: Failed to fetch student dashboard data.', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudentDashboard();
    }
  }, [isAuthenticated]);

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('edunexa_user', JSON.stringify(user));
        if (user.email) {
          applyStudentSpecificModules(user.email);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [user?.email]);

  useEffect(() => {
    try {
      localStorage.setItem('edunexa_auth', JSON.stringify(isAuthenticated));
    } catch (e) {
      console.error(e);
    }
  }, [isAuthenticated]);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addXP = async (amount, reason = 'Activity completed') => {
    const token = localStorage.getItem('edunexa_token');
    setUser(prev => {
      const newXP = prev.xpPoints + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      
      // Calculate dynamic rank
      let newRank = prev.rank;
      if (newXP >= 10000) newRank = 'Master Innovator';
      else if (newXP >= 5000) newRank = 'Gold Scholar';
      else if (newXP >= 3000) newRank = 'Bronze Scholar';
      else if (newXP >= 1000) newRank = 'Silver Apprentice';
      else newRank = 'Novice Explorer';

      if (newLevel > prev.level) {
        showToast(`🎉 Level Up! You reached Level ${newLevel} (+${amount} XP)`, 'success');
      } else {
        showToast(`+${amount} XP: ${reason}`, 'success');
      }
      return {
        ...prev,
        xpPoints: newXP,
        level: newLevel,
        rank: newRank,
      };
    });

    if (token) {
      try {
        await api.addXP(token, amount, reason);
        fetchStudentDashboard();
      } catch (err) {
        // Offline fallback
      }
    }
  };

  // Adaptive Roadmap Engine: Recalculates skill scores & updates roadmap
  const updateSkillScoreAndAdaptRoadmap = (skillName, newScore) => {
    setSkillGapAnalysis(prev => prev.map(item => {
      if (item.skill.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(item.skill.toLowerCase())) {
        const target = item.target || 80;
        const newGap = Math.max(0, target - newScore);
        return {
          ...item,
          current: newScore,
          gap: -newGap,
        };
      }
      return item;
    }));

    setUser(prev => {
      const updatedReadiness = Math.min(95, (prev.targetRoleDetail?.readinessScore || 64) + 8);
      return {
        ...prev,
        targetRoleDetail: {
          ...prev.targetRoleDetail,
          readinessScore: updatedReadiness,
        },
      };
    });

    setRoadmap(prev => prev.map(module => {
      if (module.status === 'locked' || module.status === 'available') {
        return {
          ...module,
          status: 'in-progress',
          progress: Math.min(100, module.progress + 25),
        };
      }
      return module;
    }));

    showToast(`⚡ Skill Score Updated! Target Readiness is now higher. Learning Roadmap adapted automatically!`, 'success');
  };

  const completeOnboarding = (onboardingData) => {
    const goal = onboardingData.careerGoal || "Full Stack Developer";
    const scoreMap = { 'Beginner': 40, 'Intermediate': 70, 'Advanced': 90 };

    // 1. Update User State
    setUser(prev => ({
      ...prev,
      ...onboardingData,
      onboardingCompleted: true,
      careerGoal: goal,
      learningAvailability: onboardingData.learningAvailability || '1 hour/day',
      targetRoleDetail: {
        title: goal,
        marketDemand: "High Demand (+28% YoY)",
        avgSalary: goal.includes('Data') ? "$120,000 / ₹20 LPA" : "$115,000 / ₹18 LPA",
        readinessScore: prev.targetRoleDetail?.readinessScore ?? 0,
      }
    }));

    // 2. Dynamically Update Skill Gap Analysis from Selected Skills
    if (Array.isArray(onboardingData.currentSkills) && onboardingData.currentSkills.length > 0) {
      setSkillGapAnalysis(
        onboardingData.currentSkills.map(s => {
          const currentScore = typeof s.score === 'number' ? s.score : (scoreMap[s.level] || 40);
          const targetScore = 85;
          return {
            skill: s.name,
            current: currentScore,
            target: targetScore,
            gap: -(targetScore - currentScore),
            category: 'Core Competency',
            status: currentScore >= 80 ? 'MASTERED' : currentScore >= 60 ? 'IN_PROGRESS' : 'LACKING',
          };
        })
      );
    }

    // 3. Adapt Roadmap Based on Selected Career Goal
    if (goal === 'Frontend Developer') {
      setRoadmap([
        {
          phaseId: 'p1_fe',
          phaseTitle: 'Phase 1: Modern JavaScript & HTML/CSS Standards',
          duration: 'Weeks 1-3',
          progressPercent: 30,
          description: 'Master ES6+ syntax, Async/Await, DOM Manipulation, and Flexbox/Grid layouts.',
          modules: [
            { id: 'm1_fe', title: 'ES6+ JavaScript Core Syntax', duration: '1 hr', status: 'completed', type: 'Interactive Lab', progress: 100, skillsGained: ['JavaScript', 'ES6'] },
            { id: 'm2_fe', title: 'CSS Flexbox & Responsive Layouts', duration: '1.5 hrs', status: 'in-progress', type: 'Lab', progress: 50, skillsGained: ['CSS Grid', 'Flexbox'] },
          ],
        },
        {
          phaseId: 'p2_fe',
          phaseTitle: 'Phase 2: React Component Architecture & Hooks',
          duration: 'Weeks 4-7',
          progressPercent: 0,
          description: 'Build interactive SPA UIs using React, JSX, useState, useEffect, and Tailwind CSS.',
          modules: [
            { id: 'm3_fe', title: 'React Hooks & State Management', duration: '2 hrs', status: 'unlocked', type: 'Project', skillsGained: ['React', 'Hooks'] },
          ],
        },
      ]);
    } else if (goal === 'Backend Developer') {
      setRoadmap([
        {
          phaseId: 'p1_be',
          phaseTitle: 'Phase 1: Node.js Core & Express REST API Design',
          duration: 'Weeks 1-4',
          progressPercent: 20,
          description: 'Build modular HTTP servers, routing, middleware, and JWT authentication.',
          modules: [
            { id: 'm1_be', title: 'Express.js REST APIs & Middleware', duration: '2 hrs', status: 'in-progress', type: 'Lab', progress: 40, skillsGained: ['Node.js', 'Express'] },
          ],
        },
        {
          phaseId: 'p2_be',
          phaseTitle: 'Phase 2: Database Schema & Relational Integration',
          duration: 'Weeks 5-8',
          progressPercent: 0,
          description: 'Design PostgreSQL schemas, write complex queries, and use Prisma ORM.',
          modules: [
            { id: 'm2_be', title: 'PostgreSQL & Prisma ORM Integration', duration: '2.5 hrs', status: 'unlocked', type: 'Project', skillsGained: ['SQL', 'Prisma'] },
          ],
        },
      ]);
    }

    setIsAuthenticated(true);
    setViewMode('app');
    setActiveTab('dashboard');
    showToast('🚀 AI Personalized Learning Path successfully generated!', 'success');
  };

  const resetToNewUserOnboarding = () => {
    setUser({
      name: '',
      email: '',
      education: '',
      college: '',
      degree: '',
      year: '',
      interests: [],
      currentSkills: [],
      careerGoal: '',
      learningAvailability: '',
      learningPreference: [],
      streakDays: 1,
      xpPoints: 100,
      level: 1,
      rank: "Novice Explorer",
      weeklyGoalHours: 5,
      completedHoursThisWeek: 0,
      onboardingCompleted: false,
    });
    setIsAuthenticated(false);
    setViewMode('auth');
  };

  const loginWithDemo = () => {
    setUser(INITIAL_USER_PROFILE);
    setIsAuthenticated(true);
    setViewMode('app');
    setActiveTab('dashboard');
    showToast('👋 Welcome back! Loaded student profile.', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setViewMode('landing');
    setStudentDashboard(null);
    localStorage.removeItem('edunexa_token');
    localStorage.removeItem('edunexa_user');
    showToast('You have been signed out.', 'info');
  };

  const togglePlannerEvent = (id) => {
    setPlannerEvents(prev => prev.map(evt => {
      if (evt.id === id) {
        const nextStatus = evt.status === 'done' ? 'pending' : 'done';
        if (nextStatus === 'done') addXP(30, 'Completed scheduled study session');
        return { ...evt, status: nextStatus };
      }
      return evt;
    }));
  };

  const [isCourseCompleted, setIsCourseCompleted] = useState(true);

  const markCourseCompleted = () => {
    setIsCourseCompleted(true);
    addXP(150, 'Completed Full SkillSense AI Master Course');
    showToast('🏆 Course Completed! Official Certificate unlocked in Achievements.', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        studentDashboard,
        fetchStudentDashboard,
        isAuthenticated,
        setIsAuthenticated,
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        roadmap,
        setRoadmap,
        skillGapAnalysis,
        setSkillGapAnalysis,
        updateSkillScoreAndAdaptRoadmap,
        plannerEvents,
        setPlannerEvents,
        togglePlannerEvent,
        achievements,
        setAchievements,
        isCourseCompleted,
        setIsCourseCompleted,
        markCourseCompleted,
        toastMessage,
        showToast,
        addXP,
        completeOnboarding,
        resetToNewUserOnboarding,
        loginWithDemo,
        logout,
        searchQuery,
        setSearchQuery,
        CAREER_PATHS,
        SKILL_GAP_ANALYSIS: skillGapAnalysis,
        ASSESSMENTS: assessmentsList,
        PRACTICE_CHALLENGES: practiceChallenges,
        PROJECTS_DATA: projectsData,
        EXPLORE_RESOURCES: exploreResourcesList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
