import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  QrCode,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  Phone,
  ShieldCheck,
  Download,
  AlertCircle
} from 'lucide-react';

export const MissionPassModal: React.FC = () => {
  const {
    isMissionPassOpen,
    setIsMissionPassOpen,
    activePassApplication,
    jobs,
    checkInMission,
    student
  } = useApp();

  if (!isMissionPassOpen || !activePassApplication) return null;

  const app = activePassApplication;
  const job = jobs.find(j => j.id === app.jobId);

  if (!job) return null;

  const handleCheckIn = () => {
    checkInMission(app.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-float border border-slate-100 overflow-hidden animate-scale-in">
        
        {/* Pass Header */}
        <div className="bg-navy p-6 text-white text-center relative">
          <button
            onClick={() => setIsMissionPassOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-navy-600 hover:bg-navy-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-block px-3 py-1 rounded-full bg-fresh/20 text-fresh text-[10px] font-extrabold uppercase tracking-widest border border-fresh/30 mb-2 font-display">
            GetBoth Digital Mission Pass
          </span>

          <h3 className="text-lg sm:text-xl font-black text-white leading-tight font-display">
            {job.title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {job.companyName} • {job.city}
          </p>
        </div>

        {/* Pass Body */}
        <div className="p-6 space-y-5">
          
          {/* QR Code section */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
            {/* Visual SVG QR code representation */}
            <div className="w-36 h-36 bg-white p-3 rounded-2xl border-2 border-dashed border-slate-300 shadow-sm flex flex-col items-center justify-center relative">
              <svg viewBox="0 0 100 100" className="w-full h-full text-navy">
                <rect x="5" y="5" width="25" height="25" rx="3" fill="currentColor"/>
                <rect x="9" y="9" width="17" height="17" rx="2" fill="white"/>
                <rect x="13" y="13" width="9" height="9" fill="currentColor"/>

                <rect x="70" y="5" width="25" height="25" rx="3" fill="currentColor"/>
                <rect x="74" y="9" width="17" height="17" rx="2" fill="white"/>
                <rect x="78" y="13" width="9" height="9" fill="currentColor"/>

                <rect x="5" y="70" width="25" height="25" rx="3" fill="currentColor"/>
                <rect x="9" y="74" width="17" height="17" rx="2" fill="white"/>
                <rect x="13" y="78" width="9" height="9" fill="currentColor"/>

                <rect x="36" y="12" width="6" height="6" fill="#C73542"/>
                <rect x="46" y="8" width="6" height="12" fill="currentColor"/>
                <rect x="56" y="14" width="6" height="8" fill="#4B8FE8"/>

                <rect x="36" y="36" width="28" height="28" rx="2" fill="#02255E"/>
                <circle cx="50" cy="50" r="7" fill="#F5B942"/>

                <rect x="10" y="42" width="8" height="18" fill="currentColor"/>
                <rect x="75" y="40" width="12" height="6" fill="#C73542"/>
                <rect x="70" y="52" width="16" height="8" fill="currentColor"/>

                <rect x="36" y="72" width="12" height="18" fill="currentColor"/>
                <rect x="54" y="80" width="16" height="10" fill="#4B8FE8"/>
              </svg>
            </div>

            <div className="mt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-display">
                Verification Pass Code
              </span>
              <span className="text-xl font-black text-navy tracking-widest font-mono">
                {app.checkInCode || 'GB-8842'}
              </span>
            </div>

            <div className="mt-2.5">
              {app.checkedIn ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold font-display">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Checked In on Site</span>
                </span>
              ) : (
                <button
                  onClick={handleCheckIn}
                  className="h-10 px-5 rounded-xl bg-fresh hover:bg-fresh-600 text-white font-bold text-xs transition shadow-sm btn-press"
                >
                  Confirm Arrival / Check In Now
                </button>
              )}
            </div>
          </div>

          {/* Student & Shift Details */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Student Worker</span>
              <span className="font-bold text-navy font-display">{student.fullName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">University</span>
              <span className="font-semibold text-steel">{student.university.split(' ')[0]}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Date & Shift</span>
              <span className="font-bold text-navy font-display">{job.date} • {job.startTime}–{job.endTime}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Venue Address</span>
              <span className="font-semibold text-steel text-right max-w-[200px] truncate">{job.address}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Guaranteed Escrow Pay</span>
              <span className="font-black text-tunisian font-display text-sm">{job.totalPayment} DT</span>
            </div>
          </div>

          {/* Quick info note */}
          <div className="p-3 bg-blush/30 rounded-2xl border border-blush-200 text-[11px] text-slate-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Show this pass to the supervisor on arrival. After finishing your shift, the employer confirms completion to release payment.</span>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-steel font-bold text-xs flex items-center justify-center gap-2 transition btn-press"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save / Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
