import React, { useState, useEffect } from 'react';
import { Clock, Briefcase, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Zap, Star } from 'lucide-react';

export const TimeOpportunitySignature: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex(prev => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative rounded-3xl overflow-hidden ${compact ? 'p-4' : 'p-6 sm:p-8'} bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-float transition-all hover:border-fresh/40`}>
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-56 h-56 bg-fresh/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-tunisian/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header Label */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-fresh animate-ping"></div>
          <span className="text-[11px] font-extrabold tracking-widest uppercase text-navy font-display">
            The GetBoth Synergy Engine
          </span>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blush text-steel border border-blush-300">
          Time + Opportunity = Both Win
        </span>
      </div>

      {/* Interactive 3-part layout: Student (Time) -> Animated Bridge -> Employer (Opportunity) */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
        
        {/* LEFT: Student Time Block (4 cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-fresh-50/30 transition-all space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-fresh flex items-center gap-1 font-display">
              <Clock className="w-3.5 h-3.5 text-fresh" />
              <span>Student Free Slot</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">Saturday</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Sarah"
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-fresh/30"
            />
            <div>
              <h4 className="text-xs font-bold text-navy">Sarah Ben Ali</h4>
              <p className="text-[10px] text-slate-500 font-medium">INSAT Engineering • 3rd Year</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px]">
            <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 font-bold text-steel">
              14:00 – 18:00 (4h)
            </span>
            <span className="text-emerald-600 font-bold flex items-center gap-1 text-[10px]">
              <CheckCircle2 className="w-3 h-3" /> Available
            </span>
          </div>
        </div>

        {/* CENTER: The Animated Connection Bridge (2 cols) */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-2 md:py-0">
          <div className="relative flex md:flex-col items-center justify-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              pulseIndex === 0 ? 'bg-fresh text-white shadow-glow-fresh scale-110' : 'bg-slate-100 text-slate-400'
            }`}>
              <Zap className="w-4 h-4" />
            </div>
            <div className="w-8 md:w-0.5 h-0.5 md:h-8 bg-gradient-to-r md:bg-gradient-to-b from-fresh via-tunisian to-sunny"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              pulseIndex === 1 ? 'bg-tunisian text-white shadow-glow-tunisian scale-110' : 'bg-slate-100 text-slate-400'
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* RIGHT: Company Opportunity Block (5 cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-navy text-white shadow-soft space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-sunny flex items-center gap-1 font-display">
              <Briefcase className="w-3.5 h-3.5 text-sunny" />
              <span>Paid Short Mission</span>
            </span>
            <span className="text-[10px] font-bold text-slate-300">Sousse</span>
          </div>

          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=200"
              alt="Pulse Events"
              className="w-10 h-10 rounded-xl object-cover bg-white p-0.5"
            />
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-white truncate">Pulse Events Tunisia</h4>
              <p className="text-[10px] text-slate-300 truncate">Tech Summit Assistant</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] border-t border-navy-700/60">
            <span className="text-slate-300 text-[10px]">Escrow Guaranteed:</span>
            <span className="px-2 py-0.5 rounded-md bg-tunisian text-white font-extrabold text-xs">
              48 DT Total
            </span>
          </div>
        </div>

      </div>

      {/* Micro-footer footer quote */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
        <span className="flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Instant Match: <strong>99.2% attendance rate</strong> with digital QR check-in</span>
        </span>
        <span className="text-steel font-bold">
          Slogan: <em className="text-navy">"Work flexible. Earn smarter. Grow together."</em>
        </span>
      </div>
    </div>
  );
};
