import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Menu, 
  Flame, 
  Zap, 
  Bell, 
  CheckCircle2, 
  Sparkles,
  Trash2,
  CheckCheck
} from 'lucide-react';

export const Navbar = ({ onToggleSidebar }) => {
  const { user, setActiveTab, showToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);

  const [notificationsList, setNotificationsList] = useState([
    { id: 1, title: '🎉 XP Milestone Awarded', time: '5m ago', unread: true, desc: '+50 XP earned for interacting with EduNexa Learning Engine.', tab: 'achievements' },
    { id: 2, title: '🤖 JARVIS AI Extended Active', time: '20m ago', unread: true, desc: 'Your personalized AI Roadmap for target track has been initialized.', tab: 'learning-path' },
    { id: 3, title: '⚡ 20,000 EXP Milestone Offer', time: '1h ago', unread: true, desc: 'Earn 20,000 XP to get ₹500 OFF / Month or refer a friend for 10% OFF.', tab: 'dashboard' },
    { id: 4, title: '💻 Practice Lab Test Passed', time: 'Yesterday', unread: false, desc: 'Your JavaScript ES6 Async/Await challenge passed 4/4 test cases.', tab: 'practice-lab' },
  ]);

  const unreadCount = notificationsList.filter(n => n.unread).length;

  const handleMarkAllRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, unread: false })));
    if (showToast) showToast('All notifications marked as read.', 'info');
  };

  const handleClearAll = () => {
    setNotificationsList([]);
    if (showToast) showToast('Notifications cleared.', 'info');
  };

  const handleNotificationClick = (notification) => {
    setNotificationsList(prev => prev.map(n => n.id === notification.id ? { ...n, unread: false } : n));
    setShowNotifications(false);
    if (notification.tab) {
      setActiveTab(notification.tab);
    }
    if (showToast) {
      showToast(`Notification: ${notification.title}`, 'info');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 font-sans">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left Side: Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Right Side: Quick Action Pills & Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Streak Counter */}
          <div 
            title="Active Learning Streak"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-50/80 border border-amber-200/80 text-amber-700 rounded-xl text-xs font-bold font-satoshi shadow-2xs cursor-default"
          >
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{user?.streakDays || 7} <span className="hidden sm:inline">Days</span></span>
          </div>

          {/* XP & Level Badge */}
          <div 
            title="Total XP & Level"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 bg-indigo-50/80 border border-indigo-200/80 text-indigo-700 rounded-xl text-xs font-bold font-satoshi shadow-2xs cursor-default"
          >
            <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
            <span>{user?.xpPoints || 3440} XP</span>
          </div>

          {/* Fully Interactive Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Notifications"
              title="Notifications & Alerts"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold font-mono rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl border border-slate-200/90 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 font-sans">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-satoshi">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">Notifications & Alerts</h4>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-600 font-extrabold rounded-full border border-red-100">
                        {unreadCount} Unread
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-indigo-600 hover:text-indigo-700 font-bold flex items-center gap-1 cursor-pointer"
                        title="Mark all as read"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Read All</span>
                      </button>
                    )}
                    {notificationsList.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="text-slate-400 hover:text-slate-600 font-semibold p-1 cursor-pointer"
                        title="Clear all notifications"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Notifications List */}
                <div className="mt-3 space-y-2 max-h-72 overflow-y-auto scrollbar-none font-quicksand">
                  {notificationsList.length > 0 ? (
                    notificationsList.map((n) => (
                      <div 
                        key={n.id} 
                        onClick={() => handleNotificationClick(n)}
                        className={`p-3 rounded-2xl border text-xs transition-all cursor-pointer space-y-1 ${
                          n.unread 
                            ? 'bg-indigo-50/50 border-indigo-200/90 shadow-2xs' 
                            : 'bg-slate-50/60 border-slate-200/60 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between font-satoshi">
                          <span className="font-bold text-slate-900 flex items-center gap-1.5">
                            {n.unread && <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />}
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">{n.desc}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400 font-medium">
                      No notifications right now!
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Profile Trigger */}
          <button
            onClick={() => setActiveTab('my-profile')}
            className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition-all cursor-pointer"
          >
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} 
              alt={user?.name || "Student"} 
              className="w-7 h-7 rounded-lg object-cover border border-indigo-200"
            />
            <span className="hidden md:inline text-xs font-bold text-slate-800 font-satoshi">{user?.name ? user.name.split(' ')[0] : 'Profile'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
