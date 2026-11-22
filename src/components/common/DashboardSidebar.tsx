import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Search,
  Briefcase,
  Calendar,
  User,
  ShieldCheck,
  PlusCircle,
  FileCheck2,
  Users,
  Settings,
  ShieldAlert,
  BarChart3,
  DollarSign,
  Star,
  LogOut,
  ChevronRight,
  ExternalLink,
  QrCode,
  Sparkles
} from 'lucide-react';

export const DashboardSidebar: React.FC = () => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    student,
    employer,
    jobs,
    applications,
    setIsPostJobModalOpen
  } = useApp();

  const myApplications = applications.filter(a => a.studentId === student.id);
  const acceptedApps = myApplications.filter(a => a.status === 'accepted');
  const myJobIds = jobs.filter(j => j.employerId === employer.id).map(j => j.id);
  const pendingApplicants = applications.filter(a => myJobIds.includes(a.jobId) && a.status === 'pending');

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 shrink-0 sticky top-[37px] h-[calc(100vh-37px)] p-4 justify-between z-30 shadow-xs">
      
      {/* Top Brand & Profile snapshot */}
      <div className="space-y-5">
        
        {/* Logo and Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-slate-200/90 shadow-xs flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="GetBoth Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-navy">
                Get<span className="text-tunisian">Both</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.2 rounded bg-blush text-steel border border-blush-300">
                Jobs
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Student Marketplace</p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
          <img
            src={
              role === 'student'
                ? student.avatar
                : role === 'employer'
                ? employer.logo
                : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
            }
            alt="User"
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-fresh/30 bg-white"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-navy truncate">
              {role === 'student' ? student.fullName : role === 'employer' ? employer.companyName : 'Admin Ops'}
            </h4>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              {role === 'student' && (
                <>
                  <Star className="w-3 h-3 text-sunny fill-sunny" />
                  <span className="font-semibold text-slate-700">{student.rating}</span>
                  <span>•</span>
                  <span className="text-tunisian font-bold">{student.totalEarnings} DT</span>
                </>
              )}
              {role === 'employer' && (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Verified Company</span>
                </>
              )}
              {role === 'admin' && (
                <span className="text-emerald-600 font-semibold">Super Administrator</span>
              )}
            </div>
          </div>
        </div>

        {/* Post Mission CTA if Employer */}
        {role === 'employer' && (
          <button
            onClick={() => setIsPostJobModalOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-tunisian hover:bg-tunisian-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
          >
            <PlusCircle className="w-4 h-4 text-sunny" />
            <span>Post a Mission</span>
          </button>
        )}

        {/* Navigation Menu Links */}
        <nav className="space-y-1 text-xs font-semibold">
          
          {/* STUDENT MENU */}
          {role === 'student' && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-fresh" />
                  <span>Student Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'jobs'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-fresh" />
                  <span>Find Jobs</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  activeTab === 'jobs' ? 'bg-navy-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {jobs.filter(j => j.status === 'open').length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'applications'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-tunisian" />
                  <span>My Applications</span>
                </div>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  activeTab === 'applications' ? 'bg-navy-700 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {myApplications.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('schedule')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'schedule'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-sunny" />
                  <span>Missions & Pass</span>
                </div>
                {acceptedApps.length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'profile'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>Profile, CV & Skills</span>
                </div>
              </button>
            </>
          )}

          {/* EMPLOYER MENU */}
          {role === 'employer' && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 text-fresh" />
                  <span>Employer Dashboard</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('my-jobs')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'my-jobs'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-fresh" />
                  <span>Posted Missions</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold">
                  {jobs.filter(j => j.employerId === employer.id).length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('applicants')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'applicants'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-tunisian" />
                  <span>Review Candidates</span>
                </div>
                {pendingApplicants.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-tunisian text-white text-[10px] font-bold">
                    {pendingApplicants.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('company-profile')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'company-profile'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Company Profile & KYC</span>
                </div>
              </button>
              <button onClick={() => setActiveTab('membership')} className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all ${activeTab === 'membership' ? 'bg-navy text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
                <Sparkles className="w-4 h-4 text-sunny" /><span>Membership</span>
              </button>
            </>
          )}

          {/* ADMIN MENU */}
          {role === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'metrics'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BarChart3 className="w-4 h-4 text-emerald-500" />
                  <span>Platform Metrics & GMV</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('verify')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'verify'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>KYC Verifications</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('moderation')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'moderation'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileCheck2 className="w-4 h-4 text-tunisian" />
                  <span>Job Moderation</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'users'
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-fresh" />
                  <span>User Directory</span>
                </div>
              </button>
            </>
          )}

        </nav>
      </div>

      {/* Bottom Trust & Logout */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <div className="p-3 bg-blush/40 rounded-2xl border border-blush-300 text-[11px] text-steel">
          <div className="flex items-center gap-1.5 font-bold text-navy mb-1">
            <ShieldCheck className="w-4 h-4 text-tunisian" />
            <span>Escrow Protected</span>
          </div>
          <p className="text-slate-500 leading-tight">
            All missions guarantee student compensation through platform escrow.
          </p>
        </div>

        <button
          onClick={() => setRole('guest')}
          className="w-full py-2 px-3 rounded-xl text-slate-500 hover:text-tunisian hover:bg-tunisian-50 text-xs font-semibold flex items-center gap-2 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit to Landing Page</span>
        </button>
      </div>

    </aside>
  );
};
