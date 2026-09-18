import React, { useState } from 'react';
import {
  Brain,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2,
} from 'lucide-react';
import bgVideo from '../assets/b8bd4e4273cceae2889d9d259b04f732.mp4';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';

export const LoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleFillDemoStudent = () => {
    setEmailOrUsername('student@skillsense.ai');
    setPassword('StudentPass123!');
    setName('Alex Chen');
    setRole('STUDENT');
    setError('');
  };

  const handleFillDemoAdmin = () => {
    setEmailOrUsername('admin@skillsense.ai');
    setPassword('AdminPass123!');
    setName('Dr. Sarah Vance');
    setRole('ADMIN');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!emailOrUsername.trim()) {
      setError('Please enter your email or username');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (authMode === 'register' && !name) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (authMode === 'login') {
        setSuccessMessage(
          `Welcome back! Logged in as ${role === 'ADMIN' ? 'Administrator' : 'Student'}.`
        );
      } else {
        setSuccessMessage('Account created successfully!');
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-screen overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* FULL-SCREEN BACKGROUND VIDEO */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Soft Dark Vignette / Backdrop Overlay to make the center card pop */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
      </div>

      {/* CENTERED FLOATING LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-950/50 my-auto text-slate-900 transition-all">
        
        {/* Top Header Logo */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="p-1.5 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600 shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-sans italic">
            SkillSense
          </span>
        </div>

        {/* Top Brand Circle Icon */}
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-bold text-center text-slate-900 mb-3">
          {authMode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>

        {/* Role Access Selector */}
        <div className="flex p-1 bg-slate-100/90 rounded-full mb-3">
          <button
            type="button"
            onClick={() => setRole('STUDENT')}
            className={`flex-1 py-1 px-2.5 text-[11px] font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
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
            className={`flex-1 py-1 px-2.5 text-[11px] font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
              role === 'ADMIN'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
            Admin
          </button>
        </div>

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={handleFillDemoStudent}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 transition-all shadow-xs hover:border-slate-300"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.28v3.13C3.25 21.27 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.6H1.28C.46 8.23 0 10.06 0 12s.46 3.77 1.28 5.4l4-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.73 1.28 6.6l4 3.13c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative my-3 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative px-2 bg-white text-[11px] text-slate-400">or</span>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-2.5 p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-600">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-2.5 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {authMode === 'register' && (
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
              />
            </div>
          )}

          <div>
            <div className="relative">
              <input
                type="text"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                placeholder="Enter email or username"
                className="w-full pl-3.5 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
              />
              <Mail className="w-4 h-4 text-emerald-500 absolute right-3 top-3" />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-3.5 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-[10px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Terms & Privacy */}
        <p className="text-[10px] text-slate-400 text-center mt-3">
          By continuing, you agree to our{' '}
          <a href="#" className="underline text-slate-600 hover:text-slate-900">
            Terms
          </a>{' '}
          and{' '}
          <a href="#" className="underline text-slate-600 hover:text-slate-900">
            Privacy Policy
          </a>
          .
        </p>

        {/* Toggle Login vs Register */}
        <p className="text-xs text-slate-500 text-center mt-3">
          {authMode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                  setSuccessMessage('');
                }}
                className="underline font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                  setSuccessMessage('');
                }}
                className="underline font-semibold text-slate-800 hover:text-indigo-600 transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>

        {/* 1-Click Demo Fillers */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleFillDemoStudent}
            className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold rounded-full transition-all"
          >
            Demo Student
          </button>
          <button
            type="button"
            onClick={handleFillDemoAdmin}
            className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold rounded-full transition-all"
          >
            Demo Admin
          </button>
        </div>

        {/* Bottom Footer */}
        <div className="text-[10px] text-slate-400 text-center mt-3 pt-2 border-t border-slate-100/60">
          © 2026 SkillSense AI
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
