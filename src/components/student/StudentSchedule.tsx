import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const StudentSchedule: React.FC = () => {
  const {
    student,
    applications,
    jobs,
    setActivePassApplication,
    setIsMissionPassOpen,
    setActiveTab
  } = useApp();

  const [currentMonth, setCurrentMonth] = useState('November 2026');

  const confirmedMissions = applications
    .filter(a => a.studentId === student.id && (a.status === 'accepted' || a.status === 'completed'))
    .map(app => ({
      app,
      job: jobs.find(j => j.id === app.jobId)!
    }))
    .filter(item => item.job !== undefined);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="animate-fade-in-up rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-fresh mb-1 block font-display">
            Calendar & Shifts
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-display">
            My Mission Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep track of upcoming confirmed shifts, check in on site, and access your digital QR mission pass.
          </p>
        </div>
      </div>

      {/* Confirmed Missions Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy font-display flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-fresh" />
            <span>Confirmed Upcoming Shifts</span>
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            {confirmedMissions.length} active shift{confirmedMissions.length !== 1 ? 's' : ''}
          </span>
        </div>

        {confirmedMissions.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
            <p className="text-base font-bold text-navy font-display">No scheduled shifts yet.</p>
            <p className="text-xs text-slate-500">Apply for open missions to start earning on your own schedule!</p>
            <button
              onClick={() => setActiveTab('jobs')}
              className="h-10 px-5 rounded-xl bg-fresh hover:bg-fresh-600 text-white font-bold text-xs transition btn-press"
            >
              Browse Open Jobs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {confirmedMissions.map(({ app, job }, idx) => (
              <div
                key={app.id}
                className={`animate-fade-in-up delay-${Math.min((idx + 1) * 100, 400)} p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-fresh hover:shadow-soft transition-all duration-300 flex flex-col justify-between card-hover`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 font-display">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{app.status === 'completed' ? 'Completed' : 'Confirmed Shift'}</span>
                    </span>

                    <span className="text-xs font-bold text-tunisian font-display">
                      {job.totalPayment} DT Payout
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy mb-1 font-display">{job.title}</h3>
                  <p className="text-xs text-slate-500 mb-4">{job.companyName} • {job.city}</p>

                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-fresh shrink-0" />
                      <span className="font-semibold text-navy">Date:</span>
                      <span>{job.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sunny shrink-0" />
                      <span className="font-semibold text-navy">Hours:</span>
                      <span>{job.startTime} – {job.endTime} ({job.durationHours} hours)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-tunisian shrink-0" />
                      <span className="font-semibold text-navy">Venue:</span>
                      <span className="truncate">{job.address}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-2 border-t border-slate-100">
                  <div className="text-[11px] text-slate-400">
                    Pass code: <strong className="text-steel font-mono">{app.checkInCode || 'Not assigned yet'}</strong>
                  </div>

                  <button
                    onClick={() => {
                      setActivePassApplication(app);
                      setIsMissionPassOpen(true);
                    }}
                    className="h-10 px-4 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs flex items-center gap-1.5 transition-all duration-200 btn-press"
                  >
                    <QrCode className="w-4 h-4 text-sunny" />
                    <span>Launch Mission Pass</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Weekly Student Availability Matrix */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-navy font-display">My Weekly Free Slots</h3>
            <p className="text-xs text-slate-500">Employers look for matches against these recurring availability windows</p>
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="text-xs font-bold text-fresh hover:underline"
          >
            Edit in Profile
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {daysOfWeek.map(day => {
            const daySlot = student.availabilitySlots.find(s => s.day === day);
            const isAvailable = daySlot && daySlot.slots.length > 0;

            return (
              <div
                key={day}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 ${
                  isAvailable
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <span className="text-xs font-bold block mb-1.5 font-display">{day.substring(0, 3)}</span>
                {isAvailable ? (
                  <div className="space-y-1">
                    {daySlot.slots.map(s => (
                      <span
                        key={s}
                        className="block text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] italic">Busy (Classes)</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
