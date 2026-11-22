import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, activeTab, setAuthModalMode, setIsAuthModalOpen } = useApp();
  const navigate = (tab: string, section?: string) => {
    setActiveTab(tab);
    if (section) {
      if (activeTab !== 'browse') {
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        requestAnimationFrame(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      }
    } else window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const auth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 border-b border-navy-700/80">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white flex items-center justify-center p-1"><img src="/logo.png" alt="GetBoth" className="w-full h-full object-contain" /></div>
              <span className="text-2xl font-black tracking-tight">Get<span className="text-tunisian">Both</span></span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">Never choose. Have both.</p>
            <p className="text-xs text-slate-400">Connecting students and employers in Tunisia.</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sunny mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><button onClick={() => navigate('explore')} className="hover:text-white transition">Home</button></li>
              <li><button onClick={() => navigate('how-it-works', 'how-it-works')} className="hover:text-white transition">How It Works</button></li>
              <li><button onClick={() => navigate('explore', 'benefits')} className="hover:text-white transition">For Students &amp; Employers</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-sunny mb-4">Get Started</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><button onClick={() => auth('login')} className="hover:text-white transition">Log In</button></li>
              <li><button onClick={() => auth('signup')} className="hover:text-white transition">Join us</button></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 GetBoth. All rights reserved.</p>
          <p>Built for Tunisia 🇹🇳</p>
        </div>
      </div>
    </footer>
  );
};
