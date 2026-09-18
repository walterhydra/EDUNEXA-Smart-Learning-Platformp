import React from 'react';
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
  Compass
} from 'lucide-react';

export const DashboardOverview = () => {
  const { user, setActiveTab, SKILL_GAP_ANALYSIS, addXP } = useApp();

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Hero Welcome & Motivational AI Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg p-6 sm:p-8">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-50 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-50 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
              AI Intelligent Study Engine Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Good day, {user.name?.split(' ')[0] || 'Aarav'}! 🚀
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              You are currently on track for <strong className="text-indigo-600 font-bold">{user.careerGoal || 'Full Stack Developer'}</strong>. 
              Today’s recommended focus: Master Async/Await microtasks to shrink your JavaScript gap by 12%.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-indigo-500" /> Target: {user.learningAvailability || '1 hr/day'}
              </span>
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {user.streakDays || 7} Day Streak
              </span>
              <span className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Zap className="w-3.5 h-3.5 text-indigo-500 fill-indigo-500" /> Level {user.level || 4} Explorer
              </span>
            </div>
          </div>

          {/* Target Readiness Circular Dial Card */}
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
                  strokeDasharray="64, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-black text-slate-900">64%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Ready</span>
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-slate-800">{user.careerGoal || 'Full Stack Dev'}</p>
            <button
              onClick={() => setActiveTab('skill-gap')}
              className="mt-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View Gap Analysis <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

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
              {SKILL_GAP_ANALYSIS.criticalGaps.slice(0, 3).map((gap, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800">{gap.skill}</span>
                    <span className="text-red-600 font-extrabold">-{gap.gap}% Gap</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-red-500 h-full rounded-full"
                      style={{ width: `${gap.current}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Current: {gap.current}%</span>
                    <span>Industry Target: {gap.required}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('skill-gap')}
              className="mt-4 w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-colors flex items-center justify-center gap-1.5"
            >
              Bridge These Gaps with AI <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* NexaAI Mentor Mini Interactive Widget */}
          <div className="white-card p-6 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-indigo-500/30 border border-indigo-400/30 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">NexaAI Instant Mentor</h4>
                <p className="text-[11px] text-indigo-200">Got a question or stuck on code?</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white/10 rounded-xl text-xs text-indigo-100 font-mono border border-white/10">
              "Hi Aarav! Ask me to explain Closures, debug React useEffect dependencies, or run a mock interview."
            </div>

            <button
              onClick={() => setActiveTab('ai-mentor')}
              className="mt-4 w-full py-2.5 bg-white text-slate-900 hover:bg-indigo-50 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              Chat with NexaAI <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
