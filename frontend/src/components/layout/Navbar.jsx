import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Search, 
  Flame, 
  Zap, 
  Bell, 
  Bot, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  BookOpen
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, searchQuery, setSearchQuery, setActiveTab, showToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'AI Recommendation Ready', time: '10m ago', unread: true, desc: 'New micro-module: "Async Await & Microtasks" added to Phase 1.' },
    { id: 2, title: 'Streak milestone reached!', time: '1h ago', unread: true, desc: 'You maintained a 7-day learning streak. +300 XP awarded!' },
    { id: 3, title: 'Practice Lab Graded', time: 'Yesterday', unread: false, desc: 'Your "Array Debounce" algorithm passed 4/4 test cases.' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl lg:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Box */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, roadmaps, lab challenges, AI mentor..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 transition-all outline-none"
            />
          </div>
        </div>

        {/* Right Side: Quick Action Pills & Notifications & User */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Ask AI Mentor shortcut */}
          <button
            onClick={() => setActiveTab('ai-mentor')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200/80 text-indigo-700 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            Ask NexaAI
          </button>

          {/* Streak Counter */}
          <div 
            title="7-Day Active Learning Streak"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-50/80 border border-amber-200/80 text-amber-700 rounded-xl text-xs font-bold shadow-sm cursor-default"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{user.streakDays || 7} <span className="hidden sm:inline">Days</span></span>
          </div>

          {/* XP & Level Badge */}
          <div 
            title="Total XP & Level"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-indigo-50/80 border border-indigo-200/80 text-indigo-700 rounded-xl text-xs font-bold shadow-sm cursor-default"
          >
            <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>{user.xpPoints || 3420} XP</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-soft-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">Notifications & AI Alerts</span>
                  <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-700 font-bold rounded-full">2 New</span>
                </div>

                <div className="mt-2 space-y-2.5 max-h-64 overflow-y-auto">
                  {mockNotifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${
                        n.unread ? 'bg-indigo-50/40 border-indigo-100' : 'bg-slate-50/60 border-slate-100'
                      }`}
                      onClick={() => {
                        setShowNotifications(false);
                        showToast(`Notification: ${n.title}`, 'info');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-slate-800">{n.title}</p>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Trigger */}
          <button
            onClick={() => setActiveTab('my-profile')}
            className="flex items-center gap-2 pl-1.5 pr-2 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all"
          >
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
              alt={user.name} 
              className="w-7 h-7 rounded-lg object-cover border border-indigo-200"
            />
            <span className="hidden md:inline text-xs font-bold text-slate-800">{user.name?.split(' ')[0] || 'Profile'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
