import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Briefcase, Search, Calendar, ShieldCheck, GraduationCap, Building, CheckCircle2 } from 'lucide-react';
import { TimeOpportunitySignature } from '../common/TimeOpportunitySignature';

export const LandingPage: React.FC = () => {
  const { setIsAuthModalOpen, setAuthModalMode } = useApp();
  return (
    <div className="landing-page">
      <section className="landing-hero relative pt-12 sm:pt-20 pb-16 overflow-hidden">
        {/* Ambient gradient orbs */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Col: Headings & Search (7 cols) */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blush text-steel border border-blush-300 text-xs font-bold uppercase tracking-wider shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className=" absolute inline-flex h-full w-full rounded-full bg-tunisian opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tunisian"></span>
                </span>
                <span className="font-display">Tunisia's Student Employment Marketplace</span>
              </div>

              {/* Main Headline */}
              <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-6xl lg:text-[72px] font-black text-navy tracking-tight leading-[1.04] font-display">
                The right talent. The right time.{' '}
                <span className="text-tunisian block sm:inline">
                  The right opportunity.
                </span>
              </h1>

              {/* Sub-slogan & Description */}
              <div className="animate-fade-in-up delay-200 space-y-2">
                <p className="text-lg sm:text-xl text-navy font-bold font-display">
                  Flexible work. Smarter hiring. Better together.
                </p>
                <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-xl">
                  Connecting ambitious students with businesses through flexible job opportunities that match their schedules, skills and hiring needs.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="h-12 sm:h-[52px] px-7 sm:px-8 rounded-2xl bg-navy hover:bg-navy-600 text-white shadow-soft transition-all duration-300  hover:shadow-float flex items-center gap-2.5 font-bold text-sm btn-press"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 text-sunny" />
                </button>

                <button
                  onClick={() => {
                    document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="h-12 sm:h-[52px] px-7 sm:px-8 rounded-2xl bg-white hover:bg-slate-50 text-navy border-2 border-slate-200 shadow-xs transition-all duration-300  hover:border-fresh hover:shadow-soft flex items-center gap-2.5 font-bold text-sm btn-press"
                >
                  <Briefcase className="w-4 h-4 text-tunisian" />
                  <span>Learn More</span>
                </button>
              </div>


            </div>
            <div className="lg:col-span-5 relative animate-fade-in delay-300 min-w-0">
              <TimeOpportunitySignature />
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="landing-band landing-band-1 scroll-mt-36"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian mb-2 block font-display animate-fade-in-up">
            Streamlined Marketplace
          </span>
          <h2 className="text-3xl sm:text-[40px] font-black text-navy tracking-tight font-display animate-fade-in-up delay-100">
            How getBoth Works for You
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 animate-fade-in-up delay-200">
            A simpler way for students and employers to connect, work together and grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Step 1 */}
          <div className="animate-fade-in-up delay-100 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-fresh hover:shadow-float transition-all duration-300 text-center space-y-4 group relative card-hover">
            <div className="absolute top-6 right-6 text-7xl font-black text-slate-100/60 font-display pointer-events-none select-none">01</div>
            <div className="w-16 h-16 rounded-2xl bg-fresh-50 text-fresh flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Search className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-fresh uppercase tracking-widest block font-display">Step 1</span>
            <h3 className="text-xl font-black text-navy font-display">Discover</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Students find jobs. Employers find talent.
            </p>
          </div>

          {/* Step 2 */}
          <div className="animate-fade-in-up delay-200 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-tunisian hover:shadow-float transition-all duration-300 text-center space-y-4 group relative card-hover">
            <div className="absolute top-6 right-6 text-7xl font-black text-slate-100/60 font-display pointer-events-none select-none">02</div>
            <div className="w-16 h-16 rounded-2xl bg-tunisian-50 text-tunisian flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Calendar className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-tunisian uppercase tracking-widest block font-display">Step 2</span>
            <h3 className="text-xl font-black text-navy font-display">Match</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Connect through matching skills and availability.
            </p>
          </div>

          {/* Step 3 */}
          <div className="animate-fade-in-up delay-300 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500 hover:shadow-float transition-all duration-300 text-center space-y-4 group relative card-hover">
            <div className="absolute top-6 right-6 text-7xl font-black text-slate-100/60 font-display pointer-events-none select-none">03</div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block font-display">Step 3</span>
            <h3 className="text-xl font-black text-navy font-display">Grow</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Students gain experience. Businesses build stronger teams.
            </p>
          </div>

        </div>
      </div></section>
      <section id="benefits" className="landing-band scroll-mt-36"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian font-display">Built for both</span>
          <h2 className="text-3xl sm:text-[40px] font-black text-navy tracking-tight font-display mt-2">Different needs. Shared success.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {[
            { title: 'For Students', subtitle: 'Your education. Your independence.', icon: GraduationCap, color: 'text-fresh', bg: 'bg-fresh-50', items: ['Work around your classes', 'Earn your own income', 'Build professional experience', 'Discover flexible opportunities'] },
            { title: 'For Employers', subtitle: 'The right people. When you need them.', icon: Building, color: 'text-tunisian', bg: 'bg-tunisian-50', items: ['Access motivated student talent', 'Find compatible availability', 'Simplify your recruitment', 'Build flexible teams'] }
          ].map(b => (
            <article key={b.title} className="bg-white border border-slate-200 p-7 sm:p-10 space-y-4 shadow-xs">
              <div className={`w-14 h-14 flex items-center justify-center ${b.bg} ${b.color}`}><b.icon className="w-7 h-7" /></div>
              <h3 className="text-2xl font-black text-navy font-display">{b.title}</h3>
              <p className="text-slate-600">{b.subtitle}</p>
              <ul className="space-y-3 pt-2">
                {b.items.map(item => <li key={item} className="flex items-center gap-3 text-sm text-steel"><CheckCircle2 className={`w-5 h-5 shrink-0 ${b.color}`} />{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div></section>

      <section className="landing-band" style={{ background: '#F4E9E7' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <span className="text-xs font-bold text-tunisian uppercase tracking-widest font-display">One platform. Two possibilities.</span>
          <h2 className="text-3xl sm:text-5xl font-black text-navy tracking-tight font-display">Never choose. Have both.</h2>
          <p className="text-sm sm:text-base text-steel leading-relaxed">Whether you're building your future or building your team, your next opportunity starts here.</p>
          <button onClick={() => { setAuthModalMode('signup'); setIsAuthModalOpen(true); }} className="inline-flex items-center gap-2 h-12 px-8 bg-navy hover:bg-navy-600 text-white font-bold text-sm transition-all btn-press">Join us <ArrowRight className="w-4 h-4" /></button>
        </div>
      </section>

    </div>
  );
};
