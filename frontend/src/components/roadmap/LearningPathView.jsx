import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  CheckCircle2, 
  Play, 
  Lock, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Award, 
  BookOpen, 
  Code2, 
  ChevronDown, 
  ChevronUp,
  RefreshCw
} from 'lucide-react';

export const LearningPathView = () => {
  const { user, roadmap, setActiveTab, showToast, addXP } = useApp();
  const [selectedModule, setSelectedModule] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleStartModule = (mod) => {
    addXP(15, `Started ${mod.title}`);
    setActiveTab('learn');
  };

  const handleRecalibrate = () => {
    showToast('✨ AI recalibrated your learning path with current skill velocity!', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" /> AI Personalized Roadmap
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Learning Path: {user.careerGoal || 'Full Stack Developer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            4 Structured Phases • 14 Custom Micro-modules • Adjusted for {user.learningAvailability || '1 hr/day'}
          </p>
        </div>

        <button
          onClick={handleRecalibrate}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0 active:scale-95"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-calibrate with AI
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['all', 'in-progress', 'completed', 'locked'].map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setFilter(tabKey)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
              filter === tabKey
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tabKey.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Roadmap Timeline Nodes */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-200 lg:before:left-8">
        {roadmap.map((phase, pIdx) => {
          const isPhaseCompleted = phase.progressPercent === 100;
          const isPhaseActive = phase.progressPercent > 0 && phase.progressPercent < 100;

          return (
            <div key={phase.phaseId} className="relative pl-14 lg:pl-20">
              
              {/* Phase Node Indicator Circle */}
              <div className={`absolute left-2.5 lg:left-4.5 -translate-x-1/2 top-4 w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs border-2 shadow-sm z-10 ${
                isPhaseCompleted
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : isPhaseActive
                    ? 'bg-indigo-600 border-indigo-600 text-white animate-pulse'
                    : 'bg-white border-slate-300 text-slate-400'
              }`}>
                {isPhaseCompleted ? <CheckCircle2 className="w-5 h-5" /> : pIdx + 1}
              </div>

              {/* Phase Card */}
              <div className="white-card rounded-3xl p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{phase.duration}</span>
                      <span className="text-slate-300">•</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isPhaseCompleted 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isPhaseActive 
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-slate-100 text-slate-500'
                      }`}>
                        {phase.progressPercent}% Complete
                      </span>
                    </div>
                    <h2 className="text-lg font-black text-slate-900 mt-1">{phase.phaseTitle}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                  </div>
                </div>

                {/* Modules Grid inside Phase */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {phase.modules
                    .filter(m => filter === 'all' || m.status === filter)
                    .map((mod) => {
                      const isCompleted = mod.status === 'completed';
                      const isInProgress = mod.status === 'in-progress';
                      const isLocked = mod.status === 'locked';

                      return (
                        <div
                          key={mod.id}
                          onClick={() => !isLocked && setSelectedModule(mod)}
                          className={`p-4 rounded-2xl border transition-all ${
                            isLocked 
                              ? 'bg-slate-50/60 border-slate-200/60 text-slate-400 cursor-not-allowed' 
                              : isCompleted 
                                ? 'bg-emerald-50/20 border-emerald-200/80 hover:border-emerald-400 cursor-pointer'
                                : isInProgress
                                  ? 'bg-indigo-50/30 border-indigo-300 hover:border-indigo-500 shadow-sm cursor-pointer'
                                  : 'bg-white border-slate-200 hover:border-indigo-300 cursor-pointer'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {mod.type}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {mod.duration}
                            </span>
                          </div>

                          <h3 className={`text-sm font-bold mt-2 ${isLocked ? 'text-slate-400' : 'text-slate-900'}`}>
                            {mod.title}
                          </h3>

                          {/* Skills preview tags */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {mod.skillsGained.slice(0, 3).map((sk, sIdx) => (
                              <span key={sIdx} className="text-[10px] px-2 py-0.5 bg-slate-100/80 rounded-md text-slate-600 font-medium">
                                {sk}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-semibold">
                              {isCompleted && <span className="text-emerald-600 flex items-center gap-1 font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Score: {mod.score}</span>}
                              {isInProgress && <span className="text-indigo-600 font-bold">{mod.progress}% Progress</span>}
                              {isLocked && <span className="text-slate-400 flex items-center gap-1"><Lock className="w-3 h-3" /> Locked</span>}
                              {mod.status === 'unlocked' && <span className="text-indigo-600 font-medium">Ready to Start</span>}
                            </span>

                            {!isLocked && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartModule(mod);
                                }}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all"
                              >
                                {isCompleted ? 'Review' : 'Start'} <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Modal / Drawer */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg">
                {selectedModule.type}
              </span>
              <button
                onClick={() => setSelectedModule(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{selectedModule.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Duration: {selectedModule.duration} • AI Personalized module</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Key Competencies You'll Gain:</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedModule.skillsGained.map((sk, i) => (
                  <div key={i} className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> {sk}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedModule(null);
                  handleStartModule(selectedModule);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                Launch in Learn Player <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
