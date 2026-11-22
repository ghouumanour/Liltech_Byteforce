import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  FileText,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ApplyModal: React.FC = () => {
  const {
    selectedJobForApply,
    setSelectedJobForApply,
    student,
    applyToJob,
    setActiveTab
  } = useApp();

  const [coverNote, setCoverNote] = useState(
    `Hello! As an engineering student at ${student.university.split(' ')[0]}, I am excited about this mission. I am punctual, dedicated, and immediately available for this slot.`
  );
  const [attachCv, setAttachCv] = useState(true);
  const [confirmedSchedule, setConfirmedSchedule] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!selectedJobForApply) return null;

  const job = selectedJobForApply;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmedSchedule) {
      alert('Please confirm your availability for this date and time.');
      return;
    }

    const success = await applyToJob(job.id, coverNote, attachCv);
    if (success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedJobForApply(null);
        setActiveTab('applications');
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-float border border-slate-100 overflow-hidden animate-scale-in">
        
        {/* Header gradient */}
        <div className="h-3 bg-gradient-to-r from-fresh via-navy to-tunisian"></div>

        <button
          onClick={() => setSelectedJobForApply(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-navy hover:bg-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-navy font-display">Application Submitted! </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Your application for <strong>{job.title}</strong> has been delivered to {job.companyName}. You can track its status in My Applications.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-fresh font-display">
                  Step 2 of 2 • Fast Application
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy mt-0.5 font-display">
                  Apply for Mission
                </h3>
              </div>

              {/* Job preview card */}
              <div className="p-3.5 rounded-2xl bg-blush/40 border border-blush-200 flex items-start gap-3">
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-12 h-12 rounded-xl object-cover border border-white shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-navy leading-tight font-display">{job.title}</h4>
                  <p className="text-[11px] text-slate-500">{job.companyName} • {job.city}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-tunisian font-display">
                    <span>{job.hourlyRate} DT/hr</span>
                    <span>•</span>
                    <span>Total Est. Payout: {job.totalPayment} DT</span>
                  </div>
                </div>
              </div>

              {/* Mission Slot Confirmation */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-fresh shrink-0" />
                  <span className="font-semibold text-steel">Mission Date:</span>
                  <span>{job.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-sunny shrink-0" />
                  <span className="font-semibold text-steel">Working Hours:</span>
                  <span>{job.startTime} – {job.endTime} ({job.durationHours} hours)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-tunisian shrink-0" />
                  <span className="font-semibold text-steel">Location:</span>
                  <span className="truncate">{job.address}</span>
                </div>
              </div>

              {/* Cover note */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5 flex items-center justify-between">
                  <span>Introductory Message / Pitch</span>
                  <span className="text-[10px] font-normal text-slate-400">Keep it short & direct</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={coverNote}
                  onChange={e => setCoverNote(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 resize-none"
                  placeholder="Tell the employer why you're a great fit for this specific mission..."
                />
              </div>

              {/* CV Attachment Checkbox */}
              <div className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer flex items-center justify-between" onClick={() => setAttachCv(!attachCv)}>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-fresh" />
                  <div>
                    <span className="text-xs font-bold text-navy block font-display">Attach My Profile CV</span>
                    <span className="text-[10px] text-slate-500">{student.cvUrl || 'Student_CV.pdf'}</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={attachCv}
                  onChange={e => setAttachCv(e.target.checked)}
                  className="w-4 h-4 rounded text-navy focus:ring-fresh cursor-pointer"
                />
              </div>

              {/* Availability affirmation */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={confirmedSchedule}
                  onChange={e => setConfirmedSchedule(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-navy focus:ring-fresh cursor-pointer"
                />
                <span>
                  I confirm that I am 100% available at the specified date and time in {job.city} and understand the mission requirements.
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 btn-press"
              >
                <span>Confirm & Submit Application</span>
                <ArrowRight className="w-4 h-4 text-sunny" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
