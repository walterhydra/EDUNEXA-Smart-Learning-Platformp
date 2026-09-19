import React, { useState, useEffect } from 'react';
import {
  BookOpenCheck,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2,
  Sparkles,
  ShieldCheck,
  XCircle,
  Loader2,
  Check,
  Terminal,
  Code2,
  Cpu
} from 'lucide-react';
import logoImg from '../assets/logo.jpeg';
import bgVideo from '../assets/b8bd4e4273cceae2889d9d259b04f732.mp4';
import { ForgotPasswordModal } from '../components/ForgotPasswordModal';
import { api } from '../lib/api';

interface LoginPageProps {
  onLoginSuccess?: (user: any) => void;
  onBackToLanding?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
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

  // Real-time email availability state
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'available' | 'taken' | 'invalid' | null>(null);

  // Debounced real-time email availability check
  useEffect(() => {
    if (authMode !== 'register' || !emailOrUsername.trim()) {
      setEmailStatus(null);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailOrUsername.trim())) {
      setEmailStatus('invalid');
      return;
    }

    setIsCheckingEmail(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.checkEmail(emailOrUsername.trim());
        if (res.success && res.data) {
          setEmailStatus(res.data.available ? 'available' : 'taken');
        } else {
          setEmailStatus(null);
        }
      } catch (e) {
        setEmailStatus(null);
      } finally {
        setIsCheckingEmail(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [emailOrUsername, authMode]);

  // Real-time password strength score (0 to 4)
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthLabel = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
      case 2:
      case 3:
        return { label: 'Medium', color: 'bg-amber-500', text: 'text-amber-600' };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
      default:
        return { label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    }
  };

  // Generic login helper for 3 distinct students
  const handleStudentQuickLogin = async (email: string, studentName: string) => {
    setEmailOrUsername(email);
    setPassword('Student123!');
    setName(studentName);
    setRole('STUDENT');
    setError('');
    setIsLoading(true);

    try {
      const response = await api.login({
        email,
        password: 'Student123!',
      });

      if (response.success && response.data) {
        localStorage.setItem('edunexa_token', response.data.accessToken);
        localStorage.setItem('edunexa_user', JSON.stringify(response.data.user));
        setSuccessMessage(`Welcome back, ${studentName}! Logged in to your personalized track.`);
        if (onLoginSuccess) {
          setTimeout(() => onLoginSuccess(response.data.user), 400);
        }
      } else {
        const fallbackUser = {
          email,
          name: studentName,
          role: 'STUDENT',
        };
        setSuccessMessage(`Welcome back, ${studentName}! Opening dashboard...`);
        if (onLoginSuccess) {
          setTimeout(() => onLoginSuccess(fallbackUser), 400);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Student login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemoAdmin = async () => {
    setEmailOrUsername('admin@edunexa.ai');
    setPassword('AdminPass123!');
    setName('Dr. Sarah Vance');
    setRole('ADMIN');
    setError('');
    setIsLoading(true);

    try {
      const response = await api.login({
        email: 'admin@edunexa.ai',
        password: 'AdminPass123!',
      });

      if (response.success && response.data) {
        localStorage.setItem('edunexa_token', response.data.accessToken);
        localStorage.setItem('edunexa_user', JSON.stringify(response.data.user));
        setSuccessMessage('Welcome back, Dr. Sarah Vance! Authenticated via EDUNEXA Backend.');
        if (onLoginSuccess) {
          setTimeout(() => onLoginSuccess(response.data.user), 400);
        }
      } else {
        const fallbackUser = {
          email: 'admin@edunexa.ai',
          name: 'Dr. Sarah Vance',
          role: 'ADMIN',
        };
        setSuccessMessage('Welcome back, Dr. Sarah Vance! Opening dashboard...');
        if (onLoginSuccess) {
          setTimeout(() => onLoginSuccess(fallbackUser), 400);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Demo admin login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!emailOrUsername.trim()) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailOrUsername.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    if (authMode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      if (emailStatus === 'taken') {
        setError('An account with this email address already exists. Please sign in instead.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (authMode === 'register') {
        const res = await api.register({
          email: emailOrUsername.trim(),
          password: password,
          name: name.trim(),
          role: role,
        });

        if (!res.success) {
          setError(res.message || 'Registration failed. Please check your credentials.');
          return;
        }

        if (res.data) {
          localStorage.setItem('edunexa_token', res.data.accessToken);
          localStorage.setItem('edunexa_user', JSON.stringify(res.data.user));
          setSuccessMessage(`Account created successfully! Welcome to EDUNEXA, ${res.data.user.name}.`);
          if (onLoginSuccess) {
            setTimeout(() => onLoginSuccess(res.data?.user), 500);
          }
        }
      } else {
        const res = await api.login({
          email: emailOrUsername.trim(),
          password: password,
        });

        if (!res.success) {
          setError(res.message || 'Invalid email or password.');
          return;
        }

        if (res.data) {
          localStorage.setItem('edunexa_token', res.data.accessToken);
          localStorage.setItem('edunexa_user', JSON.stringify(res.data.user));
          setSuccessMessage(`Welcome back, ${res.data.user.name}! Opening dashboard...`);
          if (onLoginSuccess) {
            setTimeout(() => onLoginSuccess(res.data?.user), 500);
          }
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen max-h-screen max-w-vw overflow-hidden flex bg-white text-slate-900 font-sans">
      {/* LEFT PORTION — Login Section */}
      <div className="w-full lg:w-[62%] h-full flex flex-col justify-between p-6 lg:px-16 lg:py-6 bg-white overflow-y-auto">
        
        {/* Top Header Logo */}
        <div className="flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <img 
              src={logoImg} 
              alt="EDUNEXA Logo" 
              className="h-10 w-10 object-contain mix-blend-multiply" 
            />
            <span className="text-xl font-black text-slate-900 tracking-tight font-satoshi">
              Edu<span className="text-indigo-600">Nexa</span>
            </span>
          </div>
        </div>

        {/* Centered Main Form Container */}
        <div className="w-full max-w-md mx-auto my-auto py-3">
          
          {/* Top Brand Logo Icon */}
          <div className="flex justify-center mb-3">
            <img 
              src={logoImg} 
              alt="EDUNEXA Logo" 
              className="h-20 w-20 object-contain mix-blend-multiply" 
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-slate-900 mb-4">
            {authMode === 'login' ? 'Welcome back' : 'Create your EDUNEXA account'}
          </h1>

          {/* Role Access Selector */}
          <div className="flex p-1 bg-slate-100 rounded-full mb-4">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
                role === 'STUDENT'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole('ADMIN')}
              className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-full flex items-center justify-center gap-1.5 transition-all ${
                role === 'ADMIN'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4 text-purple-600" />
              Admin
            </button>
          </div>

          {/* Quick 1-Click Student Login Selector */}
          <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
              ⚡ Select Student Profile to Login (Neon DB Connected):
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleStudentQuickLogin('rahul.python@edunexa.edu', 'Rahul Sharma')}
                className="py-2 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center text-center transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-amber-600 mb-0.5" />
                <span>Rahul</span>
                <span className="text-[9px] font-medium text-amber-700">Python</span>
              </button>
              <button
                type="button"
                onClick={() => handleStudentQuickLogin('priya.fullstack@edunexa.edu', 'Priya Patel')}
                className="py-2 px-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-900 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center text-center transition-all cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-600 mb-0.5" />
                <span>Priya</span>
                <span className="text-[9px] font-medium text-indigo-700">Full Stack</span>
              </button>
              <button
                type="button"
                onClick={() => handleStudentQuickLogin('arjun.ai@edunexa.edu', 'Arjun Verma')}
                className="py-2 px-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 rounded-xl text-[11px] font-bold flex flex-col items-center justify-center text-center transition-all cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 text-purple-600 mb-0.5" />
                <span>Arjun</span>
                <span className="text-[9px] font-medium text-purple-700">AI Systems</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-3 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white text-xs text-slate-400">or sign in manually</span>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-600">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {authMode === 'register' && (
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
              </div>
            )}

            {/* Email Field with Real-Time Validation Feedback */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Enter email address"
                  className={`w-full pl-4 pr-10 py-3 bg-white border rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all ${
                    authMode === 'register' && emailStatus === 'taken'
                      ? 'border-rose-400 focus:border-rose-600 focus:ring-rose-600'
                      : authMode === 'register' && emailStatus === 'available'
                      ? 'border-emerald-400 focus:border-emerald-600 focus:ring-emerald-600'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600'
                  }`}
                />
                {isCheckingEmail ? (
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin absolute right-3.5 top-3.5" />
                ) : authMode === 'register' && emailStatus === 'available' ? (
                  <Check className="w-4 h-4 text-emerald-500 absolute right-3.5 top-3.5" />
                ) : authMode === 'register' && emailStatus === 'taken' ? (
                  <XCircle className="w-4 h-4 text-rose-500 absolute right-3.5 top-3.5" />
                ) : (
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                )}
              </div>

              {/* Real-time Email Check Status Indicator */}
              {authMode === 'register' && emailOrUsername.trim() !== '' && (
                <div className="mt-1 flex items-center gap-1.5 text-[11px]">
                  {isCheckingEmail && (
                    <span className="text-slate-400 flex items-center gap-1">Checking email availability...</span>
                  )}
                  {emailStatus === 'available' && (
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" /> Email is available
                    </span>
                  )}
                  {emailStatus === 'taken' && (
                    <span className="text-rose-600 font-medium flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Email is already registered
                    </span>
                  )}
                  {emailStatus === 'invalid' && (
                    <span className="text-amber-600 font-medium">Please enter a valid email format</span>
                  )}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Real-Time Password Strength Meter */}
              {authMode === 'register' && password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-indigo-500" /> Password strength:
                    </span>
                    <span className={`font-semibold ${getStrengthLabel(passwordStrength).text}`}>
                      {getStrengthLabel(passwordStrength).label}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength >= 1 ? getStrengthLabel(passwordStrength).color : 'bg-transparent'
                      } ${passwordStrength >= 1 ? 'w-1/3' : 'w-0'}`}
                    />
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength >= 2 ? getStrengthLabel(passwordStrength).color : 'bg-transparent'
                      } ${passwordStrength >= 2 ? 'w-1/3' : 'w-0'}`}
                    />
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength >= 4 ? getStrengthLabel(passwordStrength).color : 'bg-transparent'
                      } ${passwordStrength >= 4 ? 'w-1/3' : 'w-0'}`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (authMode === 'register' && emailStatus === 'taken')}
              className="w-full py-3 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : authMode === 'login' ? (
                'Sign In & Connect'
              ) : (
                'Create Account & Connect'
              )}
            </button>
          </form>

          {/* Terms & Privacy */}
          <p className="text-xs text-slate-400 text-center mt-3">
            By continuing, you agree to EDUNEXA's{' '}
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
                  className="underline font-semibold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
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
                  className="underline font-semibold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="text-xs text-slate-400 text-center lg:text-left shrink-0">
          © 2026 EDUNEXA Platform. All rights reserved.
        </div>
      </div>

      {/* RIGHT PORTION — Background Video Container */}
      <div className="hidden lg:block lg:w-[38%] h-full max-h-screen relative bg-slate-950 overflow-hidden">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
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
