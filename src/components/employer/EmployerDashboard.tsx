import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  QrCode,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const EmployerDashboard: React.FC = () => {
  const {
    employer,
    jobs,
    applications,
    reviews,
    setIsPostJobModalOpen,
    setActiveTab,
    updateApplicationStatus,
    setChatPartner,
    setIsChatDrawerOpen,
    completeMissionAndPayout,
    setReviewTarget,
    setIsReviewModalOpen
  } = useApp();

  const myJobs = jobs.filter(j => j.employerId === employer.id);
  const openJobs = myJobs.filter(j => j.status === 'open');
  const myJobIds = myJobs.map(j => j.id);
  const myApplicants = applications.filter(a => myJobIds.includes(a.jobId));
  const pendingApplicants = myApplicants.filter(a => a.status === 'pending');
  const acceptedApplicants = myApplicants.filter(a => a.status === 'accepted');
  const completedApplicants = myApplicants.filter(a => a.status === 'completed');

  const handleOpenChat = (studentId: string, studentName: string, studentAvatar: string, jobId: string, jobTitle: string) => {
    setChatPartner({
      id: studentId,
      name: studentName,
      avatar: studentAvatar,
      role: 'student',
      jobId,
      jobTitle
    });
    setIsChatDrawerOpen(true);
  };

  const handleReviewStudent = (jobId: string, jobTitle: string, studentId: string, studentName: string) => {
    setReviewTarget({
      jobId,
      jobTitle,
      toUserId: studentId,
      toUserName: studentName,
      toRole: 'student'
    });
    setIsReviewModalOpen(true);
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Welcome & Quick Post Banner */}
      <div className="animate-fade-in-up relative rounded-3xl bg-navy text-white p-6 sm:p-8 overflow-hidden shadow-soft">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fresh/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-tunisian/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <img
              src={employer.logo}
              alt={employer.companyName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-fresh/30 shadow-md bg-white"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1 font-display">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Employer</span>
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  Matricule: {employer.registrationNumber}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 font-display">
                {employer.companyName}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Managing temporary student staff across Tunis, Sousse & Monastir. You have <strong className="text-sunny">{pendingApplicants.length} applicants</strong> awaiting your review.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="flex-1 sm:flex-none h-11 sm:h-12 px-5 sm:px-6 rounded-2xl bg-tunisian hover:bg-tunisian-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 btn-press"
            >
              <PlusCircle className="w-4 h-4 text-sunny" />
              <span>Post New Mission</span>
            </button>
            <button
              onClick={() => setActiveTab('applicants')}
              className="flex-1 sm:flex-none h-11 sm:h-12 px-4 sm:px-5 rounded-2xl bg-navy-600 hover:bg-navy-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 border border-navy-500 btn-press"
            >
              <span>Review Applicants ({pendingApplicants.length})</span>
            </button>
          </div>
        </div>

        {/* Quick status bar */}
        <div className="mt-6 pt-5 border-t border-navy-700/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-slate-300">
            <span>Industry: <strong className="text-white">{employer.industry}</strong></span>
            <span>City: <strong className="text-white">{employer.city}</strong></span>
          </div>
          <span className="text-sunny font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Escrow Protection: Active & Guaranteed</span>
          </span>
        </div>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* 1. Active Missions */}
        <div
          onClick={() => setActiveTab('my-jobs')}
          className="animate-fade-in-up delay-75 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-fresh hover:shadow-soft transition-all duration-300 cursor-pointer group card-hover"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-fresh transition mb-2">
            <span className="text-xs font-semibold text-slate-500">Active Missions</span>
            <div className="p-2 rounded-xl bg-fresh-50 text-fresh">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-navy block font-display animate-count-up">{openJobs.length}</span>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Live on marketplace</span>
        </div>

        {/* 2. Total Applicants */}
        <div
          onClick={() => setActiveTab('applicants')}
          className="animate-fade-in-up delay-150 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-tunisian hover:shadow-soft transition-all duration-300 cursor-pointer group card-hover"
        >
          <div className="flex items-center justify-between text-slate-400 group-hover:text-tunisian transition mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Applicants</span>
            <div className="p-2 rounded-xl bg-tunisian-50 text-tunisian">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-navy block font-display animate-count-up">{myApplicants.length}</span>
          <span className="text-[11px] text-tunisian font-bold mt-1 block">
            {pendingApplicants.length} pending review
          </span>
        </div>

        {/* 3. Missions in Progress */}
        <div className="animate-fade-in-up delay-200 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs group card-hover">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">In Progress</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-amber-600 block font-display animate-count-up">{acceptedApplicants.length}</span>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Students assigned</span>
        </div>

        {/* 4. Completed Missions */}
        <div className="animate-fade-in-up delay-300 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs group card-hover">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Completed</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-emerald-600 block font-display animate-count-up">{employer.completedMissionsCount}</span>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">Missions settled</span>
        </div>

        {/* 5. Total Spent */}
        <div className="animate-fade-in-up delay-400 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs group card-hover">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Spent</span>
            <div className="p-2 rounded-xl bg-slate-100 text-steel">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-navy block font-display animate-count-up">
            {employer.totalSpent} <span className="text-xs font-bold">DT</span>
          </span>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 block">Platform fee: 5%</span>
        </div>

        {/* 6. Company Rating */}
        <div className="animate-fade-in-up delay-500 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs group card-hover">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold text-slate-500">Employer Rating</span>
            <div className="p-2 rounded-xl bg-sunny-50 text-sunny-600">
              <Star className="w-4 h-4 fill-sunny" />
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-navy font-display">{employer.rating}</span>
            <span className="text-xs text-slate-400 font-bold">/ 5.0</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            From {employer.reviewCount} student ratings
          </span>
        </div>
      </div>

      {/* Two Columns: Active Mission Postings + Candidates Awaiting Decision */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Posted Missions (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-navy font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-fresh" />
              <span>Posted Missions</span>
            </h2>
            <button
              onClick={() => setIsPostJobModalOpen(true)}
              className="text-xs font-bold text-tunisian hover:text-tunisian-600 flex items-center gap-1.5 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Mission</span>
            </button>
          </div>

          <div className="space-y-4">
            {myJobs.map((job, idx) => {
              const jobApplicants = applications.filter(a => a.jobId === job.id);
              const jobPending = jobApplicants.filter(a => a.status === 'pending');

              return (
                <div
                  key={job.id}
                  className={`animate-fade-in-up delay-${Math.min((idx + 1) * 100, 500)} p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-fresh hover:shadow-soft transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card-hover`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-steel font-bold text-[10px] uppercase font-display">
                        {job.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-tunisian" />
                        {job.city}
                      </span>
                      {job.urgency === 'urgent' && (
                        <span className="px-2 py-0.5 rounded-full bg-tunisian-50 text-tunisian text-[10px] font-bold">
 Urgent
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-navy font-display">{job.title}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-fresh" />
                        {job.date} ({job.startTime}–{job.endTime})
                      </span>
                      <span className="font-bold text-tunisian font-display">
                        {job.hourlyRate} DT/hr (~{job.totalPayment} DT)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right text-xs">
                      <span className="font-bold text-navy block font-display">
                        {job.filledPositions} of {job.availablePositions} Hired
                      </span>
                      <span className="text-fresh font-semibold">
                        {jobPending.length} applicant{jobPending.length !== 1 ? 's' : ''} to review
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveTab('applicants')}
                      className="h-10 px-4 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs transition-all duration-200 btn-press"
                    >
                      Manage ({jobApplicants.length})
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Applicants Awaiting Review (1 col) */}
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-navy text-sm font-display">Candidates Awaiting Decision</h3>
              <span className="text-xs font-bold text-tunisian bg-tunisian-50 px-2.5 py-0.5 rounded-full font-display">
                {pendingApplicants.length} Pending
              </span>
            </div>

            {pendingApplicants.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center italic">
                All applicants have been reviewed!
              </p>
            ) : (
              <div className="space-y-3">
                {pendingApplicants.map(app => {
                  const job = jobs.find(j => j.id === app.jobId);
                  return (
                    <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 hover:border-fresh/40 transition-colors">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.studentAvatar}
                          alt={app.studentName}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-fresh/30"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-navy truncate font-display">{app.studentName}</h4>
                          <p className="text-[10px] text-slate-500 truncate">
                            {app.studentUniversity} • {app.studentField}
                          </p>
                          <div className="flex items-center text-[10px] font-bold text-sunny mt-0.5">
                            <Star className="w-3 h-3 fill-sunny mr-0.5" />
                            <span>{app.studentRating}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100">
                        <span className="font-semibold text-navy block text-[10px] text-slate-400 uppercase">Mission:</span>
                        <span className="font-bold text-navy line-clamp-1">{job?.title}</span>
                        {app.coverNote && <p className="italic text-slate-500 mt-1 line-clamp-2">"{app.coverNote}"</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => updateApplicationStatus(app.id, 'accepted')}
                          className="h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition btn-press"
                        >
                          Accept & Hire
                        </button>
                        <button
                          onClick={() => handleOpenChat(app.studentId, app.studentName, app.studentAvatar, app.jobId, job?.title || '')}
                          className="h-9 rounded-xl bg-white hover:bg-slate-100 text-steel border border-slate-200 font-bold text-xs transition btn-press"
                        >
                          Message
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Student Reviews on Company */}
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="font-bold text-navy text-sm font-display">Student Reviews & Ratings</h3>
            {reviews.filter(r => r.toUserId === employer.id).map(rev => (
              <div key={rev.id} className="p-3.5 rounded-2xl bg-blush/30 border border-blush-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy">{rev.fromUserName}</span>
                  <div className="flex text-sunny">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-sunny" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 mt-1 italic">"{rev.comment}"</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
