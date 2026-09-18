import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Brain,
  Target,
  Compass,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2,
} from 'lucide-react';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';

export const LoginPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // UI Status State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  // Demo auto-fill handlers
  const handleFillDemoStudent = () => {
    setEmail('student@skillsense.ai');
    setPassword('StudentPass123!');
    setName('Alex Chen');
    setRole('STUDENT');
    setError('');
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@skillsense.ai');
    setPassword('AdminPass123!');
    setName('Dr. Sarah Vance');
    setRole('ADMIN');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
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
        setSuccessMessage(`Authenticated successfully as ${role === 'ADMIN' ? 'Platform Administrator' : 'Student Learner'}! Redirecting to Dashboard...`);
      } else {
        setSuccessMessage('Account created successfully! Initializing personalized skill assessment...');
      }
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Background Ambient Orbs */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />
      <div className="absolute inset-0 glow-gradient pointer-events-none" />

      {/* Main Glassmorphic Container */}
      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-slate-800/80 glass-panel-glow shadow-2xl overflow-hidden z-10">
        
        {/* LEFT COLUMN: Visual Showcase & Brand Messaging (Hidden on small screens) */}
        <div className="hidden lg:flex lg:col-span-6 relative p-10 flex-col justify-between bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 border-r border-slate-800/60 overflow-hidden">
          
          {/* Header Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-600/20 border border-indigo-500/40 rounded-2xl text-indigo-400 shadow-lg shadow-indigo-600/20">
                <Brain className="w-7 h-7 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                  SkillSense AI
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-indigo-400">
                  Smart Education Platform
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-black text-white leading-tight tracking-tight mb-3">
              Adaptive Education & <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Career Gap Analysis
              </span>
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Bridging the gap between student abilities and target career requirements using continuous skill evaluation and adaptive roadmaps.
            </p>
          </div>

          {/* Interactive Feature Cards & Live Preview */}
          <div className="relative z-10 my-8 space-y-3">
            {/* Card 1 */}
            <div className="p-3.5 glass-panel rounded-2xl border border-slate-800/80 hover:border-indigo-500/30 transition-all flex items-start gap-3 group">
              <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 group-hover:scale-105 transition-transform">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                  Continuous Skill Evidence Loop
                </h4>
                <p className="text-[11px] text-slate-400">
                  Calculates real gaps between your initial score and career milestones.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-3.5 glass-panel rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all flex items-start gap-3 group">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-cyan-400 group-hover:scale-105 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Adaptive Roadmap Engine
                </h4>
                <p className="text-[11px] text-slate-400">
                  Dynamically unlocks new modules or remedial practice based on reassessments.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-3.5 glass-panel rounded-2xl border border-slate-800/80 hover:border-purple-500/30 transition-all flex items-start gap-3 group">
              <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                  Contextual AI Tutor
                </h4>
                <p className="text-[11px] text-slate-400">
                  Mentors you directly inside your active learning module without context loss.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Badge & Status Indicator */}
          <div className="relative z-10 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-emerald-400">System Ready</span>
            </div>
            <span className="text-[11px] text-slate-500">v1.0.0 • Hackathon Release</span>
          </div>

          {/* Background Decorative Mesh Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/0 rounded-full blur-3xl pointer-events-none" />
        </div>


        {/* RIGHT COLUMN: Authentication Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-slate-900/60">
          
          {/* Header Mobile Brand & Mode Tabs */}
          <div>
            <div className="flex lg:hidden items-center gap-2.5 mb-6">
              <div className="p-2 bg-indigo-600/20 border border-indigo-500/40 rounded-xl text-indigo-400">
                <Brain className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold text-white">SkillSense AI</span>
            </div>

            {/* Sign In vs Create Account Tab Switcher */}
            <div className="flex p-1 bg-slate-950/80 rounded-2xl border border-slate-800 mb-6">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setError('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setError('');
                  setSuccessMessage('');
                }}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-xl transition-all ${
                  authMode === 'register'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role Selection Toggle */}
            <div className="mb-6">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Select Portal Access Level
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('STUDENT')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    role === 'STUDENT'
                      ? 'bg-indigo-500/10 border-indigo-500/60 text-white shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${role === 'STUDENT' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold">Student Learner</span>
                    <span className="block text-[10px] text-slate-400">Roadmap & Mentoring</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                    role === 'ADMIN'
                      ? 'bg-purple-500/10 border-purple-500/60 text-white shadow-md shadow-purple-500/10'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-800 text-slate-400'}`}>
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold">Administrator</span>
                    <span className="block text-[10px] text-slate-400">Careers & Content</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Error & Success Alert Banners */}
            {error && (
              <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2.5 text-xs text-rose-300 animate-fadeIn">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-xs text-emerald-300 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Chen"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'ADMIN' ? 'admin@skillsense.ai' : 'student@university.edu'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'login' && (
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 bg-slate-950 border-slate-800 rounded text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-xs text-slate-400">Remember session for 30 days</span>
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authMode === 'login' ? 'Sign In to SkillSense' : 'Create Student Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/80" />
              </div>
              <span className="relative px-3 bg-slate-900/90 text-[10px] uppercase font-bold text-slate-500">
                Or Quick Test Demo
              </span>
            </div>

            {/* Quick Demo Pre-fill Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleFillDemoStudent}
                className="py-2 px-3 glass-panel hover:bg-slate-800/60 rounded-xl text-[11px] font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-all border border-slate-800 hover:border-slate-700"
              >
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                Demo Student
              </button>
              <button
                type="button"
                onClick={handleFillDemoAdmin}
                className="py-2 px-3 glass-panel hover:bg-slate-800/60 rounded-xl text-[11px] font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition-all border border-slate-800 hover:border-slate-700"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Demo Admin
              </button>
            </div>
          </div>

          {/* Footer Security Seal */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
            <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              Encrypted SSL Authorization • Server-Side JWT Session Control
            </p>
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
