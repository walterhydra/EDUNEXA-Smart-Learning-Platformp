import React, { useState } from 'react';
import {
  User,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2,
  KeyRound,
  BookOpenCheck,
} from 'lucide-react';
import loginIllustration from '../assets/login_illustration.jpg';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';

export const LoginPage: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleFillDemoStudent = () => {
    setUsername('student@skillsense.ai');
    setPassword('StudentPass123!');
    setRole('STUDENT');
    setError('');
  };

  const handleFillDemoAdmin = () => {
    setUsername('admin@skillsense.ai');
    setPassword('AdminPass123!');
    setRole('ADMIN');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!username.trim()) {
      setError('Please enter your Username or Email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        `Logged in successfully as ${role === 'ADMIN' ? 'Administrator' : 'Student Learner'}! Redirecting...`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#EEF3F8]">
      {/* Outer Main Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-slate-300/60 overflow-hidden border border-slate-100 grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* LEFT SECTION — Login Form */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between z-10 bg-white">
          <div>
            {/* Logo */}
            <div className="flex items-start gap-3 mb-8">
              <div className="p-2.5 bg-slate-900 rounded-2xl text-white shadow-md">
                <BookOpenCheck className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-wider text-slate-900 font-serif uppercase">
                  SKILLSENSE
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  SMART LEARNING PLATFORM
                </p>
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-lg font-bold text-slate-800 mb-5">
              Login to your account
            </h2>

            {/* Role Switcher Pill */}
            <div className="flex p-1 bg-[#F0F4F9] rounded-xl mb-5">
              <button
                type="button"
                onClick={() => setRole('STUDENT')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  role === 'STUDENT'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('ADMIN')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  role === 'ADMIN'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                Admin
              </button>
            </div>

            {/* Error / Success Feedback */}
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-600">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input 1: Username or Email */}
              <div className="relative flex items-center bg-[#F0F4F9] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all border border-slate-200/60">
                <div className="p-3 text-indigo-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or Email"
                  className="w-full py-3 pr-4 bg-transparent text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>

              {/* Input 2: Password */}
              <div className="relative flex items-center bg-[#F0F4F9] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all border border-slate-200/60">
                <div className="p-3 text-indigo-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full py-3 pr-10 bg-transparent text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-28 py-2.5 bg-[#1B2A4A] hover:bg-[#121E36] text-white font-semibold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Quick Demo Pre-fills */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                1-Click Demo Login:
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleFillDemoStudent}
                  className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-all"
                >
                  Demo Student
                </button>
                <button
                  type="button"
                  onClick={handleFillDemoAdmin}
                  className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold rounded-lg transition-all"
                >
                  Demo Admin
                </button>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 mt-6">
            © 2026 SkillSense AI. All rights reserved.
          </div>
        </div>

        {/* RIGHT SECTION — Illustration & Decorative Wave */}
        <div className="hidden lg:flex lg:col-span-7 relative items-center justify-center p-8 bg-[#F5F8FC] overflow-hidden">
          {/* Background curved wave shape */}
          <div className="absolute inset-y-0 right-0 left-0 bg-gradient-to-l from-[#E6EEF7] via-[#EFF5FA] to-transparent pointer-events-none" />

          {/* Sparkles / Decorative Elements */}
          <div className="absolute top-12 left-16 text-cyan-400 animate-bounce">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute top-20 right-20 text-pink-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute bottom-16 left-24 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Main Study Illustration */}
          <div className="relative z-10 w-full max-w-lg p-2 transition-transform hover:scale-[1.02] duration-300">
            <img
              src={loginIllustration}
              alt="Students Learning on Books"
              className="w-full h-auto object-contain rounded-2xl shadow-lg shadow-indigo-100/50"
            />
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
