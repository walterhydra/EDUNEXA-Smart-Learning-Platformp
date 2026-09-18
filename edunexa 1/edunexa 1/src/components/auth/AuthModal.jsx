import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  CheckCircle2, 
  Zap,
  ShieldCheck
} from 'lucide-react';

export const AuthModal = ({ onStartOnboarding }) => {
  const { loginWithDemo } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      onStartOnboarding({ name: fullName, email });
    } else {
      loginWithDemo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 subtle-mesh-bg">
      {/* Background glowing ambient elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <img 
            src="/logo.png" 
            alt="EduNexa Logo" 
            className="h-20 w-auto object-contain mx-auto rounded-xl shadow-xs"
          />
          <p className="text-xs text-slate-500 font-medium">Smart AI Education & Skill Development Platform</p>
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-900">
          {isSignUp ? "Create your personalized AI learning account" : "Welcome back to your learning space"}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {isSignUp ? "Already have an account?" : "New to EduNexa?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            {isSignUp ? "Sign In instead" : "Create new account & onboard"}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-soft-lg rounded-3xl border border-slate-200/80 sm:px-10">
          
          {/* 1-Click Demo Access Banner */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-sky-50 to-indigo-50 border border-indigo-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">Immediate Demo Mode</p>
                <p className="text-[11px] text-slate-600">Test full dashboard & 14 modules instantly</p>
              </div>
            </div>
            <button
              onClick={loginWithDemo}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              Enter Demo
            </button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-semibold tracking-wider">
                Or Continue With Credentials
              </span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleManualSubmit}>
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all active:scale-[0.99]"
            >
              {isSignUp ? (
                <>
                  Start 6-Step Onboarding <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Sign In to EduNexa <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* New Onboarding Direct Trigger Button */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => onStartOnboarding({})}
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              Start fresh student onboarding wizard directly
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-slate-500 text-[11px]">
          <div className="flex items-center justify-center gap-1 bg-white/70 py-2 px-1 rounded-xl border border-slate-200/60">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Skill-Gap AI
          </div>
          <div className="flex items-center justify-center gap-1 bg-white/70 py-2 px-1 rounded-xl border border-slate-200/60">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Custom Roadmaps
          </div>
          <div className="flex items-center justify-center gap-1 bg-white/70 py-2 px-1 rounded-xl border border-slate-200/60">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> 14 Lab Tools
          </div>
        </div>
      </div>
    </div>
  );
};
