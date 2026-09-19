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
  Code2,
  X
} from 'lucide-react';

export const ProjectsHub = () => {
  const { PROJECTS_DATA, showToast, addXP } = useApp();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Fallback Resilient Projects Dataset
  const projectsList = Array.isArray(PROJECTS_DATA) && PROJECTS_DATA.length > 0 
    ? PROJECTS_DATA 
    : [
        {
          id: 'proj-1',
          title: 'Full Stack AI Learning Platform',
          category: 'Full Stack Web Dev',
          difficulty: 'Advanced',
          stars: 4.9,
          description: 'Build a production multi-tenant educational web app with React, Node.js, Express, PostgreSQL & AI auto-grader.',
          tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'AI'],
          estimatedHours: '25 Hours',
          enrolledCount: 1420,
          deliverables: [
            'Database Schema & PostgreSQL Migration Scripts',
            'RESTful API Endpoints for User Auth & Course Enrollment',
            'React Dashboard UI with Tailwind CSS & Real-time State',
            'Automated AI Code Review & Feedback Integration'
          ],
          starterGithub: 'https://github.com/edunexa/fullstack-learning-platform'
        },
        {
          id: 'proj-2',
          title: 'Real-Time Code Execution & Diagnostic Sandbox',
          category: 'Systems & Web',
          difficulty: 'Intermediate',
          stars: 4.8,
          description: 'Create an interactive WebIDE with live code execution, syntax highlighting, and unit test runner.',
          tags: ['TypeScript', 'Docker', 'WebSockets', 'Tailwind'],
          estimatedHours: '18 Hours',
          enrolledCount: 980,
          deliverables: [
            'Dockerized Code Execution Container Sandbox',
            'WebSocket Bidirectional Log Streaming Server',
            'Monaco Code Editor Interface with Theme Switcher'
          ],
          starterGithub: 'https://github.com/edunexa/code-execution-sandbox'
        },
        {
          id: 'proj-3',
          title: 'RAG Vector Search & AI Chatbot Engine',
          category: 'AI & Data Science',
          difficulty: 'Advanced',
          stars: 4.95,
          description: 'Implement document embedding pipelines using PyTorch, Vector DB (Pinecone/Qdrant), and LangChain LLMs.',
          tags: ['Python', 'PyTorch', 'LangChain', 'Vector DB'],
          estimatedHours: '30 Hours',
          enrolledCount: 1650,
          deliverables: [
            'PDF Document Chunking & Embedding Generator',
            'Vector Similarity Search Pipeline with Qdrant/Pinecone',
            'LangChain Conversational RAG Memory Interface'
          ],
          starterGithub: 'https://github.com/edunexa/rag-vector-ai-engine'
        }
      ];

  const filteredProjects = activeFilter === 'All' 
    ? projectsList 
    : projectsList.filter(p => p.difficulty === activeFilter || p.category === activeFilter);

  const handleEnrollProject = (p) => {
    addXP(50, `Enrolled in Project: ${p.title}`);
    if (showToast) {
      showToast(`🚀 Starter workspace for "${p.title}" initialized (+50 XP)!`, 'success');
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-2xs font-satoshi">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold mb-2 border border-purple-100">
          <Rocket className="w-3.5 h-3.5" /> Portfolio-Ready Industry Projects
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-satoshi">
          Project Hub & Capstone Labs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl font-quicksand font-medium">
          Build end-to-end full stack, cloud, and AI applications with pre-configured boilerplates, milestone rubrics, and automated AI code review simulations.
        </p>

        {/* Filters */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto text-xs font-satoshi font-bold scrollbar-none">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
              }`}
            >
              {cat} Projects
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-satoshi">
        {filteredProjects.map((proj) => {
          const projectTags = Array.isArray(proj.tags) ? proj.tags : (Array.isArray(proj.skills) ? proj.skills : ['Web Dev', 'API']);
          
          return (
            <div 
              key={proj.id} 
              className="white-card p-6 rounded-3xl flex flex-col justify-between group space-y-4 border border-slate-200/90 shadow-2xs hover:border-indigo-300 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100">
                    {proj.difficulty || 'Intermediate'}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 font-satoshi">
                    <Star className="w-3.5 h-3.5 fill-amber-400" /> {proj.stars || 4.9}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-satoshi leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-quicksand font-medium">
                  {proj.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {projectTags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-satoshi">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 font-satoshi">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500" /> {proj.estimatedHours || '20 Hours'}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-purple-500" /> {proj.enrolledCount || 1200} Students</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleEnrollProject(proj)}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
                  >
                    Enroll <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-extrabold px-2.5 py-1 bg-purple-50 text-purple-700 rounded-lg border border-purple-100 font-satoshi">
                {selectedProject.category || 'Full Stack Capstone'}
              </span>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 font-satoshi">{selectedProject.title}</h2>
              <p className="text-xs text-slate-500 mt-1 font-quicksand font-medium">{selectedProject.description}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-satoshi">Required Milestone Deliverables:</h4>
              <div className="space-y-2 font-quicksand">
                {(Array.isArray(selectedProject.deliverables) ? selectedProject.deliverables : [
                  'Database Schema & SQL Migration Scripts',
                  'RESTful API Endpoints with JWT Authentication',
                  'Interactive React Frontend with State Management'
                ]).map((deliv, dIdx) => (
                  <div key={dIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs font-medium text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 font-satoshi">
              <a
                href={selectedProject.starterGithub || 'https://github.com/edunexa'}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-4 h-4" /> Clone Template Repo
              </a>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  handleEnrollProject(selectedProject);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
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
