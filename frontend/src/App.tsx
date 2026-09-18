import React from 'react';

export function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white p-4">
      <div className="max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-8 shadow-xl text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent mb-4">
          SkillSense AI
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          AI-Powered Personalized Education & Skill Development Platform
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Phase 1: Environment Initialized
        </div>
      </div>
    </div>
  );
}

export default App;
