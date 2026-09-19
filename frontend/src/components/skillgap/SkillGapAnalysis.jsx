import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap, 
  BookOpen, 
  Code2
} from 'lucide-react';

export const SkillGapAnalysis = () => {
  const { user, SKILL_GAP_ANALYSIS, setActiveTab } = useApp();

  const radarData = (SKILL_GAP_ANALYSIS && Array.isArray(SKILL_GAP_ANALYSIS.radarData))
    ? SKILL_GAP_ANALYSIS.radarData
    : [
        { subject: 'React Architecture & State', student: 65, target: 85 },
        { subject: 'Node.js Microservices', student: 58, target: 80 },
        { subject: 'Database Indexing & SQL', student: 70, target: 90 },
        { subject: 'System Design & Scalability', student: 45, target: 75 },
        { subject: 'REST API & GraphQL', student: 82, target: 85 }
      ];

  const criticalGaps = (SKILL_GAP_ANALYSIS && Array.isArray(SKILL_GAP_ANALYSIS.criticalGaps))
    ? SKILL_GAP_ANALYSIS.criticalGaps
    : [
        { skill: 'Advanced System Architecture', priority: 'High', gap: 30, impact: 'Blocks Senior Level Technical Assessment', recommendedModule: 'Microservices & Distributed Caching' },
        { skill: 'PostgreSQL Query Optimization', priority: 'High', gap: 20, impact: 'Reduces database response throughput', recommendedModule: 'B-Tree Indexing & Query Execution' },
        { skill: 'Docker Containerization', priority: 'Medium', gap: 15, impact: 'Impairs automated deployment workflows', recommendedModule: 'Container Orchestration Lab' }
      ];

  const overallReadiness = typeof user?.targetRoleDetail?.readinessScore === 'number'
    ? user.targetRoleDetail.readinessScore
    : (typeof SKILL_GAP_ANALYSIS?.readinessScore === 'number' ? SKILL_GAP_ANALYSIS.readinessScore : 0);

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header with Ambient Lights */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/40 to-slate-50 p-6 sm:p-8 rounded-3xl border border-indigo-100/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6 font-satoshi">
        {/* Ambient Lights */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold mb-2 border border-red-100 shadow-2xs font-satoshi">
            <BarChart3 className="w-3.5 h-3.5" /> AI Diagnostic Skill Gap Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
            Skill Gap Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl font-quicksand font-medium">
            Targeting: <strong className="text-indigo-600 font-bold font-satoshi">{user?.careerGoal || 'Full Stack Web Development'}</strong>. 
            EduNexa compares your live quiz & lab scores against actual hiring thresholds.
          </p>
        </div>

        {/* Global Readiness Pill */}
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center gap-4 shrink-0 font-satoshi">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-indigo-600/20 font-satoshi">
            {overallReadiness}%
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800 font-satoshi">Overall Role Readiness</p>
            <p className="text-[11px] text-slate-500 font-quicksand">{criticalGaps.length} critical gaps remaining</p>
          </div>
        </div>
      </div>

      {/* Comparative Competency Radar / Bar Table */}
      <div className="white-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/90 shadow-2xs font-satoshi">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 font-satoshi">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600" /> Competency Breakdown (Current vs Industry Standard)
          </h2>
          <span className="text-xs text-slate-400 font-medium font-quicksand">Updated live via assessments</span>
        </div>

        <div className="space-y-4">
          {radarData.map((item, idx) => {
            const gap = item.target - item.student;
            const isDeficit = gap > 0;

            return (
              <div key={idx} className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between font-satoshi">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-bold text-slate-900">{item.subject}</span>
                    {isDeficit ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100">
                        -{gap}% Gap
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100">
                        ✓ Mastered
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="text-slate-500">You: <strong className="text-slate-800">{item.student}%</strong></span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-500">Target: <strong className="text-indigo-600">{item.target}%</strong></span>
                  </div>
                </div>

                {/* Overlapping double bar */}
                <div className="relative w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 bottom-0 bg-indigo-200/80 rounded-full"
                    style={{ width: `${item.target}%` }}
                  ></div>
                  <div 
                    className={`relative top-0 bottom-0 h-full rounded-full transition-all duration-500 ${
                      item.student >= item.target ? 'bg-emerald-500' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${item.student}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Critical Gaps & 1-Click Bridge Actions */}
      <div className="space-y-4 font-satoshi">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" /> High-Priority Actionable Remediation Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {criticalGaps.map((gap, i) => (
            <div key={i} className="white-card p-5 rounded-3xl flex flex-col justify-between space-y-4 border border-slate-200/90 shadow-2xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                    Priority: {gap.priority}
                  </span>
                  <span className="text-xs font-bold text-slate-400">-{gap.gap}% Shortfall</span>
                </div>

                <h3 className="text-sm font-bold text-slate-900">{gap.skill}</h3>
                <p className="text-xs text-slate-500 font-quicksand font-medium">{gap.impact}</p>
              </div>

              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 text-xs font-quicksand">
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wide font-satoshi">Recommended AI Bridge:</span>
                <p className="font-semibold text-indigo-900 mt-0.5 truncate">{gap.recommendedModule}</p>
              </div>

              <button
                onClick={() => setActiveTab('practice-lab')}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
              >
                Bridge This Gap <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
