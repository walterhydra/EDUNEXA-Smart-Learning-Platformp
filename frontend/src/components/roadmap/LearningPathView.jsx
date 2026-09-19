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
  RefreshCw,
  Video,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Star,
  X,
  UserCheck,
  PlayCircle
} from 'lucide-react';
import demoVideo from '../../assets/b8bd4e4273cceae2889d9d259b04f732.mp4';

export const LearningPathView = () => {
  const { user, roadmap, setActiveTab, showToast, addXP } = useApp();
  const [selectedModule, setSelectedModule] = useState(null);
  const [filter, setFilter] = useState('all');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [teachingRating, setTeachingRating] = useState(null);
  const [ratingSaved, setRatingSaved] = useState(false);

  const handleStartModule = (mod) => {
    addXP(15, `Started ${mod.title}`);
    setActiveTab('learn');
  };

  const handleRecalibrate = () => {
    showToast('✨ AI recalibrated your learning path with current skill velocity!', 'success');
  };

  const handleRateTeacher = (ratingLabel) => {
    setTeachingRating(ratingLabel);
    setRatingSaved(true);
    addXP(25, 'Evaluated Demo Class 1 Faculty');
    if (showToast) {
      showToast(`⭐ Thank you! Rated faculty teaching as "${ratingLabel}". Saved +25 XP!`, 'success');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/90 shadow-soft">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5" /> AI Personalized Roadmap
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            My Learning Path: {user?.careerGoal || 'Full Stack Developer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            4 Structured Phases • 14 Custom Micro-modules • Adjusted for {user?.learningAvailability || '1 hr/day'}
          </p>
        </div>

        <button
          onClick={handleRecalibrate}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all shrink-0 active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Re-calibrate with AI
        </button>
      </div>

      {/* DEMO CLASS - 1 SPECIAL FACULTY PREVIEW FOLDER / CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-7 shadow-xl border border-purple-800/60">
        <div className="absolute right-0 top-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-lg border border-white/20 animate-pulse">
              <PlayCircle className="w-7 h-7 stroke-[2.2]" />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-pink-500 text-white rounded-full font-satoshi shadow-xs">
                  FEATURED DEMO LESSON
                </span>
                <span className="text-xs text-purple-200 font-semibold flex items-center gap-1 font-quicksand">
                  <Clock className="w-3.5 h-3.5 text-pink-300" /> 15 Mins Faculty Preview
                </span>
              </div>
              
              <h2 className="text-lg sm:text-xl font-black font-satoshi tracking-tight text-white flex items-center gap-2">
                📂 Demo Class - 1: Faculty Teaching Style Preview
              </h2>

              <p className="text-xs sm:text-sm text-indigo-100 font-quicksand font-medium max-w-2xl leading-relaxed">
                Watch how the lead faculty explains core concepts before starting the full course. Evaluate whether you like the teacher's explanation style!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-purple-200 font-satoshi font-semibold">
                <span className="flex items-center gap-1 text-white">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" /> Instructor: <strong>Dr. Sarah Lin (Ex-Google Lead Tech Educator)</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9/5.0 (2,450+ Student Ratings)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setShowDemoModal(true)}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer font-satoshi border border-white/20"
            >
              <Play className="w-4 h-4 fill-white" /> Watch Demo Class - 1
            </button>
          </div>
        </div>
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
        {(roadmap || []).map((phase, pIdx) => {
          const isPhaseCompleted = phase.progressPercent === 100;
          const isPhaseActive = phase.progressPercent > 0 && phase.progressPercent < 100;

          return (
            <div key={phase.phaseId || pIdx} className="relative pl-14 lg:pl-20">
              
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
                  {pIdx === 0 && (filter === 'all' || filter === 'in-progress') && (
                    <div
                      onClick={() => setShowDemoModal(true)}
                      className="p-4 rounded-2xl border border-pink-300 bg-gradient-to-r from-pink-50/70 via-purple-50/70 to-indigo-50/70 hover:border-pink-500 shadow-xs transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-pink-500 text-white uppercase tracking-wider">
                          Demo Class - 1
                        </span>
                        <span className="text-xs text-pink-700 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> 15 mins
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-slate-900 mt-2 group-hover:text-pink-600 transition-colors flex items-center gap-1.5 font-satoshi">
                        <Play className="w-4 h-4 fill-pink-500 text-pink-500" />
                        Demo Class - 1: Faculty Sample Lesson & Teaching Preview
                      </h3>

                      <p className="text-xs text-slate-600 mt-1 line-clamp-1 font-quicksand font-medium">
                        Faculty: Dr. Sarah Lin (Ex-Google Lead). Watch to see how the teacher explains concepts!
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-pink-200/60 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-pink-700 font-satoshi">
                          ⭐ Rate Teaching Method (+25 XP)
                        </span>
                        <button className="px-3 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer font-satoshi">
                          Watch Demo <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {(phase.modules || [])
                    .filter(m => filter === 'all' || m?.status === filter)
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
                            {(mod.skillsGained || []).slice(0, 3).map((sk, sIdx) => (
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
                className="text-slate-400 hover:text-slate-700 text-lg font-bold cursor-pointer"
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
                {(selectedModule.skillsGained || []).map((sk, i) => (
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

      {/* DEMO CLASS - 1 VIDEO PREVIEW & TEACHING EVALUATOR MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl border border-indigo-500/30 shadow-2xl max-w-3xl w-full p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs font-bold border border-pink-500/30 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" /> Demo Class - 1 Video Lesson
                </span>
                <span className="text-xs text-slate-400 font-mono">15:00 Mins</span>
              </div>
              
              <button
                onClick={() => setShowDemoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="space-y-2">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                <video
                  src={demoVideo}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-quicksand">
                <span>📹 Course: {user.careerGoal || 'Full Stack Web Development'}</span>
                <span>Instructor: Dr. Sarah Lin (Ex-Google Staff Engineer)</span>
              </div>
            </div>

            {/* Teaching Methodology Evaluation Box */}
            <div className="bg-gradient-to-br from-indigo-950/90 via-purple-950/60 to-slate-950 p-5 rounded-2xl border border-indigo-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white font-satoshi flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" /> Rate Faculty Teaching Style
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full">
                  +25 XP Reward
                </span>
              </div>

              <p className="text-xs text-indigo-200 font-quicksand">
                How do you like the explanation & teaching pace in Demo Class - 1?
              </p>

              {ratingSaved ? (
                <div className="p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-xs font-bold text-emerald-300 flex items-center gap-2 font-satoshi">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Your evaluation "{teachingRating}" has been saved! NexaAI tuned your learning recommendations (+25 XP).</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { label: '😍 Loved It! (100% Match)', val: 'Loved It' },
                    { label: '👍 Clear & Good Pace', val: 'Clear & Good Pace' },
                    { label: '👌 Satisfactory', val: 'Satisfactory' },
                    { label: '👎 Needs Slower Pace', val: 'Needs Slower Pace' },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => handleRateTeacher(opt.val)}
                      className="p-2.5 bg-white/10 hover:bg-indigo-600/80 text-white rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-indigo-400 cursor-pointer text-center font-satoshi active:scale-95"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  handleStartModule({ title: 'Full Course Modules', duration: 'Full Track' });
                }}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer flex items-center gap-1.5"
              >
                Continue Full Course <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
