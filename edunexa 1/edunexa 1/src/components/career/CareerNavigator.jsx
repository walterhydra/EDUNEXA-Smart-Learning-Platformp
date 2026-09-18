import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Layers,
  Code,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CareerNavigator = () => {
  const { user, setUser, CAREER_PATHS, showToast, setActiveTab } = useApp();
  const [selectedRole, setSelectedRole] = useState(
    CAREER_PATHS.find(p => p.title === user.careerGoal) || CAREER_PATHS[0]
  );

  const handleSetTargetCareer = (role) => {
    setUser(prev => ({
      ...prev,
      careerGoal: role.title,
      targetRoleDetail: {
        title: role.title,
        marketDemand: role.marketDemand,
        avgSalary: role.avgSalary,
        readinessScore: role.matchScore,
      }
    }));
    showToast(`🎯 Updated target career to ${role.title}! AI Roadmap re-aligned.`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
          <Target className="w-3.5 h-3.5" /> Industry Intelligence & Match Matrix
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          AI Career Navigator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Discover high-growth career tracks, benchmark your live skill profile against tech industry hiring standards, and see real-time salary and market demand indicators.
        </p>
      </div>

      {/* Career Role Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAREER_PATHS.map((role) => {
          const isTarget = user.careerGoal === role.title;
          const isSelected = selectedRole.id === role.id;

          return (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/40 border-indigo-500 shadow-md ring-2 ring-indigo-500/10'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-soft'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {role.category}
                  </span>
                  {isTarget && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1 border border-emerald-200">
                      <Check className="w-3 h-3 stroke-[3]" /> Active Goal
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-3">{role.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{role.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Your Match Score:</span>
                  <span className="text-indigo-600 font-extrabold">{role.matchScore}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full"
                    style={{ width: `${role.matchScore}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>💰 {role.avgSalary}</span>
                  <span>🔥 {role.marketDemand}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Career In-Depth Breakdown */}
      {selectedRole && (
        <div className="white-card p-6 sm:p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                  {selectedRole.badge}
                </span>
                <span className="text-xs font-bold text-slate-400">Open Jobs: {selectedRole.openPositions}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{selectedRole.title}</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{selectedRole.description}</p>
            </div>

            {user.careerGoal !== selectedRole.title ? (
              <button
                onClick={() => handleSetTargetCareer(selectedRole)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all shrink-0 active:scale-95"
              >
                <Target className="w-4 h-4" /> Set as My Target Goal
              </button>
            ) : (
              <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0">
                <CheckCircle2 className="w-4 h-4" /> Current Focus Goal
              </div>
            )}
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold text-slate-500">Average Compensation</span>
              <p className="text-lg font-black text-slate-900 mt-1">{selectedRole.avgSalary}</p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">+14% higher than national avg</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold text-slate-500">Hiring Market Demand</span>
              <p className="text-lg font-black text-slate-900 mt-1">{selectedRole.marketDemand}</p>
              <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">{selectedRole.openPositions} active listings</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-bold text-slate-500">Skill Alignment Readiness</span>
              <p className="text-lg font-black text-indigo-600 mt-1">{selectedRole.matchScore}% Prepared</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Approx 6-8 weeks to full readiness</p>
            </div>
          </div>

          {/* Industry Benchmark vs Your Profile */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Industry Competency Requirements vs Your Level:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {Object.entries(selectedRole.readinessBenchmark || {}).map(([skill, benchmarkScore]) => {
                const studentSkill = (user.currentSkills || []).find(s => s.name?.toLowerCase().includes(skill.toLowerCase()));
                const studentScore = studentSkill ? studentSkill.score : 35;
                const isMeeting = studentScore >= benchmarkScore;

                return (
                  <div key={skill} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800">{skill}</span>
                      <span className={isMeeting ? 'text-emerald-600' : 'text-amber-600'}>
                        {isMeeting ? '✓ Ready' : `Gap: -${benchmarkScore - studentScore}%`}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Your Current: {studentScore}%</span>
                        <span>Job Benchmark: {benchmarkScore}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                        {/* Target mark indicator */}
                        <div 
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${studentScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Steps CTA */}
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
              <p className="text-xs text-slate-700">
                Want to close the skill gap for <strong>{selectedRole.title}</strong>? Start the recommended Practice Lab challenges.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('practice-lab')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shrink-0 shadow-sm"
            >
              Go to Practice Lab →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
