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
  Medal,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export const AchievementsView = () => {
  const { user, achievements, showToast, isCourseCompleted } = useApp();
  const [showCertificate, setShowCertificate] = useState(false);

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", role: "AI Engineer", xp: 5420, streak: 24, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { rank: 2, name: "Rohan Varma", role: "Full Stack Dev", xp: 4890, streak: 19, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { rank: 3, name: "Devansh Mehta", role: "DevOps Specialist", xp: 4310, streak: 15, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { rank: 4, name: user.name || "Aarav Sharma", role: user.careerGoal || "Full Stack Dev", xp: user.xpPoints || 3420, streak: user.streakDays || 7, isUser: true, avatar: user.avatar },
    { rank: 5, name: "Ananya Iyer", role: "Data Scientist", xp: 3210, streak: 12, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
  ];

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold mb-2 border border-amber-100">
            <Trophy className="w-3.5 h-3.5" /> Gamified Rewards & Accolades
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
            Achievements & Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-quicksand">
            Earn skill badges, claim verified course completion certificates, and climb the student rankings.
          </p>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 shrink-0 font-satoshi cursor-pointer active:scale-95 transition-all"
        >
          <Award className="w-4 h-4" /> 📜 Open Verified Course Certificate
        </button>
      </div>

      {/* FEATURED COURSE COMPLETION CERTIFICATE CARD */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black text-2xl shadow-xl shrink-0 border border-amber-300">
            <GraduationCap className="w-9 h-9 text-slate-950" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono">
                ✓ 100% COURSE COMPLETED
              </span>
              <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> AI VERIFIED CREDENTIAL
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white font-satoshi tracking-tight">
              {user.careerGoal || 'Full Stack Web Development & System Architecture'}
            </h2>
            <p className="text-xs text-indigo-200/80 font-quicksand font-medium max-w-lg">
              Official EduNexa Master Certificate issued to <strong>{user.name || 'Aarav Sharma'}</strong> upon completing all curriculum modules, lab challenges, and capstone projects.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCertificate(true)}
          className="w-full md:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-xl shadow-amber-400/20 shrink-0 font-satoshi cursor-pointer transform hover:scale-105 transition-all active:scale-95"
        >
          <Award className="w-4.5 h-4.5" /> 📜 Open & View Official Certificate
        </button>
      </div>

      {/* Badges Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-satoshi">
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

              <h3 className="text-sm font-bold text-slate-900 mt-3 font-satoshi">{ach.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed font-quicksand">{ach.description}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                {ach.unlocked ? (
                  <span className="text-emerald-600 font-bold flex items-center gap-1 font-satoshi">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked ({ach.unlockedDate})
                  </span>
                ) : (
                  <span className="text-slate-400 font-medium font-mono">Progress: {ach.progress}</span>
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
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 font-satoshi">
              <Trophy className="w-4 h-4 text-amber-500" /> Weekly Global University Leaderboard
            </h2>
            <p className="text-xs text-slate-500 font-quicksand">Rankings reset every Sunday at midnight</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full font-satoshi">
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
                  <p className="text-xs font-bold text-slate-900 font-satoshi">
                    {student.name} {student.isUser && <span className="text-[10px] text-indigo-600 font-extrabold">(You)</span>}
                  </p>
                  <p className="text-[10px] text-slate-400 font-quicksand">{student.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold font-mono">
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

      {/* CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 font-sans">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 font-mono">
                  ✓ VERIFIED CREDENTIAL
                </span>
                <span className="text-xs font-bold text-slate-500">EduNexa AI Certification Suite</span>
              </div>
              <button 
                onClick={() => setShowCertificate(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {/* High-Fidelity Certificate Canvas Mock */}
            <div className="p-8 sm:p-10 rounded-3xl border-4 border-double border-amber-400/80 bg-gradient-to-br from-amber-50/40 via-white to-indigo-50/40 text-center space-y-4 relative shadow-inner">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-lg border border-amber-300">
                <Award className="w-8 h-8 text-white" />
              </div>

              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-indigo-700 font-mono">EduNexa Smart Learning Platform</p>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide uppercase font-satoshi">Certificate of Completion</h2>
              </div>

              <p className="text-xs text-slate-500 font-quicksand">This official credential certifies that</p>

              <h3 className="text-2xl sm:text-3xl font-black text-indigo-900 border-b-2 border-amber-400 inline-block pb-1 font-satoshi px-4">
                {user.name || 'Aarav Sharma'}
              </h3>

              <p className="text-xs text-slate-600 max-w-lg mx-auto font-quicksand leading-relaxed">
                has successfully completed all requirements, practical assessments, and capstone implementations for the master curriculum in
                <br />
                <strong className="text-slate-900 text-sm font-satoshi">{user.careerGoal || 'Full Stack Web Development & System Architecture'}</strong>.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/80 gap-3 font-mono">
                <div className="text-left">
                  <p className="font-bold text-slate-800">Credential ID: EN-2025-8849</p>
                  <p>Issued: September 2025</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg p-1 text-white flex items-center justify-center font-bold text-[9px] text-center leading-none border border-slate-700">
                    QR VERIFIED
                  </div>
                  <div className="text-right text-[10px]">
                    <p className="font-bold text-emerald-700">Verified by EduNexa AI</p>
                    <p className="text-slate-400">Authentic Digital Seal</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText("https://edunexa.io/verify/EN-2025-8849");
                  showToast('🔗 Verification link copied to clipboard!', 'info');
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer font-satoshi"
              >
                <Share2 className="w-4 h-4" /> Share Credential Link
              </button>

              <button
                onClick={() => showToast('📥 Official Certificate downloaded as PDF!', 'success')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer font-satoshi active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" /> Download PDF Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

