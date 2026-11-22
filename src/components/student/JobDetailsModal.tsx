import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  DollarSign,
  Bookmark,
  Share2,
  Send,
  ShieldCheck,
  Star,
  Coffee,
  Car,
  AlertCircle,
  Briefcase
} from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const {
    selectedJobForDetails,
    setSelectedJobForDetails,
    setSelectedJobForApply,
    role,
    student,
    applications,
    bookmarkedJobIds,
    toggleBookmark,
    setChatPartner,
    setIsChatDrawerOpen,
    setIsAuthModalOpen
  } = useApp();

  if (!selectedJobForDetails) return null;

  const job = selectedJobForDetails;
  const isBookmarked = bookmarkedJobIds.includes(job.id);
  const existingApp = applications.find(a => a.jobId === job.id && a.studentId === student.id);
  const isApplied = !!existingApp;

  const handleApplyClick = () => {
    if (role === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedJobForDetails(null);
    setSelectedJobForApply(job);
  };

  const handleMessageEmployer = () => {
    if (role === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    setChatPartner({
      id: job.employerId,
      name: job.companyName,
      avatar: job.companyLogo,
      role: 'employer',
      jobId: job.id,
      jobTitle: job.title
    });
    setIsChatDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-float border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-scale-in">
        
        {/* Top brand header bar */}
        <div className="h-3 bg-gradient-to-r from-navy via-fresh to-tunisian"></div>

        <button
          onClick={() => setSelectedJobForDetails(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-navy hover:bg-slate-200 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Company & Title Header */}
          <div className="flex items-start gap-4">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-steel flex items-center gap-1">
                  {job.companyName}
                  {job.isCompanyVerified && (
                    <span title="Verified Employer">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 inline" />
                    </span>
                  )}
                </span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center text-xs font-semibold text-slate-600">
                  <Star className="w-3.5 h-3.5 text-sunny fill-sunny mr-1" />
                  <span>{job.employerRating}</span>
                </div>
                {job.urgency === 'urgent' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-tunisian-50 text-tunisian border border-tunisian-200 text-[10px] font-bold uppercase tracking-wider font-display">
 Urgent Mission
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-navy mt-1 leading-snug font-display">
                {job.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1 text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-tunisian" />
                  <span>{job.city} ({job.address})</span>
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-fresh" />
                  <span>{job.category}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-blush/30 rounded-2xl border border-blush-200 text-center">
            <div className="p-2">
              <span className="text-[11px] font-semibold text-slate-500 block">Hourly Rate</span>
              <span className="text-lg font-black text-tunisian font-display">
                {job.hourlyRate} <span className="text-xs font-bold">DT/hr</span>
              </span>
            </div>
            <div className="p-2 border-l border-blush-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Est. Pay</span>
              <span className="text-lg font-black text-navy font-display">
                {job.totalPayment} <span className="text-xs font-bold">DT</span>
              </span>
            </div>
            <div className="p-2 border-l border-blush-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Mission Date</span>
              <span className="text-sm font-bold text-steel block mt-0.5 font-display">
                {job.date}
              </span>
              <span className="text-[10px] text-slate-500">{job.startTime}–{job.endTime} ({job.durationHours}h)</span>
            </div>
            <div className="p-2 border-l border-blush-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Positions</span>
              <span className="text-sm font-bold text-steel block mt-0.5 font-display">
                {job.filledPositions} of {job.availablePositions} filled
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">
                {job.availablePositions - job.filledPositions} spots left
              </span>
            </div>
          </div>

          {/* Perks tags */}
          <div className="flex flex-wrap items-center gap-2">
            {job.mealProvided && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200">
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                <span>Meal / Refreshments Provided</span>
              </span>
            )}
            {job.transportProvided && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-fresh-50 text-navy text-xs font-semibold border border-fresh-200">
                <Car className="w-3.5 h-3.5 text-fresh" />
                <span>Transport Assistance Provided</span>
              </span>
            )}
            {job.attire && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                <span>Attire: {job.attire}</span>
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 font-display">
              Mission Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 font-display">
                Key Responsibilities
              </h4>
              <ul className="space-y-2">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 font-display">
                Student Requirements
              </h4>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-fresh shrink-0 mt-2"></span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          {job.requiredSkills && job.requiredSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 font-display">
                Required Skills & Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-slate-100 text-navy font-semibold text-xs border border-slate-200"
                  >
                    #{s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Security & Escrow Guarantee */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600">
              <span className="font-bold text-navy block font-display">GetBoth Student Payment Guarantee</span>
              All company funds for this mission ({job.totalPayment} DT) are safely held in escrow by GetBoth and released to your account upon mission checkout.
            </div>
          </div>
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleBookmark(job.id)}
              className={`p-3 rounded-2xl border transition-all ${
                isBookmarked
                  ? 'bg-fresh-50 border-fresh text-fresh'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
              } btn-press`}
              title={isBookmarked ? 'Remove Bookmark' : 'Save Job'}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-fresh' : ''}`} />
            </button>
            <button
              onClick={handleMessageEmployer}
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-navy hover:bg-slate-100 transition btn-press"
              title="Message Employer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {isApplied ? (
              <div className="h-11 sm:h-12 px-5 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm flex items-center gap-2 font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Applied ({existingApp?.status.toUpperCase()})</span>
              </div>
            ) : (
              <button
                onClick={handleApplyClick}
                className="h-11 sm:h-12 px-6 rounded-2xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 btn-press"
              >
                <span>Apply for this Mission</span>
                <span className="px-2 py-0.5 rounded bg-tunisian text-white text-xs font-semibold">
                  {job.totalPayment} DT
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
