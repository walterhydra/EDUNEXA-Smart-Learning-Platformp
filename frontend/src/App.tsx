import React, { useEffect, useState } from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { api } from './lib/api';
import { supabase } from './lib/supabase';

// Module Views
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { LearningPathView } from './components/roadmap/LearningPathView';
import { CareerNavigator } from './components/career/CareerNavigator';
import { SkillAssessment } from './components/assessment/SkillAssessment';
import { SkillGapAnalysis } from './components/skillgap/SkillGapAnalysis';
import { LearnCoursePlayer } from './components/learn/LearnCoursePlayer';
import { AiMentorChat } from './components/mentor/AiMentorChat';
import { LiveMentorInteraction } from './components/mentor/LiveMentorInteraction';
import { PracticeLab } from './components/lab/PracticeLab';
import { AnimationStudy } from './components/study/AnimationStudy';
import { ProjectsHub } from './components/projects/ProjectsHub';
import { MyProgress } from './components/progress/MyProgress';
import { AchievementsView } from './components/achievements/AchievementsView';
import { StudyPlanner } from './components/planner/StudyPlanner';
import { MyProfile } from './components/profile/MyProfile';
import { JarvisAiAssistant } from './components/common/JarvisAiAssistant';

import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export const App = () => {
  const { 
    user, 
    setUser,
    isAuthenticated, 
    setIsAuthenticated, 
    viewMode,
    setViewMode,
    activeTab, 
    toastMessage 
  } = useApp();

  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [onboardingInitialData, setOnboardingInitialData] = useState({});
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Sync Auth session with Express Backend JWT Token and Supabase
  useEffect(() => {
    async function checkAuthSession() {
      const storedToken = localStorage.getItem('edunexa_token');
      if (storedToken) {
        const res = await api.getMe(storedToken);
        if (res.success && res.data?.user) {
          setIsAuthenticated(true);
          setViewMode('app');
          setUser((prev: any) => ({
            ...prev,
            name: res.data.user.name || res.data.user.email?.split('@')[0] || 'Learner',
            email: res.data.user.email || '',
            role: res.data.user.role || 'STUDENT',
          }));
          setIsAuthLoading(false);
          return;
        }
      }

      // Check Supabase as secondary source
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsAuthenticated(true);
          setViewMode('app');
          setUser((prev: any) => ({
            ...prev,
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Learner',
            email: session.user.email || '',
          }));
        }
      } catch (e) {
        // Safe fallback
      } finally {
        setIsAuthLoading(false);
      }
    }

    checkAuthSession();
  }, [setIsAuthenticated, setViewMode, setUser]);

  // Triggered when user wants to start fresh onboarding
  const handleStartOnboarding = (initialData = {}) => {
    setOnboardingInitialData(initialData);
    setIsOnboarding(true);
  };

  if (isAuthLoading) {
    return (
      <div className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Loading EDUNEXA Platform...</p>
        </div>
      </div>
    );
  }

  // Direct Login & Sign Up Page when unauthenticated
  if (!isAuthenticated) {
    return (
      <LoginPage 
        onLoginSuccess={(u) => {
          setIsAuthenticated(true);
          const emailLower = (u.email || '').toLowerCase();
          const isSeededDemo = emailLower === 'rahul.python@edunexa.edu' || 
                              emailLower === 'priya.fullstack@edunexa.edu' || 
                              emailLower === 'arjun.ai@edunexa.edu';

          // Zero-state initialization for newly registered accounts or incomplete profiles
          if (!isSeededDemo && !u.onboardingCompleted) {
            setUser({
              id: u.id || `usr_${Date.now()}`,
              name: u.name || u.email?.split('@')[0] || 'New Student',
              email: u.email || '',
              role: u.role || 'STUDENT',
              education: 'Undergraduate (B.Tech / B.E / B.Sc / BCA)',
              college: '',
              degree: '',
              year: '3rd Year (Junior)',
              interests: [],
              currentSkills: [],
              careerGoal: 'Full Stack Developer',
              learningAvailability: '1 hour/day',
              learningPreference: [],
              streakDays: 0,
              xpPoints: 0,
              level: 1,
              rank: 'Novice Learner (Level 1)',
              weeklyGoalHours: 7,
              completedHoursThisWeek: 0,
              onboardingCompleted: false,
              targetRoleDetail: {
                title: 'General Computer Science & Skill Diagnostic Track',
                readinessScore: 0,
                marketDemand: 'High Demand 🔥',
                avgSalary: '$115,000 / ₹20 LPA',
              },
            });
            setOnboardingInitialData({ name: u.name, email: u.email });
            setIsOnboarding(true);
          } else {
            setUser((prev: any) => ({
              ...prev,
              name: u.name || prev.name,
              email: u.email || prev.email,
              role: u.role || prev.role || 'STUDENT',
            }));
            setViewMode('app');
          }
        }} 
      />
    );
  }

  // Onboarding Wizard
  if (isOnboarding && !user?.onboardingCompleted) {
    return (
      <OnboardingWizard 
        initialData={onboardingInitialData} 
        onComplete={() => setIsOnboarding(false)} 
      />
    );
  }

  // Main App Shell
  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'learning-path':
        return <LearningPathView />;
      case 'career-navigator':
        return <CareerNavigator />;
      case 'skill-assessment':
        return <SkillAssessment />;
      case 'skill-gap':
        return <SkillGapAnalysis />;
      case 'learn':
        return <LearnCoursePlayer />;
      case 'ai-mentor':
        return <AiMentorChat />;
      case 'live-mentor':
        return <LiveMentorInteraction />;
      case 'practice-lab':
        return <PracticeLab />;
      case 'animation-study':
        return <AnimationStudy />;
      case 'projects':
        return <ProjectsHub />;
      case 'progress':
        return <MyProgress />;
      case 'achievements':
        return <AchievementsView />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'my-profile':
        return <MyProfile onReplayOnboarding={() => setIsOnboarding(true)} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans relative">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Scrollable Page Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 subtle-mesh-bg">
          <div className="max-w-7xl mx-auto">
            {renderActiveModule()}
          </div>
        </main>
      </div>

      {/* JARVIS Floating AI Chatbot Assistant Sphere Ball & Inbox */}
      <JarvisAiAssistant />

      {/* Floating Toast Alerts */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-slate-900/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 max-w-md">
            {toastMessage.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toastMessage.type === 'info' && <Sparkles className="w-5 h-5 text-indigo-400 shrink-0" />}
            <span className="text-xs sm:text-sm font-medium">{toastMessage.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
