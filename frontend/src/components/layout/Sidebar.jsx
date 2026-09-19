import React from 'react';
import { useApp } from '../../context/AppContext';
import logoImg from '../../assets/logo.jpeg';
import { 
  Home, 
  Compass, 
  Target, 
  BrainCircuit, 
  BarChart3, 
  BookOpen, 
  Bot, 
  Video,
  Code2, 
  Rocket, 
  TrendingUp, 
  Award, 
  Calendar, 
  Search, 
  User,
  Sparkles,
  ChevronRight,
  LogOut,
  Tv
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, badge: null, category: 'Core' },
  { id: 'learning-path', label: 'My Learning Path', icon: Compass, badge: 'AI Gen', category: 'Core' },
  { id: 'career-navigator', label: 'Career Navigator', icon: Target, badge: null, category: 'Core' },
  { id: 'skill-assessment', label: 'Skill Assessment', icon: BrainCircuit, badge: '3 Active', category: 'Skill & Learn' },
  { id: 'skill-gap', label: 'Skill Gap', icon: BarChart3, badge: 'Live', category: 'Skill & Learn' },
  { id: 'learn', label: 'Learn', icon: BookOpen, badge: null, category: 'Skill & Learn' },
  { id: 'ai-mentor', label: 'AI Mentor', icon: Bot, badge: 'NexaAI', category: 'Hands-On' },
  { id: 'live-mentor', label: 'Live Mentor Room', icon: Video, badge: '🟢 1-on-1', category: 'Hands-On' },
  { id: 'practice-lab', label: 'Practice Lab', icon: Code2, badge: 'Interactive', category: 'Hands-On' },
  { id: 'animation-study', label: 'Animation Study', icon: Tv, badge: 'Visual 3D', category: 'Hands-On' },
  { id: 'projects', label: 'Projects', icon: Rocket, badge: '3 New', category: 'Hands-On' },
  { id: 'progress', label: 'My Progress', icon: TrendingUp, badge: null, category: 'Performance' },
  { id: 'achievements', label: 'Achievements', icon: Award, badge: '3 Unlocked', category: 'Performance' },
  { id: 'study-planner', label: 'Study Planner', icon: Calendar, badge: 'Today', category: 'Performance' },
  { id: 'my-profile', label: 'My Profile', icon: User, badge: null, category: 'General' },
];

export const Sidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, user, logout } = useApp();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src={logoImg} 
              alt="EduNexa Logo" 
              className="h-10 w-10 object-contain mix-blend-multiply"
            />
            <div className="flex flex-col">
              <span className="text-lg font-black text-slate-900 tracking-tight font-satoshi flex items-center">
                Edu<span className="text-indigo-600">Nexa</span>
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-satoshi">Smart Learning</span>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100 font-satoshi">
            v2.4
          </span>
        </div>

        {/* Target Goal Summary Pill */}
        <div className="mx-3 mt-3 p-2.5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/50 border border-slate-200/80">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 font-medium">Target Role:</span>
            <span className="font-bold text-indigo-700 truncate max-w-[120px]">
              {user?.careerGoal || 'Full Stack Dev'}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Readiness:</span>
            <span className="font-bold text-emerald-600">64% Match</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full" style={{ width: '64%' }}></div>
          </div>
        </div>

        {/* Nav Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold tracking-tight ${
                    isActive 
                      ? 'bg-indigo-700/80 text-white' 
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Footer Profile & Actions */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white border border-slate-200/80">
            <div className="flex items-center gap-2.5 min-w-0">
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
                alt={user?.name || "Student"} 
                className="w-8 h-8 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{user?.name || 'Student'}</p>
                <p className="text-[10px] text-slate-400 truncate">Lvl {user?.level || 4} • {user?.xpPoints || 3420} XP</p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
