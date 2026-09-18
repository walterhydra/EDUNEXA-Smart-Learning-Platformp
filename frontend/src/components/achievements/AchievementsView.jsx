import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Award, 
  Flame, 
  Code2, 
  TrendingUp, 
  Bot, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Download, 
  Share2, 
  Zap, 
  Trophy,
  Medal
} from 'lucide-react';

export const AchievementsView = () => {
  const { user, achievements, showToast } = useApp();
  const [showCertificate, setShowCertificate] = useState(false);

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", role: "AI Engineer", xp: 5420, streak: 24, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { rank: 2, name: "Rohan Varma", role: "Full Stack Dev", xp: 4890, streak: 19, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { rank: 3, name: "Devansh Mehta", role: "DevOps Specialist", xp: 4310, streak: 15, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { rank: 4, name: user.name || "Aarav Sharma", role: user.careerGoal || "Full Stack Dev", xp: user.xpPoints || 3420, streak: user.streakDays || 7, isUser: true, avatar: user.avatar },
    { rank: 5, name: "Ananya Iyer", role: "Data Scientist", xp: 3210, streak: 12, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-2 border border-amber-100">
            <Trophy className="w-3.5 h-3.5" /> Gamified Rewards & Accolades
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Achievements & Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            Earn skill badges, claim academic credentials, and climb the university student rankings.
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 shrink-0"
        >
          <Award className="w-4 h-4" /> View AI Certified Transcript
        </button>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Medal className="w-4 h-4 text-amber-500" /> Unlockable Milestone Badges
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div 
              key={ach.id}
              onClick={() => ach.unlocked && showToast(`🏆 Badge: ${ach.title} (+${ach.xpReward} XP)`, 'success')}
              className={`p-5 rounded-3xl border transition-all ${
                ach.unlocked 
                  ? 'bg-white border-slate-200 shadow-soft hover:border-indigo-300 cursor-pointer' 
                  : 'bg-slate-50/60 border-slate-200/60 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl border ${ach.badgeColor}`}>
                  {ach.unlocked ? <Award className="w-6 h-6 text-indigo-600" /> : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  +{ach.xpReward} XP
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-3">{ach.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{ach.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                {ach.unlocked ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked ({ach.unlockedDate})
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium">Progress: {ach.progress}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Student Leaderboard */}
      <div className="white-card p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Weekly Global University Leaderboard
            </h2>
            <p className="text-xs text-slate-500">Rankings reset every Sunday at midnight</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            Your Rank: #4
          </span>
        </div>

        <div className="space-y-2">
          {leaderboard.map((student) => (
            <div
              key={student.rank}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                student.isUser
                  ? 'bg-indigo-50/80 border-indigo-400 shadow-sm'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  student.rank === 1 ? 'bg-amber-100 text-amber-800' :
                  student.rank === 2 ? 'bg-slate-200 text-slate-700' :
                  student.rank === 3 ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  #{student.rank}
                </span>

                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-8 h-8 rounded-xl object-cover border border-slate-200"
                />

                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {student.name} {student.isUser && <span className="text-[10px] text-indigo-600 font-extrabold">(You)</span>}
                  </p>
                  <p className="text-[10px] text-slate-400">{student.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-amber-600 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 fill-amber-500" /> {student.streak}d
                </span>
                <span className="text-indigo-600 min-w-[70px] text-right">
                  {student.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                EduNexa Verified Credential
              </span>
              <button 
                onClick={() => setShowCertificate(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Certificate Canvas Mock */}
            <div className="p-8 rounded-3xl border-4 border-double border-indigo-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>

              <p className="text-xs uppercase tracking-widest text-indigo-600 font-bold">Certificate of Competency</p>
              <h3 className="text-2xl font-black text-slate-900">{user.name || 'Aarav Sharma'}</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Has successfully demonstrated technical proficiency in <strong>Modern ES6+ JavaScript, React Architecture, and Full Stack System Design</strong> as evaluated by the EduNexa AI Assessment Suite.
              </p>

              <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-200">
                <span>Credential ID: EN-2025-8849</span>
                <span>Issued: September 2025</span>
                <span>Verified by EduNexa AI</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => showToast('📥 Certificate downloaded as PDF!', 'success')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
