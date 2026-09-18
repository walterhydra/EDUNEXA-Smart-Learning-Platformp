import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, 
  Clock, 
  Award, 
  CheckCircle2, 
  Zap, 
  Flame, 
  Calendar, 
  BarChart2, 
  Target 
} from 'lucide-react';

export const MyProgress = () => {
  const { user } = useApp();

  const weeklyActivity = [
    { day: 'Mon', hours: 1.2, tasks: 3, percentage: 80 },
    { day: 'Tue', hours: 0.8, tasks: 2, percentage: 55 },
    { day: 'Wed', hours: 1.5, tasks: 4, percentage: 100 },
    { day: 'Thu', hours: 1.0, tasks: 2, percentage: 70 },
    { day: 'Fri', hours: 0.7, tasks: 1, percentage: 45 },
    { day: 'Sat', hours: 2.1, tasks: 5, percentage: 100 },
    { day: 'Sun', hours: 1.4, tasks: 3, percentage: 90 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-2 border border-emerald-100">
          <TrendingUp className="w-3.5 h-3.5" /> Performance & Learning Analytics
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Learning Progress
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Real-time analytics on your study consistency, skill mastery progression, and weekly milestone velocity.
        </p>
      </div>

      {/* 4 Quick Stat KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="white-card p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Total Study Hours</span>
            <Clock className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">48.5 hrs</p>
          <span className="text-[11px] font-bold text-emerald-600">+14% vs last week</span>
        </div>

        <div className="white-card p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{user.streakDays || 7} Days</p>
          <span className="text-[11px] font-bold text-amber-600">Top 5% consistency</span>
        </div>

        <div className="white-card p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">XP Points Earned</span>
            <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">{user.xpPoints || 3420}</p>
          <span className="text-[11px] font-bold text-indigo-600">Level {user.level || 4} Explorer</span>
        </div>

        <div className="white-card p-5 rounded-3xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold">Quiz Accuracy</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2">86.4%</p>
          <span className="text-[11px] font-bold text-emerald-600">12 tests taken</span>
        </div>
      </div>

      {/* Weekly Velocity Chart Card */}
      <div className="white-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600" /> Weekly Learning Velocity & Daily Focus
            </h2>
            <p className="text-xs text-slate-500">Weekly Target: 7.0 Hours • Completed: 8.7 Hours (124% of Goal)</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 self-start sm:self-auto">
            🔥 Goal Exceeded
          </span>
        </div>

        {/* Visual Bar Chart */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end pt-8 h-48">
          {weeklyActivity.map((act, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {act.hours}h
              </span>
              <div className="w-full max-w-[40px] bg-slate-100 rounded-2xl overflow-hidden h-36 flex items-end p-1">
                <div 
                  className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-xl transition-all duration-500 group-hover:from-indigo-500 group-hover:to-cyan-400"
                  style={{ height: `${act.percentage}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-700">{act.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Mastery Growth Matrix */}
      <div className="white-card p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600" /> Live Skill Mastery Breakdown
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(user.currentSkills || []).map((sk, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">{sk.name}</span>
                <span className="text-indigo-600">{sk.score}% ({sk.level})</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${sk.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
