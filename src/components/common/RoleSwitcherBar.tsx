import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Briefcase, ShieldAlert, Globe, Sparkles, RefreshCw } from 'lucide-react';
import { UserRole } from '../../types';

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole, student, employer } = useApp();

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800 z-50 sticky top-0 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold tracking-wide uppercase text-[10px] border border-brand-500/30">
            <Sparkles className="w-3 h-3 text-brand-400" />
            <span>Interactive Demo Switcher</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">
            Switch perspectives instantly to evaluate each role:
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-1.5">
          <button
            onClick={() => setRole('student')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
              role === 'student'
                ? 'bg-brand-600 text-white shadow-sm ring-1 ring-brand-400'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 text-brand-300" />
            <span>Student ({student.fullName.split(' ')[0]})</span>
          </button>

          <button
            onClick={() => setRole('employer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
              role === 'employer'
                ? 'bg-amber-600 text-white shadow-sm ring-1 ring-amber-400'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-amber-300" />
            <span>Employer ({employer.companyName.split(' ')[0]})</span>
          </button>

          <button
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
              role === 'admin'
                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-300" />
            <span>Administrator</span>
          </button>

          <button
            onClick={() => setRole('guest')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-all font-medium ${
              role === 'guest'
                ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-300" />
            <span>Landing Page</span>
          </button>

          <button
            onClick={handleResetData}
            title="Reset Mock Data"
            className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
