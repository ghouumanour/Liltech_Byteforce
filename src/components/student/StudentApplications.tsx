import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Clock3,
  XCircle,
  QrCode,
  MessageSquare,
  Star,
  FileText,
  DollarSign,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const StudentApplications: React.FC = () => {
  const {
    student,
    applications,
    jobs,
    setActivePassApplication,
    setIsMissionPassOpen,
    setChatPartner,
    setIsChatDrawerOpen,
    setReviewTarget,
    setIsReviewModalOpen,
    setActiveTab
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');

  const myApplications = applications.filter(a => a.studentId === student.id);
  const filteredApps = myApplications.filter(a => {
    if (statusFilter === 'all') return true;
    return a.status === statusFilter;
  });

  const handleOpenChat = (jobId: string, companyName: string, companyLogo: string, employerId: string, jobTitle: string) => {
    setChatPartner({
      id: employerId,
      name: companyName,
      avatar: companyLogo,
      role: 'employer',
      jobId,
      jobTitle
    });
    setIsChatDrawerOpen(true);
  };

  const handleOpenReview = (jobId: string, jobTitle: string, employerId: string, companyName: string) => {
    setReviewTarget({
      jobId,
      jobTitle,
      toUserId: employerId,
      toUserName: companyName,
      toRole: 'employer'
    });
    setIsReviewModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="animate-fade-in-up rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-fresh mb-1 block font-display">
              Application Tracker
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-display">
              My Job Applications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track status, launch digital passes for accepted missions, and view escrow payouts.
            </p>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                statusFilter === 'all' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
              }`}
            >
              All ({myApplications.length})
            </button>
            <button
              onClick={() => setStatusFilter('accepted')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                statusFilter === 'accepted' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-emerald-700'
              }`}
            >
              Accepted ({myApplications.filter(a => a.status === 'accepted').length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                statusFilter === 'pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-amber-700'
              }`}
            >
              Pending ({myApplications.filter(a => a.status === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                statusFilter === 'completed' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
              }`}
            >
              Completed ({myApplications.filter(a => a.status === 'completed').length})
            </button>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
          <p className="text-base font-bold text-navy font-display">No applications in this category.</p>
          <p className="text-xs text-slate-500">Explore the jobs board to find exciting missions!</p>
          <button
            onClick={() => setActiveTab('jobs')}
            className="h-10 px-5 rounded-xl bg-fresh hover:bg-fresh-600 text-white font-bold text-xs transition btn-press"
          >
            Find Missions
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApps.map((app, idx) => {
            const job = jobs.find(j => j.id === app.jobId);
            if (!job) return null;

            return (
              <div
                key={app.id}
                className={`animate-fade-in-up delay-${Math.min((idx + 1) * 75, 400)} bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-fresh hover:shadow-soft transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 card-hover`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-100 shadow-xs shrink-0"
                  />
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-steel">{job.companyName}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500">{job.city}</span>
                      
                      {/* Status Tag */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 font-display ${
                          app.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : app.status === 'completed'
                            ? 'bg-fresh-100 text-navy border border-fresh-200'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {app.status === 'accepted' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {app.status === 'pending' && <Clock3 className="w-3.5 h-3.5 text-amber-600" />}
                        {app.status === 'rejected' && <XCircle className="w-3.5 h-3.5 text-red-600" />}
                        <span>Status: {app.status.toUpperCase()}</span>
                      </span>

                      {/* Escrow payout status */}
                      {app.payoutStatus === 'escrowed' && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>{job.totalPayment} DT in Escrow</span>
                        </span>
                      )}
                      {app.payoutStatus === 'released' && (
                        <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                          ✓ {job.totalPayment} DT Paid Out
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-navy leading-snug font-display">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-fresh" />
                        <span>{job.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sunny" />
                        <span>{job.startTime}–{job.endTime} ({job.durationHours} hrs)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-tunisian" />
                        <span>{job.address}</span>
                      </span>
                    </div>

                    {/* Cover note preview */}
                    {app.coverNote && (
                      <p className="text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-xl mt-2 line-clamp-2">
                        "{app.coverNote}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {app.status === 'accepted' && (
                    <>
                      <button
                        onClick={() => {
                          setActivePassApplication(app);
                          setIsMissionPassOpen(true);
                        }}
                        className="h-10 px-4 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all duration-200 btn-press"
                      >
                        <QrCode className="w-4 h-4 text-sunny" />
                        <span>Mission Pass</span>
                      </button>
                      <button
                        onClick={() => handleOpenChat(job.id, job.companyName, job.companyLogo, job.employerId, job.title)}
                        className="h-10 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-steel transition-colors btn-press flex items-center justify-center"
                        title="Chat with Employer"
                      >
                        <MessageSquare className="w-4 h-4 text-fresh" />
                      </button>
                    </>
                  )}

                  {app.status === 'completed' && (
                    <button
                      onClick={() => handleOpenReview(job.id, job.title, job.employerId, job.companyName)}
                      className="h-10 px-4 rounded-xl bg-sunny-50 hover:bg-sunny-100 text-navy border border-sunny-300 font-bold text-xs flex items-center gap-1.5 transition-colors btn-press"
                    >
                      <Star className="w-4 h-4 text-sunny-600 fill-sunny-600" />
                      <span>Leave Review</span>
                    </button>
                  )}

                  {app.status === 'pending' && (
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                      <span className="text-[11px] font-semibold text-amber-600">Awaiting Employer Review</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
