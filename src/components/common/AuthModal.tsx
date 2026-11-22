import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, Mail, User, Building, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    setRole,
    student,
    employer
  } = useApp();

  const [signupRole, setSignupRole] = useState<'student' | 'employer'>('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    university: 'INSAT',
    companyName: '',
    industry: 'Event & Marketing',
    city: 'Sousse',
    phone: '+216 '
  });
  const [resetSent, setResetSent] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setError(''); setNotice(null); setResetSent(false);
    try {
      if (authModalMode === 'reset') {
        const {error}=await supabase.auth.updateUser({password:formData.password});if(error)throw error;
        await supabase.auth.signOut();setNotice('Password updated. Sign in with your new password.');setAuthModalMode('login');
      } else if (authModalMode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(formData.email.trim(), { redirectTo: window.location.origin });
        if (error) throw error;
        setResetSent(true);
      } else if (authModalMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({email:formData.email.trim(),password:formData.password, options:{emailRedirectTo:window.location.origin,data:{role:signupRole,full_name:signupRole==='student'?formData.name:formData.companyName,company_name:signupRole==='employer'?formData.companyName:null,university:signupRole==='student'?formData.university:null,city:formData.city}}});
        if (error) throw error;
        setNotice(data.session?'Account created.':'Check your email to confirm your account, then sign in.');
        if(data.session) setIsAuthModalOpen(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({email:formData.email.trim(),password:formData.password});
        if(error) throw error;
        setIsAuthModalOpen(false);
      }
      setFormData(v=>({...v,password:''}));
    } catch(e) { setError(e instanceof Error?e.message:'Authentication failed. Please try again.'); }
    finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-float border border-slate-100 overflow-hidden animate-scale-in">
        {/* Header decoration */}
        <div className="h-3 bg-gradient-to-r from-navy via-fresh to-tunisian"></div>

        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-navy hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white p-2 shadow-md border border-slate-100 mb-2">
              <img src="/logo.png" alt="GetBoth Logo" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-2xl font-black text-navy tracking-tight font-display">
              {authModalMode === 'login' && 'Welcome Back'}
              {authModalMode === 'signup' && 'Join GetBoth Today'}
              {authModalMode === 'forgot' && 'Reset Password'}
              {authModalMode === 'reset' && 'Choose a new password'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {authModalMode === 'login' && 'Sign in to access your student jobs & mission dashboard'}
              {authModalMode === 'signup' && 'Create your free account and start in 2 minutes'}
              {authModalMode === 'forgot' && "Enter your email address and we'll send a reset link"}
            </p>
          </div>

          {error && <p role="alert" className="mb-4 p-3 border border-tunisian text-tunisian text-sm">{error}</p>}
          {notice && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notice}</span>
            </div>
          )}

          {/* Role selection tab during Sign Up or Login */}
          {authModalMode === 'signup' && (
            <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
              <button
                type="button"
                onClick={() => setSignupRole('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  signupRole === 'student' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => setSignupRole('employer')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  signupRole === 'employer' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Company / Employer</span>
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authModalMode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5">
                  {signupRole === 'student' ? 'Full Name' : 'Company Name'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder={signupRole === 'student' ? 'e.g. Sarah Ben Ali' : 'e.g. Pulse Events Tunisia'}
                    value={signupRole === 'student' ? formData.name : formData.companyName}
                    onChange={e => setFormData({ ...formData, [signupRole === 'student' ? 'name' : 'companyName']: e.target.value })}
                    className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required={authModalMode !== 'reset'}
                  disabled={authModalMode === 'reset'}
                  placeholder={signupRole === 'student' ? 'sarah.benali@insat.ucar.tn' : 'contact@pulse-events.tn'}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>
            </div>

            {authModalMode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-navy">Password</label>
                  {authModalMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setAuthModalMode('forgot')}
                      className="text-[11px] font-semibold text-fresh hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    minLength={authModalMode === 'signup' || authModalMode === 'reset' ? 8 : undefined}
                    autoComplete={authModalMode === 'signup' ? 'new-password' : 'current-password'}
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                  />
                </div>
              </div>
            )}

            {authModalMode === 'signup' && signupRole === 'student' && (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-navy mb-1">University</label>
                  <select
                    value={formData.university}
                    onChange={e => setFormData({ ...formData, university: e.target.value })}
                    className="w-full h-10 text-xs px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-fresh bg-white cursor-pointer"
                  >
                    <option value="INSAT">INSAT</option>
                    <option value="ESPRIT">ESPRIT</option>
                    <option value="IHEC Carthage">IHEC Carthage</option>
                    <option value="FST Tunis">FST Tunis</option>
                    <option value="Université de Sousse">Univ. Sousse</option>
                    <option value="ENIT">ENIT</option>
                    <option value="Autre">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-navy mb-1">City</label>
                  <select
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-10 text-xs px-3 rounded-xl border border-slate-200 focus:outline-none focus:border-fresh bg-white cursor-pointer"
                  >
                    <option value="Tunis">Tunis</option>
                    <option value="Sousse">Sousse</option>
                    <option value="Monastir">Monastir</option>
                    <option value="Sfax">Sfax</option>
                    <option value="Ariana">Ariana</option>
                  </select>
                </div>
              </div>
            )}

            {authModalMode === 'forgot' && resetSent && (
              <div className="p-3 bg-fresh-50 border border-fresh-200 text-navy rounded-xl text-xs animate-fade-in">
                A password reset email has been dispatched to <strong>{formData.email || 'your email'}</strong> with instructions.
              </div>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full h-12 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 btn-press"
            >
              <span>
                {authModalMode === 'login' && 'Sign In to GetBoth'}
                {authModalMode === 'signup' && `Create ${signupRole === 'student' ? 'Student' : 'Company'} Account`}
                {authModalMode === 'forgot' && 'Send Reset Instructions'}
                {authModalMode === 'reset' && 'Update password'}
              </span>
              <ArrowRight className="w-4 h-4 text-sunny" />
            </button>
          </form>

          {/* Toggle between login and register */}
          <div className="mt-5 text-center text-xs text-slate-500">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('signup')}
                  className="font-bold text-fresh hover:underline"
                >
                  Sign up free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  className="font-bold text-fresh hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
