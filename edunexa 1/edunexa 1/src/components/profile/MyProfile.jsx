import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  GraduationCap, 
  Target, 
  Clock, 
  Sparkles, 
  Save, 
  RotateCcw, 
  Award, 
  Flame, 
  Zap, 
  CheckCircle2,
  Mail,
  Building
} from 'lucide-react';

export const MyProfile = ({ onReplayOnboarding }) => {
  const { user, setUser, showToast, resetToNewUserOnboarding } = useApp();
  const [profileForm, setProfileForm] = useState({
    name: user.name || 'Aarav Sharma',
    email: user.email || 'aarav.sharma@edunexa.ai',
    college: user.college || 'National Institute of Technology',
    degree: user.degree || 'B.Tech Computer Science & Engineering',
    year: user.year || '3rd Year (2025)',
    careerGoal: user.careerGoal || 'Full Stack Developer',
    learningAvailability: user.learningAvailability || '1 hour/day',
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      ...profileForm,
    }));
    showToast('💾 Profile details successfully updated!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Profile Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 relative">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold">
            Verified Student Profile
          </div>
        </div>

        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
          <div className="flex items-end gap-4">
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"} 
              alt={user.name} 
              className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-md"
            />
            <div className="space-y-0.5">
              <h1 className="text-xl font-black text-slate-900">{user.name || 'Aarav Sharma'}</h1>
              <p className="text-xs text-slate-500">{user.college} • {user.year}</p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                  🎯 {user.careerGoal || 'Full Stack Dev'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">
                  🔥 {user.streakDays || 7} Days
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onReplayOnboarding}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Re-run 6-Step Onboarding
          </button>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="white-card p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">Academic & Career Settings</h2>
            <p className="text-xs text-slate-500">Update your university info and learning constraints</p>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">College / University</label>
            <input
              type="text"
              value={profileForm.college}
              onChange={(e) => setProfileForm({ ...profileForm, college: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Degree & Branch</label>
            <input
              type="text"
              value={profileForm.degree}
              onChange={(e) => setProfileForm({ ...profileForm, degree: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Target Career Role</label>
            <select
              value={profileForm.careerGoal}
              onChange={(e) => setProfileForm({ ...profileForm, careerGoal: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none"
            >
              <option>Full Stack Developer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Analyst</option>
              <option>Data Scientist</option>
              <option>DevOps Engineer</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Learning Time Availability</label>
            <select
              value={profileForm.learningAvailability}
              onChange={(e) => setProfileForm({ ...profileForm, learningAvailability: e.target.value })}
              className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:bg-white focus:outline-none"
            >
              <option>30 min/day</option>
              <option>1 hour/day</option>
              <option>2 hours/day</option>
              <option>10+ hours/week</option>
            </select>
          </div>
        </div>

        {/* Current Active Skills Summary */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-800 mb-2">Your Configured Skills & Mastery Levels:</label>
          <div className="flex flex-wrap gap-2">
            {user.currentSkills?.map((sk, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-medium text-slate-700 flex items-center gap-1.5 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <strong>{sk.name}</strong> • <span className="text-slate-500">{sk.level} ({sk.score}%)</span>
              </span>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
