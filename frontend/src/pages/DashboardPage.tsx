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
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useRealtimeSubscription } from '../hooks/useRealtimeSubscription';

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-white font-serif uppercase">
              EDUNEXA
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-indigo-400">
              Smart Education Platform
            </span>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Supabase Realtime Active
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-md">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-white leading-none">{userName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {userRole === 'ADMIN' ? (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded border border-purple-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30 flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Student
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-xl transition-all"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto space-y-8">
        {/* Hero Welcome Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 p-8 shadow-2xl">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-medium text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              AI-Powered Personalized Learning
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Welcome back, <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">{userName}</span>!
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {userRole === 'ADMIN'
                ? 'Manage institution curriculums, analyze overall student skill gaps, and track platform AI performance.'
                : 'Your personalized learning path for Full Stack Developer has updated based on your latest assessment evidence.'}
            </p>
          </div>

          <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-3 opacity-20">
            <BrainCircuit className="w-48 h-48 text-indigo-400" />
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Columns: Skill Breakdown & Roadmap */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skill Matrix */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-lg font-bold text-white">Current Skill Evidence</h2>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  Target: Full Stack Engineer
                </span>
              </div>

              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-200">{skill.name}</span>
                      <span className="text-indigo-400 font-bold">{skill.level}% Mastery</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${skill.color} transition-all duration-1000 rounded-full`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Personalized Adaptive Roadmap */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-6">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">Adaptive Learning Roadmap</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Module 1: Advanced TypeScript Patterns</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Completed • Evidence Score: 85%</p>
                  </div>
                </div>

                <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">Module 2: Real-time DB Sync & Supabase</h3>
                      <span className="text-[10px] uppercase font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">In Progress</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Master WebSockets, CDC, and Postgres Realtime Engine.</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/20 border border-slate-800 rounded-xl flex items-start gap-4 opacity-60">
                  <div className="p-2 bg-slate-800 text-slate-400 rounded-lg shrink-0 mt-0.5">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">Module 3: AI Vector Databases & RAG</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Locked • Unlocks after Module 2 assessment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1 Column: Real-time Notifications & AI Mentor */}
          <div className="space-y-8">
            {/* Live Notifications Feed */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-lg font-bold text-white">Live Updates</h2>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  Supabase Live
                </span>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 bg-slate-800/60 border border-slate-700/60 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between font-semibold text-slate-200">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.created_at}</span>
                    </div>
                    <p className="text-slate-400">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Mentor Recommendation Card */}
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-2xl p-6 space-y-4 shadow-lg">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white">AI Mentor Insight</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Hi {userName}! Based on your latest quiz, your understanding of database synchronization is strong. I recommend reviewing Supabase RLS policies next."
              </p>
              <button className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Ask AI Mentor
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
