import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Users,
  Briefcase,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  Check,
  Ban,
  Search,
  Sparkles,
  TrendingUp,
  Building,
  BarChart3,
  FileCheck2,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    jobs,
    applications,
    allStudents,
    allEmployers,
    verifyEmployer,
    moderateJobStatus,
    toggleUserSuspension,
    activeTab,
    setActiveTab
  } = useApp();

  const [adminSubTab, setAdminSubTab] = useState<'metrics' | 'verify' | 'moderation' | 'users'>(
    (activeTab as any) === 'verify'
      ? 'verify'
      : (activeTab as any) === 'moderation'
      ? 'moderation'
      : (activeTab as any) === 'users'
      ? 'users'
      : 'metrics'
  );

  // Sync internal sub-tab with navbar/sidebar activeTab
  useEffect(() => {
    if (activeTab === 'metrics' || activeTab === 'verify' || activeTab === 'moderation' || activeTab === 'users') {
      setAdminSubTab(activeTab as any);
    }
  }, [activeTab]);

  const handleSubTabChange = (tab: 'metrics' | 'verify' | 'moderation' | 'users') => {
    setAdminSubTab(tab);
    setActiveTab(tab);
  };

  // Financial calculations
  const totalCompletedEarnings = applications
    .filter(a => a.payoutStatus === 'released')
    .reduce((sum, a) => {
      const job = jobs.find(j => j.id === a.jobId);
      return sum + (job ? job.totalPayment : 50);
    }, 0);

  const totalEscrowLocked = applications
    .filter(a => a.payoutStatus === 'escrowed')
    .reduce((sum, a) => {
      const job = jobs.find(j => j.id === a.jobId);
      return sum + (job ? job.totalPayment : 50);
    }, 0);

  const platformCommissionRevenue = Math.round((totalCompletedEarnings + 1200) * 0.05);
  const pendingEmployers = allEmployers.filter(e => e.verificationStatus === 'pending');

  return (
    <div className="space-y-6 pb-12">
      
      {/* Admin Top Banner */}
      <div className="animate-fade-in-up rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-soft relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-fresh/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1 font-display">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>GetBoth Platform SuperAdmin</span>
              </span>
              <span className="text-xs text-slate-400">Operations & Trust Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 font-display">
              Platform Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Overseeing {allStudents.length} students, {allEmployers.length} registered enterprises, and {jobs.length} missions.
            </p>
          </div>

          {/* Sub tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-800 rounded-2xl shrink-0">
            <button
              onClick={() => handleSubTabChange('metrics')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                adminSubTab === 'metrics' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Metrics</span>
            </button>
            <button
              onClick={() => handleSubTabChange('verify')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                adminSubTab === 'verify' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verifications</span>
              {pendingEmployers.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => handleSubTabChange('moderation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                adminSubTab === 'moderation' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Missions</span>
            </button>
            <button
              onClick={() => handleSubTabChange('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                adminSubTab === 'users' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Users</span>
            </button>
          </div>
        </div>
      </div>

      {/* METRICS VIEW */}
      {adminSubTab === 'metrics' && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs card-hover">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Platform GMV Transacted</span>
              <span className="text-2xl font-black text-navy font-display animate-count-up">{totalCompletedEarnings + 2450} DT</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18% this month
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs card-hover">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Platform Revenue (5%)</span>
              <span className="text-2xl font-black text-emerald-600 font-display animate-count-up">{platformCommissionRevenue} DT</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                Net operational profit
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs card-hover">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Escrow Funds Safeguarded</span>
              <span className="text-2xl font-black text-tunisian font-display animate-count-up">{totalEscrowLocked + 98} DT</span>
              <span className="text-[11px] text-slate-400 font-semibold mt-1 block">
                Held safely for upcoming shifts
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs card-hover">
              <span className="text-xs font-semibold text-slate-500 block mb-1">Total Verified Students</span>
              <span className="text-2xl font-black text-navy font-display animate-count-up">{allStudents.length * 142}</span>
              <span className="text-[11px] text-fresh font-semibold mt-1 block">
                Across 8 universities
              </span>
            </div>
          </div>

          {/* Quick activity summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-navy font-display flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Platform Trust & Escrow Health</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                All short-term jobs are protected with digital check-ins and escrow locks. When a student checks in with their <strong>Mission Pass QR</strong> and the employer marks the job finished, payouts are transferred in real-time.
              </p>
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-medium">
                ✓ 0 active fraud reports • 99.4% on-time mission fulfillment
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-navy font-display flex items-center gap-2">
                <Activity className="w-5 h-5 text-fresh" />
                <span>Quick Admin Actions</span>
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSubTabChange('verify')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-steel font-bold text-xs flex items-center justify-between border border-slate-200 transition-colors btn-press"
                >
                  <span>Verify New Employer Registrations</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-fresh text-white text-[10px] font-display">
                    {pendingEmployers.length} Pending
                  </span>
                </button>
                <button
                  onClick={() => handleSubTabChange('moderation')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-steel font-bold text-xs flex items-center justify-between border border-slate-200 transition-colors btn-press"
                >
                  <span>Review & Moderate Live Job Postings</span>
                  <span className="text-slate-400 text-[10px]">{jobs.length} Missions</span>
                </button>
                <button
                  onClick={() => handleSubTabChange('users')}
                  className="w-full py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-steel font-bold text-xs flex items-center justify-between border border-slate-200 transition-colors btn-press"
                >
                  <span>Student & Employer Directory</span>
                  <span className="text-slate-400 text-[10px]">Access Profiles</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VERIFICATIONS VIEW */}
      {adminSubTab === 'verify' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-navy mb-1 font-display">Company KYC & Verification Queue</h3>
            <p className="text-xs text-slate-500">
              Verify Matricule Fiscal numbers and legitimate registration certificates before granting the Verified badge.
            </p>

            <div className="mt-5 space-y-3">
              {allEmployers.map((emp, idx) => (
                <div
                  key={emp.id}
                  className={`animate-fade-in-up delay-${Math.min((idx + 1) * 75, 400)} p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-hover`}
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={emp.logo}
                      alt={emp.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy text-sm font-display">{emp.companyName}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-display ${
                            emp.verificationStatus === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {emp.verificationStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Matricule: {emp.registrationNumber} • {emp.city} ({emp.industry})
                      </p>
                      <p className="text-[11px] text-slate-400">Contact: {emp.contactPerson} ({emp.contactEmail})</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {emp.verificationStatus !== 'verified' ? (
                      <button
                        onClick={() => verifyEmployer(emp.id)}
                        className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition btn-press"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve & Grant Badge</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified Account</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* JOB MODERATION VIEW */}
      {adminSubTab === 'moderation' && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-navy mb-1 font-display">Missions Moderation</h3>
            <p className="text-xs text-slate-500">
              Ensure listings adhere to minimum student wage policies, ethical guidelines, and safe work environments.
            </p>

            <div className="mt-5 space-y-3">
              {jobs.map((job, idx) => (
                <div
                  key={job.id}
                  className={`animate-fade-in-up delay-${Math.min((idx + 1) * 75, 400)} p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-hover`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy text-sm font-display">{job.title}</span>
                      <span className="text-xs text-slate-500">by {job.companyName}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase font-display ${
                          job.status === 'open' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Rate: <strong className="text-tunisian font-display">{job.hourlyRate} DT/hr</strong></span>
                      <span>Total: {job.totalPayment} DT</span>
                      <span>Location: {job.city}</span>
                      <span>Positions: {job.filledPositions}/{job.availablePositions}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {job.status === 'open' ? (
                      <button
                        onClick={() => moderateJobStatus(job.id, 'cancelled')}
                        className="h-9 px-3.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition btn-press"
                      >
                        Unpublish / Flag
                      </button>
                    ) : (
                      <button
                        onClick={() => moderateJobStatus(job.id, 'open')}
                        className="h-9 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition btn-press"
                      >
                        Re-open Mission
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* USER MANAGEMENT VIEW */}
      {adminSubTab === 'users' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Students Directory */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-navy mb-3 font-display">Registered Student Profiles</h3>
            <div className="space-y-2.5">
              {allStudents.map(stud => (
                <div key={stud.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-fresh/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={stud.avatar} alt={stud.fullName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-navy text-xs sm:text-sm block font-display">{stud.fullName}</span>
                      <span className="text-[11px] text-slate-500">{stud.university} • {stud.academicLevel}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-tunisian font-display">{stud.totalEarnings} DT earned</span>
                    <button
                      onClick={() => toggleUserSuspension(stud.id, true)}
                      className={`h-8 px-3 rounded-xl text-xs font-bold transition btn-press ${
                        stud.isVerified
                          ? 'bg-slate-200 text-slate-700 hover:bg-red-100 hover:text-red-700'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {stud.isVerified ? 'Active (Suspend)' : 'Suspended (Reactivate)'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employers Directory */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-navy mb-3 font-display">Registered Enterprises</h3>
            <div className="space-y-2.5">
              {allEmployers.map(emp => (
                <div key={emp.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 hover:border-fresh/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={emp.logo} alt={emp.companyName} className="w-10 h-10 rounded-xl object-cover bg-white" />
                    <div>
                      <span className="font-bold text-navy text-xs sm:text-sm block font-display">{emp.companyName}</span>
                      <span className="text-[11px] text-slate-500">{emp.industry} • {emp.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-semibold text-navy font-display">{emp.totalSpent} DT spent</span>
                    <button
                      onClick={() => toggleUserSuspension(emp.id, false)}
                      className={`h-8 px-3 rounded-xl text-xs font-bold transition btn-press ${
                        emp.verificationStatus === 'verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {emp.verificationStatus === 'verified' ? 'Verified Account' : 'Pending Verification'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
