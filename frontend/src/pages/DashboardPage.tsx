import React, { useState } from 'react';
import {
  BookOpenCheck,
  LogOut,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Bell,
  CheckCircle2,
  UserCheck,
  ShieldCheck,
  Compass,
  Award,
  Zap,
  LayoutDashboard,
  Target,
  Brain,
  BarChart3,
  BookOpen,
  Bot,
  FlaskConical,
  Rocket,
  LineChart,
  Trophy,
  Calendar,
  Search,
  User,
  Menu,
  X,
  Play,
  Check,
  Send,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRealtimeSubscription } from '../hooks/useRealtimeSubscription';
import { OnboardingModal } from '../components/OnboardingModal';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  created_at: string;
}

export const DashboardPage: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const userRole = user?.user_metadata?.role || 'STUDENT';
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Learner';

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [userCareer, setUserCareer] = useState<string>('Full Stack Developer');
  const [chatMessages, setChatMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: `Hello ${userName}! How can I assist you with your ${userCareer} learning roadmap today?` },
  ]);
  const [chatInput, setChatInput] = useState('');

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Welcome to EDUNEXA!',
      message: 'Your personalized learning roadmap has been initialized.',
      created_at: new Date().toLocaleTimeString(),
    },
  ]);

  const [skills] = useState([
    { name: 'React & TypeScript', level: 85, category: 'Frontend', color: 'bg-indigo-500' },
    { name: 'Node.js & Express', level: 72, category: 'Backend', color: 'bg-emerald-500' },
    { name: 'PostgreSQL & Prisma', level: 68, category: 'Database', color: 'bg-blue-500' },
    { name: 'AI Engineering & LLMs', level: 90, category: 'Intelligence', color: 'bg-purple-500' },
  ]);

  // Subscribe to real-time notifications from Supabase
  useRealtimeSubscription<NotificationItem>({
    table: 'notifications',
    event: 'INSERT',
    onData: (payload) => {
      if (payload.new && typeof payload.new === 'object') {
        const newItem: NotificationItem = {
          id: (payload.new as any).id || String(Date.now()),
          title: (payload.new as any).title || 'New Realtime Notification',
          message: (payload.new as any).message || 'You received a new update from Supabase DB.',
          created_at: (payload.new as any).created_at || new Date().toLocaleTimeString(),
        };
        setNotifications((prev) => [newItem, ...prev]);
      }
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: chatInput },
      {
        sender: 'ai',
        text: `Great question about "${chatInput}"! I recommend focusing on practical exercises in the Practice Lab to boost your skill evidence score.`,
      },
    ]);
    setChatInput('');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learning_path', label: 'My Learning Path', icon: Compass },
    { id: 'career_navigator', label: 'Career Navigator', icon: Target },
    { id: 'skill_assessment', label: 'Skill Assessment', icon: Brain },
    { id: 'skill_gap', label: 'Skill Gap', icon: BarChart3 },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'ai_mentor', label: 'AI Mentor', icon: Bot },
    { id: 'practice_lab', label: 'Practice Lab', icon: FlaskConical },
    { id: 'projects', label: 'Projects', icon: Rocket },
    { id: 'progress', label: 'My Progress', icon: LineChart },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'study_planner', label: 'Study Planner', icon: Calendar },
    { id: 'explore', label: 'Explore Resources', icon: Search },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <div className="h-screen w-screen max-w-vw overflow-hidden bg-slate-950 text-slate-100 flex font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-wider text-white font-serif uppercase">
                EDUNEXA
              </span>
              <span className="block text-[8px] font-bold uppercase tracking-widest text-indigo-400">
                Smart Education
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Onboarding Trigger & Profile Footer */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="w-full py-2 px-3 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-xs font-semibold text-indigo-300 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Re-run Onboarding
          </button>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight truncate max-w-[100px]">{userName}</p>
                <span className="text-[10px] text-slate-400 uppercase font-bold">{userRole}</span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base font-bold text-white capitalize">
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Supabase Realtime Sync
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 rounded-lg border border-slate-700 text-slate-300">
              Goal: {userCareer}
            </span>
          </div>
        </header>

        {/* Tab Content Display */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-6 md:p-8 shadow-2xl">
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-medium text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Personalized Adaptive Roadmap
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    Welcome, <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">{userName}</span>!
                  </h2>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl">
                    Your customized career track for <strong className="text-indigo-300">{userCareer}</strong> is continuously updating based on measurable skill evidence.
                  </p>
                </div>
              </div>

              {/* Grid Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Skill Progress Matrix */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                        <h3 className="text-base font-bold text-white">Current Skill Evidence</h3>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold">4/4 Skills Tracked</span>
                    </div>

                    <div className="space-y-3">
                      {skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-slate-200">{skill.name}</span>
                            <span className="text-indigo-400 font-bold">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Learning Path */}
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center gap-2">
                      <Compass className="w-5 h-5 text-purple-400" />
                      <h3 className="text-base font-bold text-white">Active Learning Roadmap</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <div>
                            <h4 className="text-xs font-semibold text-white">1. Core Fundamentals & Setup</h4>
                            <p className="text-[11px] text-slate-400">Score: 92% • Completed</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 text-indigo-400 animate-pulse shrink-0" />
                          <div>
                            <h4 className="text-xs font-semibold text-white">2. Real-time Database Sync (Supabase)</h4>
                            <p className="text-[11px] text-indigo-300">In Progress • CDC & WebSockets</p>
                          </div>
                        </div>
                        <button onClick={() => setActiveTab('learn')} className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg">
                          Continue
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Feed & Quick Actions */}
                <div className="space-y-6">
                  <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-base font-bold text-white">Live Updates</h3>
                      </div>
                    </div>

                    <div className="space-y-2.5 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs space-y-1">
                          <div className="flex justify-between font-semibold text-slate-200">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.created_at}</span>
                          </div>
                          <p className="text-slate-400 text-[11px]">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY LEARNING PATH */}
          {activeTab === 'learning_path' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" /> Personalized Learning Path ({userCareer})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Module 1</span>
                    <h3 className="text-sm font-bold text-white">Frontend Architecture & React</h3>
                    <p className="text-xs text-slate-400">Master state management, custom hooks & performance.</p>
                  </div>
                  <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl space-y-2">
                    <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Module 2</span>
                    <h3 className="text-sm font-bold text-white">Backend APIs & Supabase DB</h3>
                    <p className="text-xs text-slate-400">Build RESTful routes, JWT authentication & Realtime CDC.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAREER NAVIGATOR */}
          {activeTab === 'career_navigator' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" /> Career Navigator
                </h2>
                <p className="text-xs text-slate-300">Compare your skills against industry standards for {userCareer}.</p>
                <div className="p-4 bg-purple-950/30 border border-purple-500/20 rounded-xl space-y-2">
                  <h3 className="text-sm font-bold text-white">Target Job Title: Senior {userCareer}</h3>
                  <p className="text-xs text-slate-400">Market Demand: High • Average Salary: $110,000/yr</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SKILL ASSESSMENT */}
          {activeTab === 'skill_assessment' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-400" /> Skill Assessment Center
                </h2>
                <p className="text-xs text-slate-300">Take an adaptive diagnostic test to update your skill evidence scores.</p>
                <button className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs rounded-xl shadow-md">
                  Start 10-Minute Assessment
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SKILL GAP */}
          {activeTab === 'skill_gap' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" /> Skill Gap Analysis
                </h2>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-800/40 rounded-xl flex justify-between items-center text-xs">
                    <span>Database Indexing & Realtime</span>
                    <span className="text-rose-400 font-bold">-15% Gap</span>
                  </div>
                  <div className="p-3 bg-slate-800/40 rounded-xl flex justify-between items-center text-xs">
                    <span>TypeScript Generics</span>
                    <span className="text-emerald-400 font-bold">+5% Mastery</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LEARN */}
          {activeTab === 'learn' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" /> Learning Resources Hub
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl space-y-2">
                    <h3 className="text-xs font-bold text-white flex items-center gap-1.5"><Play className="w-4 h-4 text-rose-400" /> Supabase Realtime Masterclass</h3>
                    <p className="text-[11px] text-slate-400">25 mins video course with hands-on practice.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AI MENTOR */}
          {activeTab === 'ai_mentor' && (
            <div className="h-[520px] bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Bot className="w-5 h-5 text-purple-400" />
                <h2 className="text-base font-bold text-white">EDUNEXA AI Mentor</h2>
              </div>

              <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-md p-3 rounded-2xl text-xs ${
                        msg.sender === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none'
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask your AI mentor anything..."
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <button onClick={handleSendMessage} className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: PRACTICE LAB */}
          {activeTab === 'practice_lab' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-teal-400" /> Practice Lab & Coding Playground
                </h2>
                <p className="text-xs text-slate-300">Solve interactive coding challenges to build your portfolio evidence.</p>
              </div>
            </div>
          )}

          {/* TAB 9: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-indigo-400" /> Real-World Projects
                </h2>
                <div className="p-4 bg-slate-800/40 border border-slate-700 rounded-xl space-y-2">
                  <h3 className="text-xs font-bold text-white">Project 1: Real-time Collaborative Board</h3>
                  <p className="text-[11px] text-slate-400">Tech Stack: React, Node.js, Supabase Realtime, Tailwind CSS</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: PROGRESS */}
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-emerald-400" /> Detailed Progress Analytics
                </h2>
                <p className="text-xs text-slate-300">Track your weekly learning consistency and skill growth rates.</p>
              </div>
            </div>
          )}

          {/* TAB 11: ACHIEVEMENTS */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" /> Achievements & Badges
                </h2>
                <div className="flex gap-4">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white">Supabase Explorer</h4>
                      <p className="text-[10px] text-slate-400">Connected DB & Realtime CDC</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: STUDY PLANNER */}
          {activeTab === 'study_planner' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" /> Study Planner & Schedule
                </h2>
                <p className="text-xs text-slate-300">Set daily learning goals (e.g. 45 mins/day) and track habits.</p>
              </div>
            </div>
          )}

          {/* TAB 13: EXPLORE */}
          {activeTab === 'explore' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-400" /> Explore Educational Resources
                </h2>
                <p className="text-xs text-slate-300">Discover curated articles, videos, and documentation for your career track.</p>
              </div>
            </div>
          )}

          {/* TAB 14: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-400" /> My Profile Settings
                </h2>
                <div className="p-4 bg-slate-800/40 rounded-xl space-y-2 text-xs">
                  <p><strong className="text-slate-400">Full Name:</strong> {userName}</p>
                  <p><strong className="text-slate-400">Email:</strong> {user?.email}</p>
                  <p><strong className="text-slate-400">Role:</strong> {userRole}</p>
                  <p><strong className="text-slate-400">Target Career:</strong> {userCareer}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={(career) => {
          setUserCareer(career);
          setIsOnboardingOpen(false);
        }}
      />
    </div>
  );
};
