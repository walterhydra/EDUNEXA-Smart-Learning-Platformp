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

  const [activeTab, setActiveTab] = useState('dashboard');
  const [roadmap, setRoadmap] = useState(ROADMAP_DATA);
  const [plannerEvents, setPlannerEvents] = useState(STUDY_SCHEDULE);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS_DATA);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist user
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('edunexa_user', JSON.stringify(user));
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

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

  const addXP = (amount, reason = 'Activity completed') => {
    setUser(prev => {
      const newXP = prev.xpPoints + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      if (newLevel > prev.level) {
        showToast(`🎉 Level Up! You reached Level ${newLevel} (+${amount} XP)`, 'success');
      } else {
        showToast(`+${amount} XP: ${reason}`, 'success');
      }
      return {
        ...prev,
        xpPoints: newXP,
        level: newLevel,
      };
    });
  };

  const completeOnboarding = (onboardingData) => {
    const calculatedTargetReadiness = 65; // Dynamic start score
    setUser(prev => ({
      ...prev,
      ...onboardingData,
      onboardingCompleted: true,
      targetRoleDetail: {
        title: onboardingData.careerGoal || "Full Stack Developer",
        marketDemand: "High Demand (+28% YoY)",
        avgSalary: "$112,000 / ₹18.5 LPA",
        readinessScore: calculatedTargetReadiness,
      }
    }));
    setIsAuthenticated(true);
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
  };

  const loginWithDemo = () => {
    setUser(INITIAL_USER_PROFILE);
    setIsAuthenticated(true);
    setActiveTab('dashboard');
    showToast('👋 Welcome back, Aarav! Loaded demo student profile.', 'info');
  };

  const logout = () => {
    setIsAuthenticated(false);
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

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        activeTab,
        setActiveTab,
        roadmap,
        setRoadmap,
        plannerEvents,
        setPlannerEvents,
        togglePlannerEvent,
        achievements,
        setAchievements,
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
        SKILL_GAP_ANALYSIS,
        ASSESSMENTS,
        PRACTICE_CHALLENGES,
        PROJECTS_DATA,
        EXPLORE_RESOURCES,
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
