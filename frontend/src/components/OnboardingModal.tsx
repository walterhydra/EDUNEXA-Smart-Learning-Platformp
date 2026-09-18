import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, GraduationCap, Laptop, Database, Cpu, LineChart, Server } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (career: string, skillLevel: string) => void;
}

const CAREERS = [
  { id: 'fullstack', title: 'Full Stack Developer', icon: Laptop, desc: 'Frontend, Backend & Database Engineering' },
  { id: 'frontend', title: 'Frontend Developer', icon: GraduationCap, desc: 'React, TypeScript & Modern Web UI' },
  { id: 'backend', title: 'Backend Developer', icon: Server, desc: 'Node.js, Microservices & Databases' },
  { id: 'data_analyst', title: 'Data Analyst', icon: LineChart, desc: 'Data Visualization, SQL & Insights' },
  { id: 'data_scientist', title: 'Data Scientist', icon: Cpu, desc: 'Machine Learning, Python & AI Models' },
  { id: 'devops', title: 'DevOps Engineer', icon: Database, desc: 'Cloud, CI/CD Pipelines & Docker' },
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [selectedCareer, setSelectedCareer] = useState('fullstack');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full text-slate-800 shadow-xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Personalized Onboarding</h2>
              <p className="text-xs text-slate-500">Step {step} of 2 — Customize your EDUNEXA path</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
            <span className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
          </div>
        </div>

        {/* Step 1: Select Career Goal */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Select Your Target Career Path</h3>
              <p className="text-xs text-slate-500">EDUNEXA will calculate your skill gaps & build a tailored roadmap.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
              {CAREERS.map((c) => {
                const Icon = c.icon;
                const isSelected = selectedCareer === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCareer(c.id)}
                    className={`p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        {c.title}
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 inline" />}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{c.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Self Skill Assessment */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Your Current Experience Level</h3>
              <p className="text-xs text-slate-500">Select where you are starting from today.</p>
            </div>

            <div className="space-y-3">
              {['Beginner (Starting from scratch)', 'Intermediate (Some experience & projects)', 'Advanced (Looking for mastery)'].map((lvl) => {
                const isSelected = experienceLevel.startsWith(lvl.split(' ')[0]);
                return (
                  <button
                    key={lvl}
                    onClick={() => setExperienceLevel(lvl.split(' ')[0])}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-50/70 border-indigo-500 text-slate-900 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs">{lvl}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-500 hover:text-slate-900 transition-colors font-semibold"
              >
                Back
              </button>
              <button
                onClick={() => onComplete(selectedCareer, experienceLevel)}
                className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all"
              >
                Launch Personalized Dashboard <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
