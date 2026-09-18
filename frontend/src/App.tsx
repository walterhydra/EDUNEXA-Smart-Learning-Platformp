import { useEffect, useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { supabase } from './lib/supabase';
import { useApp } from './context/AppContext';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

// 14 Module Views from edunexa 1
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { LearningPathView } from './components/roadmap/LearningPathView';
import { CareerNavigator } from './components/career/CareerNavigator';
import { SkillAssessment } from './components/assessment/SkillAssessment';
import { SkillGapAnalysis } from './components/skillgap/SkillGapAnalysis';
import { LearnCoursePlayer } from './components/learn/LearnCoursePlayer';
import { AiMentorChat } from './components/mentor/AiMentorChat';
import { PracticeLab } from './components/lab/PracticeLab';
import { ProjectsHub } from './components/projects/ProjectsHub';
import { MyProgress } from './components/progress/MyProgress';
import { AchievementsView } from './components/achievements/AchievementsView';
import { StudyPlanner } from './components/planner/StudyPlanner';
import { ExploreResources } from './components/resources/ExploreResources';
import { MyProfile } from './components/profile/MyProfile';

import { CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

function MainDashboardShell({ onLogout }: { onLogout: () => void }) {
  const { 
    user, 
    isAuthenticated, 
    activeTab, 
    toastMessage,
    logout: appLogout
  } = useApp();

  const [isOnboarding, setIsOnboarding] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [onboardingInitialData, setOnboardingInitialData] = useState({});

  // 1. If user is running the 6-Step Onboarding Wizard
  if (isOnboarding || (!user?.onboardingCompleted && isAuthenticated)) {
    return (
      <OnboardingWizard 
        initialData={onboardingInitialData} 
        onComplete={() => setIsOnboarding(false)} 
      />
    );
  }

  // 2. Render current active tab component out of 14 modules
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
      case 'practice-lab':
        return <PracticeLab />;
      case 'projects':
        return <ProjectsHub />;
      case 'progress':
        return <MyProgress />;
      case 'achievements':
        return <AchievementsView />;
      case 'study-planner':
        return <StudyPlanner />;
      case 'explore-resources':
        return <ExploreResources />;
      case 'my-profile':
        return <MyProfile onReplayOnboarding={() => setIsOnboarding(true)} />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      {/* 14-Module Sidebar Navigation (Matches Second Photo) */}
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

      {/* Floating Toast Alerts */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
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
}

export function App() {
  const [supabaseUser, setSupabaseUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsAuthenticated, setUser: setAppContextUser } = useApp();

  useEffect(() => {
    // Fetch active Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    });

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        setIsAuthenticated(true);
      } else {
        setSupabaseUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setIsAuthenticated]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-slate-950 text-white flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Loading EDUNEXA...</p>
        </div>
      </div>
    );
  }

  // Render Second Photo UI (edunexa 1 Dashboard) when logged in
  if (supabaseUser) {
    return <MainDashboardShell onLogout={() => setSupabaseUser(null)} />;
  }

  return (
    <LoginPage
      onLoginSuccess={(u) => {
        setSupabaseUser(u);
        setIsAuthenticated(true);
        if (u?.email) {
          setAppContextUser((prev: any) => ({
            ...prev,
            email: u.email,
            name: u.user_metadata?.full_name || u.email.split('@')[0],
          }));
        }
      }}
    />
  );
}

export default App;
