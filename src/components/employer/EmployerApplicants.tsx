import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  MessageSquare,
  Star,
  FileText,
  DollarSign,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { ApplicationStatus } from '../../types';

export const EmployerApplicants: React.FC = () => {
  const {
    employer,
    jobs,
    applications,
    updateApplicationStatus,
    completeMissionAndPayout,
    setChatPartner,
    setIsChatDrawerOpen,
    setReviewTarget,
    setIsReviewModalOpen
  } = useApp();

  const [selectedJobId, setSelectedJobId] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');

  const myJobIds = jobs.filter(j => j.employerId === employer.id).map(j => j.id);
  const myApplicants = applications.filter(a => myJobIds.includes(a.jobId));

  const filteredApplicants = myApplicants.filter(app => {
    if (selectedJobId !== 'all' && app.jobId !== selectedJobId) return false;
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    return true;
  });

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
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="animate-fade-in-up rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian mb-1 block font-display">
              Recruitment & Hiring Pipeline
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-display">
              Manage Applicants & Hires
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Review student profiles, check CVs, confirm hires, and release escrow payouts after mission completion.
            </p>
          </div>

          {/* Mission Selector Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedJobId}
              onChange={e => setSelectedJobId(e.target.value)}
              className="text-xs sm:text-sm px-4 py-2.5 rounded-2xl border border-slate-200 bg-white font-semibold text-steel focus:outline-none focus:border-fresh cursor-pointer"
            >
              <option value="all">All Missions ({myJobIds.length})</option>
              {jobs.filter(j => j.employerId === employer.id).map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Pipeline Tabs */}
        <div className="mt-6 flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              statusFilter === 'all' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
            }`}
          >
            All Candidates ({myApplicants.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              statusFilter === 'pending' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-500 hover:text-amber-700'
            }`}
          >
            Pending Review ({myApplicants.filter(a => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('accepted')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              statusFilter === 'accepted' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-emerald-700'
            }`}
          >
            Hired / In Progress ({myApplicants.filter(a => a.status === 'accepted').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              statusFilter === 'completed' ? 'bg-white text-navy shadow-sm' : 'text-slate-500 hover:text-navy'
            }`}
          >
            Completed & Paid ({myApplicants.filter(a => a.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Candidates List */}
      {filteredApplicants.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-2">
          <p className="text-base font-bold text-navy font-display">No candidates found in this category.</p>
          <p className="text-xs text-slate-500">Post a new mission or widen your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplicants.map((app, idx) => {
            const job = jobs.find(j => j.id === app.jobId);
            if (!job) return null;

            return (
              <div
                key={app.id}
                className={`animate-fade-in-up delay-${Math.min((idx + 1) * 75, 400)} bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:border-fresh hover:shadow-soft transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 card-hover`}
              >
                {/* Candidate Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative shrink-0">
                    <img
                      src={app.studentAvatar}
                      alt={app.studentName}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-fresh/30 shadow-xs"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-sunny flex items-center shadow-xs">
                      ★ {app.studentRating}
                    </span>
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-navy font-display">{app.studentName}</h3>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">
                        {app.studentUniversity} ({app.studentField})
                      </span>
                      
                      {/* Status Tag */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-display ${
                          app.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'completed'
                            ? 'bg-fresh-100 text-navy'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>

                      {app.checkedIn && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>On Site (Checked In)</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-steel">
                      Applied for: <span className="text-navy font-bold">{job.title}</span> ({job.date} • {job.startTime}–{job.endTime})
                    </p>

                    {/* Cover note */}
                    {app.coverNote && (
                      <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl italic">
                        "{app.coverNote}"
                      </p>
                    )}

                    {/* CV download simulation */}
                    {app.cvAttached && (
                      <div className="flex items-center gap-2 text-xs">
                        <FileText className="w-3.5 h-3.5 text-fresh" />
                        <span className="font-semibold text-slate-700">{app.cvFileName || 'CV_Student.pdf'}</span>
                        <a
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            alert(`Downloading student CV: ${app.cvFileName || 'CV_Student.pdf'}`);
                          }}
                          className="text-[11px] font-bold text-fresh hover:underline"
                        >
                          (Download CV)
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Candidate Action Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {app.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'accepted')}
                        className="h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs btn-press"
                      >
                        Accept & Hire ({job.totalPayment} DT)
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        className="h-10 px-3.5 rounded-xl border border-slate-200 text-slate-500 hover:text-tunisian hover:bg-slate-50 font-bold text-xs transition btn-press"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => handleOpenChat(app.studentId, app.studentName, app.studentAvatar, job.id, job.title)}
                        className="h-10 p-2.5 rounded-xl border border-slate-200 text-steel hover:bg-slate-50 transition btn-press flex items-center justify-center"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4 text-fresh" />
                      </button>
                    </>
                  )}

                  {app.status === 'accepted' && (
                    <>
                      <button
                        onClick={() => completeMissionAndPayout(app.id)}
                        className="h-10 px-4 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs transition shadow-sm flex items-center gap-1.5 btn-press"
                      >
                        <DollarSign className="w-4 h-4 text-sunny" />
                        <span>Confirm Mission & Release {job.totalPayment} DT</span>
                      </button>
                      <button
                        onClick={() => handleOpenChat(app.studentId, app.studentName, app.studentAvatar, job.id, job.title)}
                        className="h-10 p-2.5 rounded-xl border border-slate-200 text-steel hover:bg-slate-50 transition btn-press flex items-center justify-center"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4 text-fresh" />
                      </button>
                    </>
                  )}

                  {app.status === 'completed' && (
                    <>
                      <div className="text-right text-xs">
                        <span className="font-bold text-emerald-600 block">✓ Payment Released</span>
                        <span className="text-[10px] text-slate-400">Escrow Settled</span>
                      </div>
                      <button
                        onClick={() => handleReviewStudent(job.id, job.title, app.studentId, app.studentName)}
                        className="h-10 px-3.5 rounded-xl bg-sunny-50 hover:bg-sunny-100 text-navy border border-sunny-300 font-bold text-xs flex items-center gap-1 transition btn-press"
                      >
                        <Star className="w-3.5 h-3.5 fill-sunny-600 text-sunny-600" />
                        <span>Rate Student</span>
                      </button>
                    </>
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
