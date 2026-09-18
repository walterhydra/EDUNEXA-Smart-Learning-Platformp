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
          `Welcome back! Authenticated as ${role === 'ADMIN' ? 'Administrator' : 'Student Learner'}.`
        );
      } else {
        setSuccessMessage('Account created successfully! Redirecting...');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white text-slate-900 overflow-hidden font-sans">
      {/* LEFT HALF — Full Height Login & Sign In Section (50% Width on Large screens) */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-14 z-10 bg-white">
        
        {/* Top Header Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
            <Brain className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-sans italic">
            SkillSense
          </span>
        </div>

        {/* Center Authentication Card Section */}
        <div className="w-full max-w-sm mx-auto my-auto py-8">
          
          {/* Top Brand Circle Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 shadow-sm">
              <Brain className="w-7 h-7" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-6">
            {authMode === 'login' ? 'Welcome back' : 'Create your account'}
          </h1>

          {/* Role Access Selector */}
          <div className="flex p-1 bg-slate-100 rounded-full mb-5">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
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
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
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
            className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-700 flex items-center justify-center gap-3 transition-all shadow-xs hover:border-slate-300"
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
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-xs text-slate-400">or</span>
          </div>

          {/* Alerts */}
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
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
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
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
                />
                <Mail className="w-4 h-4 text-emerald-500 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {/* Terms & Privacy */}
          <p className="text-[11px] text-slate-400 text-center mt-4">
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
          <p className="text-xs text-slate-500 text-center mt-6">
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
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handleFillDemoStudent}
              className="py-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold rounded-full transition-all"
            >
              Demo Student
            </button>
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="py-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold rounded-full transition-all"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="text-[11px] text-slate-400 text-center lg:text-left">
          © 2026 SkillSense AI
        </div>
      </div>

      {/* RIGHT HALF — Full Height Cover Image (50% Width on Large Screens) */}
      <div className="hidden lg:block lg:w-1/2 min-h-screen relative bg-slate-950 overflow-hidden">
        <img
          src="/image.png"
          alt="SkillSense AI Visual Cover"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  );
};
