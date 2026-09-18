import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Rocket, 
  Github, 
  Star, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  Code2
} from 'lucide-react';

export const ProjectsHub = () => {
  const { PROJECTS_DATA, showToast, addXP } = useApp();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEnrollProject = (p) => {
    addXP(50, `Enrolled in Project: ${p.title}`);
    showToast(`🚀 Starter workspace for "${p.title}" initialized!`, 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-soft">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-2 border border-purple-100">
          <Rocket className="w-3.5 h-3.5" /> Portfolio-Ready Industry Projects
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Project Hub & Capstone Labs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Build end-to-end full stack and AI applications with pre-configured boilerplates, milestone rubrics, and automated AI code review simulations.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PROJECTS_DATA.map((proj) => (
          <div 
            key={proj.id} 
            className="white-card-interactive p-6 rounded-3xl flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                  {proj.difficulty}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {proj.stars}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {proj.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{proj.description}</p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {proj.estimatedHours}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {proj.enrolledCount} Students</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleEnrollProject(proj)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm transition-all active:scale-95"
                >
                  Enroll <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg">
                {selectedProject.category}
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900">{selectedProject.title}</h2>
              <p className="text-xs text-slate-500 mt-1">{selectedProject.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Milestone Deliverables:</h4>
              <div className="space-y-2">
                {selectedProject.deliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <a
                href={selectedProject.starterGithub}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <Github className="w-4 h-4" /> Clone Template Repo
              </a>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleEnrollProject(selectedProject);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
              >
                Start Milestone Sprint <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
