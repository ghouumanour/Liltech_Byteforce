import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setRole, setActiveTab } = useApp();

  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-navy-700/80">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-md">
                <img src="/logo.png" alt="GetBoth" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Get<span className="text-tunisian">Both</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your time. Your skills. Your opportunity.
              <br />
              <span className="text-slate-400">The premier digital student jobs & missions marketplace in Tunisia.</span>
            </p>
            <div className="flex items-center gap-1.5 text-xs text-sunny font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Escrow Guaranteed Payouts</span>
            </div>
          </div>

          {/* Students Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-fresh mb-4">
              For Students
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => { setRole('student'); setActiveTab('jobs'); }} className="hover:text-white transition">
                  Browse Short-Term Missions
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('student'); setActiveTab('profile'); }} className="hover:text-white transition">
                  Student Profile & CV
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('student'); setActiveTab('schedule'); }} className="hover:text-white transition">
                  Mission Digital Pass (QR)
                </button>
              </li>
              <li>
                <span className="text-slate-400">Flexible Hourly Rates (10–25 DT/hr)</span>
              </li>
            </ul>
          </div>

          {/* Employers Col */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-tunisian mb-4">
              For Employers & Startups
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button onClick={() => { setRole('employer'); setActiveTab('dashboard'); }} className="hover:text-white transition">
                  Post a Mission in 2 Minutes
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('employer'); setActiveTab('applicants'); }} className="hover:text-white transition">
                  Candidate Screening & Hires
                </button>
              </li>
              <li>
                <button onClick={() => { setRole('employer'); setActiveTab('company-profile'); }} className="hover:text-white transition">
                  KYC & Verification Badges
                </button>
              </li>
              <li>
                <span className="text-slate-400">Event Staff & Hospitality Support</span>
              </li>
            </ul>
          </div>

          {/* Coverage & Cities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sunny mb-4">
              University Cities
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {['Tunis', 'Sousse', 'Monastir', 'Sfax', 'Ariana', 'Nabeul', 'Bizerte'].map(city => (
                <span key={city} className="px-2.5 py-1 rounded-lg bg-navy-800 text-slate-300 border border-navy-700">
                  {city}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
              Empowering students from INSAT, ESPRIT, IHEC, FST, ENIT, and all major Tunisian universities.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 GetBoth Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with modern craftsmanship for Tunisian students</span>
            <span className="text-tunisian font-bold">🇹🇳</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
