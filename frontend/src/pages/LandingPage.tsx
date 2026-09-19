import React from 'react';
import {
  User,
  ArrowRight,
  Target,
  Compass,
  Bot,
  Code2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import logoImg from '../assets/logo.jpeg';
import studentHeroImg from '../assets/student_hero.jpg';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn }) => {
  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      
      {/* 1. CLEAN SIMPLE HEADER */}
      <header className="w-full px-6 sm:px-12 py-5 bg-white border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* Logo */}
        <div onClick={onSignIn} className="flex items-center gap-3 cursor-pointer">
          <img
            src={logoImg}
            alt="EDUNEXA Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded-xl"
          />
        </div>

        {/* Log In Button */}
        <div>
          <button
            onClick={onSignIn}
            className="py-2.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Log In</span>
          </button>
        </div>
      </header>

      {/* 2. SIMPLE HERO SECTION */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 sm:px-12 py-12 sm:py-20 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Smart Education Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-satoshi">
              Personalized AI Roadmaps for Your{' '}
              <span className="text-indigo-600">Dream Career.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-lg font-quicksand font-medium leading-relaxed">
              EDUNEXA evaluates your current skills, identifies career gaps, creates a custom learning path, and provides 24/7 AI mentoring.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={onSignIn}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-full shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onSignIn}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-bold text-sm rounded-full transition-all cursor-pointer"
              >
                Log In
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4 text-xs font-semibold text-slate-500 font-quicksand">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Skill Assessment</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                <span>Skill Gap Analysis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-500" />
                <span>24/7 AI Mentor</span>
              </div>
            </div>
          </div>

          {/* Hero Right Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div 
              onClick={onSignIn}
              className="relative w-full max-w-sm rounded-3xl bg-white p-3 border border-slate-200/90 shadow-xl cursor-pointer group hover:border-indigo-400 transition-all"
            >
              <div className="relative h-[340px] sm:h-[400px] w-full rounded-2xl overflow-hidden bg-indigo-50">
                <img
                  src={studentHeroImg}
                  alt="EDUNEXA Student"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Join EDUNEXA</p>
                    <h3 className="text-base font-bold font-satoshi mt-0.5">Click to Log In & Access Dashboard →</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 3. SIMPLE 3-CARD FEATURE SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 mt-16 border-t border-slate-200/80">
          <div onClick={onSignIn} className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-satoshi mb-1">1. Skill Assessment</h4>
            <p className="text-xs text-slate-500 font-quicksand font-medium leading-relaxed">
              Take diagnostic tests to pinpoint exact strengths and skill gaps for technical roles.
            </p>
          </div>

          <div onClick={onSignIn} className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-satoshi mb-1">2. Adaptive Roadmap</h4>
            <p className="text-xs text-slate-500 font-quicksand font-medium leading-relaxed">
              Receive a personalized module sequence that adapts automatically as you score higher.
            </p>
          </div>

          <div onClick={onSignIn} className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-indigo-300 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-3">
              <Bot className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 font-satoshi mb-1">3. 24/7 AI Mentor</h4>
            <p className="text-xs text-slate-500 font-quicksand font-medium leading-relaxed">
              Ask doubts, break down code, and receive step-by-step guidance whenever you learn.
            </p>
          </div>
        </div>
      </main>

      {/* 4. SIMPLE CLEAN FOOTER */}
      <footer className="w-full px-6 sm:px-12 py-5 bg-white border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 font-quicksand">
        <span>© 2026 EDUNEXA Platform. All rights reserved.</span>
        <button onClick={onSignIn} className="text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer">
          Log In to Account
        </button>
      </footer>

    </div>
  );
};
