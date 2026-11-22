import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Briefcase,
  TrendingUp,
  DollarSign,
  Coffee,
  ChevronRight,
  Building,
  GraduationCap,
  UtensilsCrossed,
  Megaphone,
  Camera,
  Headphones,
  Truck,
  Palette,
  PartyPopper,
  BookOpen,
  Heart,
  Globe,
  Rocket,
  Award,
  MessageCircle,
  Phone
} from 'lucide-react';
import { CATEGORIES, CITIES } from '../../data/mockData';
import { TimeOpportunitySignature } from '../common/TimeOpportunitySignature';

const CATEGORY_DATA = [
  { name: 'Event & Hospitality', icon: PartyPopper, count: 24, color: 'fresh' },
  { name: 'Restaurant & Catering', icon: UtensilsCrossed, count: 18, color: 'tunisian' },
  { name: 'Sales & Promotion', icon: Megaphone, count: 15, color: 'sunny' },
  { name: 'Tutoring & Education', icon: GraduationCap, count: 12, color: 'fresh' },
  { name: 'Photography & Media', icon: Camera, count: 9, color: 'tunisian' },
  { name: 'Tech & IT Support', icon: Headphones, count: 11, color: 'navy' },
  { name: 'Logistics & Delivery', icon: Truck, count: 8, color: 'steel' },
  { name: 'Creative & Design', icon: Palette, count: 6, color: 'sunny' },
];

export const LandingPage: React.FC = () => {
  const {
    jobs,
    setRole,
    setActiveTab,
    filter,
    setFilter,
    setSelectedJobForDetails,
    setIsAuthModalOpen,
    setAuthModalMode
  } = useApp();

  const [benefitTab, setBenefitTab] = useState<'students' | 'employers'>('students');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('student');
    setActiveTab('jobs');
  };

  const featuredMissions = jobs.slice(0, 3);

  return (
    <div className="space-y-28 pb-24">
      
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION — Premium composition with floating elements
         ═══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-8 sm:pt-16 pb-10 overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-fresh/8 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blush/70 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-sunny/5 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Col: Headings & Search (7 cols) */}
            <div className="lg:col-span-7 space-y-7 text-left">
              
              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blush text-steel border border-blush-300 text-xs font-bold uppercase tracking-wider shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tunisian opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tunisian"></span>
                </span>
                <span className="font-display">Tunisia's Premier Student Jobs Marketplace</span>
              </div>

              {/* Main Headline */}
              <h1 className="animate-fade-in-up delay-100 text-4xl sm:text-6xl lg:text-[72px] font-black text-navy tracking-tight leading-[1.04] font-display">
                Your time. Your skills.{' '}
                <span className="bg-gradient-to-r from-tunisian via-fresh to-navy bg-clip-text text-transparent block sm:inline">
                  Your opportunity.
                </span>
              </h1>

              {/* Sub-slogan & Description */}
              <div className="animate-fade-in-up delay-200 space-y-2">
                <p className="text-lg sm:text-xl text-navy font-bold font-display">
                  Work flexible. Earn smarter. Grow together.
                </p>
                <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-xl">
                  Connecting motivated university students with top Tunisian enterprises for paid short-term missions matching their schedules and financial goals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="animate-fade-in-up delay-300 flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    setRole('student');
                    setActiveTab('jobs');
                  }}
                  className="h-12 sm:h-[52px] px-7 sm:px-8 rounded-2xl bg-navy hover:bg-navy-600 text-white shadow-soft transition-all duration-300 hover:scale-[1.03] hover:shadow-float flex items-center gap-2.5 font-bold text-sm btn-press"
                >
                  <span>Find a Job</span>
                  <ArrowRight className="w-4 h-4 text-sunny" />
                </button>

                <button
                  onClick={() => {
                    setRole('employer');
                    setActiveTab('dashboard');
                  }}
                  className="h-12 sm:h-[52px] px-7 sm:px-8 rounded-2xl bg-white hover:bg-slate-50 text-navy border-2 border-slate-200 shadow-xs transition-all duration-300 hover:scale-[1.03] hover:border-fresh hover:shadow-soft flex items-center gap-2.5 font-bold text-sm btn-press"
                >
                  <Briefcase className="w-4 h-4 text-tunisian" />
                  <span>Post a Mission</span>
                </button>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleHeroSearch} className="animate-fade-in-up delay-400 mt-2 p-2 sm:p-2.5 rounded-3xl bg-white shadow-float border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2 max-w-xl hover:shadow-[0_24px_56px_-16px_rgba(2,37,94,0.16)] transition-shadow duration-500">
                <div className="flex-1 flex items-center gap-2 px-3 w-full">
                  <Search className="w-5 h-5 text-fresh shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by mission (Event, Hostess, Tutor)..."
                    value={filter.search}
                    onChange={e => setFilter({ ...filter, search: e.target.value })}
                    className="w-full text-sm py-3 bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 pl-0 sm:pl-2">
                  <select
                    value={filter.city}
                    onChange={e => setFilter({ ...filter, city: e.target.value })}
                    className="text-xs py-2 px-2 rounded-xl bg-transparent font-semibold text-steel focus:outline-none cursor-pointer"
                  >
                    {CITIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>

                  <button
                    type="submit"
                    className="w-full sm:w-auto h-11 px-6 rounded-2xl bg-fresh hover:bg-fresh-600 text-white font-bold text-sm shadow-sm transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-1.5 shrink-0 btn-press"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

            </div>

            {/* Right Col: Creative Visual Composition (5 cols) */}
            <div className="lg:col-span-5 relative animate-fade-in delay-300">
              
              {/* Special Time + Opportunity Signature Widget */}
              <TimeOpportunitySignature />

              {/* Floating Badge: Escrow Protected */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 p-3.5 rounded-2xl bg-white shadow-float border border-slate-200/80 flex items-center gap-3 animate-float-slow shadow-soft z-20">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block font-display">Trust Guarantee</span>
                  <span className="text-xs font-black text-navy block">100% Escrow Protected Payouts</span>
                </div>
              </div>

              {/* Floating Badge: Student Rating */}
              <div className="absolute -top-6 -right-2 sm:-right-4 p-3 rounded-2xl bg-navy text-white shadow-float border border-navy-700 flex items-center gap-2.5 z-20 animate-float delay-500">
                <div className="w-8 h-8 rounded-lg bg-tunisian text-white flex items-center justify-center font-bold text-xs">
                  ★ 4.9
                </div>
                <div>
                  <span className="text-[10px] text-slate-300 block">Student Satisfaction</span>
                  <span className="text-xs font-bold text-sunny">Verified Experience</span>
                </div>
              </div>

            </div>

          </div>

          {/* Trust Metrics Row */}
          <div className="mt-20 pt-10 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { value: '1,400+', label: 'Completed Student Missions', color: 'text-navy' },
              { value: '350+', label: 'Verified Tunisian Enterprises', color: 'text-tunisian' },
              { value: '10–25 DT', label: 'Average Hourly Rate', color: 'text-fresh' },
              { value: '100%', label: 'Guaranteed Escrow Payouts', color: 'text-emerald-600' },
            ].map((stat, i) => (
              <div key={stat.label} className={`animate-fade-in-up delay-${(i + 1) * 100} p-5 rounded-2xl bg-white border border-slate-100 shadow-xs text-center card-hover`}>
                <span className={`text-3xl sm:text-4xl font-black ${stat.color} block font-display animate-count-up delay-${(i + 2) * 100}`}>
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 font-semibold mt-1.5 block">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. HOW IT WORKS — 3-step process
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian mb-2 block font-display animate-fade-in-up">
            Streamlined Marketplace
          </span>
          <h2 className="text-3xl sm:text-[40px] font-black text-navy tracking-tight font-display animate-fade-in-up delay-100">
            How GetBoth Works
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 animate-fade-in-up delay-200">
            No endless interviews or unpaid trials. Short-term missions with instant digital pass check-in.
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
            <h3 className="text-xl font-black text-navy font-display">Discover & 1-Click Apply</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explore missions by city, hourly rate in DT, and category. Apply in 10 seconds with your student profile and CV.
            </p>
          </div>

          {/* Step 2 */}
          <div className="animate-fade-in-up delay-200 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-tunisian hover:shadow-float transition-all duration-300 text-center space-y-4 group relative card-hover">
            <div className="absolute top-6 right-6 text-7xl font-black text-slate-100/60 font-display pointer-events-none select-none">02</div>
            <div className="w-16 h-16 rounded-2xl bg-tunisian-50 text-tunisian flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <Calendar className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-tunisian uppercase tracking-widest block font-display">Step 2</span>
            <h3 className="text-xl font-black text-navy font-display">Get Hired & Digital Pass</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              When hired, you receive an interactive Digital Mission Pass with a QR check-in code. Payment is secured in escrow.
            </p>
          </div>

          {/* Step 3 */}
          <div className="animate-fade-in-up delay-300 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-emerald-500 hover:shadow-float transition-all duration-300 text-center space-y-4 group relative card-hover">
            <div className="absolute top-6 right-6 text-7xl font-black text-slate-100/60 font-display pointer-events-none select-none">03</div>
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform duration-300 relative z-10">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block font-display">Step 3</span>
            <h3 className="text-xl font-black text-navy font-display">Complete & Earn Instantly</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Finish your shift, employer confirms completion, and earnings are credited directly. Rate each other and build reputation.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. POPULAR JOB CATEGORIES — 8-card grid
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian mb-2 block font-display">
            Explore by Category
          </span>
          <h2 className="text-3xl sm:text-[40px] font-black text-navy tracking-tight font-display">
            Popular Job Categories
          </h2>
          <p className="text-sm text-slate-500 mt-3">
            Browse opportunities across Tunisia's fastest-growing sectors for student employment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORY_DATA.map((cat, i) => {
            const Icon = cat.icon;
            const bgColors: Record<string, string> = {
              fresh: 'bg-fresh-50 text-fresh group-hover:bg-fresh group-hover:text-white',
              tunisian: 'bg-tunisian-50 text-tunisian group-hover:bg-tunisian group-hover:text-white',
              sunny: 'bg-sunny-50 text-sunny-600 group-hover:bg-sunny group-hover:text-white',
              navy: 'bg-navy-50 text-navy group-hover:bg-navy group-hover:text-white',
              steel: 'bg-slate-100 text-steel group-hover:bg-steel group-hover:text-white',
            };
            return (
              <div
                key={cat.name}
                onClick={() => {
                  setRole('student');
                  setActiveTab('jobs');
                }}
                className={`animate-fade-in-up delay-${Math.min((i + 1) * 100, 800)} p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-fresh hover:shadow-float transition-all duration-300 cursor-pointer text-center group card-hover`}
              >
                <div className={`w-14 h-14 rounded-xl ${bgColors[cat.color] || bgColors.fresh} flex items-center justify-center mx-auto shadow-sm transition-all duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-navy mt-3 font-display group-hover:text-fresh transition-colors">
                  {cat.name}
                </h4>
                <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold">
                  {cat.count} jobs
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. FEATURED LIVE OPPORTUNITIES — 3 mission cards
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-fresh mb-1.5 block font-display">
              Live On Marketplace
            </span>
            <h2 className="text-2xl sm:text-[36px] font-black text-navy tracking-tight font-display">
              Featured Opportunities in Tunisia
            </h2>
          </div>
          <button
            onClick={() => {
              setRole('student');
              setActiveTab('jobs');
            }}
            className="text-sm font-bold text-fresh hover:text-navy flex items-center gap-1.5 transition group"
          >
            <span>View All {jobs.length} Missions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMissions.map((job, i) => (
            <div
              key={job.id}
              onClick={() => setSelectedJobForDetails(job)}
              className={`animate-fade-in-up delay-${(i + 1) * 100} p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-float hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="img-hover-zoom rounded-xl">
                      <img src={job.companyLogo} alt={job.companyName} className="w-10 h-10 rounded-xl object-cover" />
                    </div>
                    <span className="text-xs font-bold text-steel truncate max-w-[130px]">
                      {job.companyName}
                    </span>
                  </div>
                  <span className="text-tunisian font-black text-base font-display">
                    {job.hourlyRate} <span className="text-xs font-bold">DT/hr</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-navy group-hover:text-fresh transition-colors line-clamp-2 font-display">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed">{job.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-steel">
                  <MapPin className="w-3.5 h-3.5 text-tunisian" />
                  {job.city}
                </span>
                <span className="font-bold text-navy font-display">
                  {job.totalPayment} DT Total ({job.durationHours}h)
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. DUAL BENEFITS — Students vs Employers toggle
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-4xl bg-blush/40 border border-blush-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian font-display">
                Tailored Advantages
              </span>
              <h2 className="text-2xl sm:text-[36px] font-black text-navy font-display mt-1">
                Why Tunisia Chooses GetBoth
              </h2>
            </div>

            {/* Toggle Tabs */}
            <div className="flex p-1.5 bg-white rounded-2xl shadow-xs border border-slate-200">
              <button
                onClick={() => setBenefitTab('students')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  benefitTab === 'students' ? 'bg-navy text-white shadow-md' : 'text-slate-600 hover:text-navy'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>For Students</span>
              </button>
              <button
                onClick={() => setBenefitTab('employers')}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  benefitTab === 'employers' ? 'bg-navy text-white shadow-md' : 'text-slate-600 hover:text-navy'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>For Employers</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {benefitTab === 'students' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {[
                { num: '01', icon: Clock, title: 'Full Academic Flexibility', desc: 'Only accept missions when you are free. No conflicts with exams, TD sessions, or revision periods.', iconBg: 'bg-fresh-50 text-fresh' },
                { num: '02', icon: ShieldCheck, title: 'Escrow Payment Guarantee', desc: 'Funds are secured before the shift begins. Your hourly wage is deposited directly upon mission checkout.', iconBg: 'bg-emerald-50 text-emerald-600' },
                { num: '03', icon: Award, title: 'Verified CV Portfolio', desc: 'Every mission adds authentic recommendations and verified ratings to your permanent digital profile.', iconBg: 'bg-sunny-50 text-sunny-600' },
              ].map((b, i) => (
                <div key={b.title} className={`animate-fade-in-up delay-${(i + 1) * 100} p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 card-hover`}>
                  <div className={`w-12 h-12 rounded-xl ${b.iconBg} flex items-center justify-center`}>
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-navy text-base font-display">{b.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
              {[
                { num: '01', icon: Zap, title: 'Instant Temporary Staffing', desc: 'Post emergency shifts for events, catering, or promotions and receive motivated student applications in minutes.', iconBg: 'bg-tunisian-50 text-tunisian' },
                { num: '02', icon: Users, title: 'Verified Student Talent', desc: 'Filter by university (INSAT, ESPRIT, IHEC), language fluency, GPA level, and ratings from other companies.', iconBg: 'bg-fresh-50 text-fresh' },
                { num: '03', icon: DollarSign, title: 'Zero Payroll Overhead', desc: 'No complex long-term labor contracts. Pay only for the exact hours worked via automated platform settlement.', iconBg: 'bg-emerald-50 text-emerald-600' },
              ].map((b, i) => (
                <div key={b.title} className={`animate-fade-in-up delay-${(i + 1) * 100} p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 card-hover`}>
                  <div className={`w-12 h-12 rounded-xl ${b.iconBg} flex items-center justify-center`}>
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-navy text-base font-display">{b.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. ABOUT GETBOTH — Brand story section
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-4xl bg-white border border-slate-200/80 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left — Story */}
            <div className="space-y-6 animate-fade-in-up">
              <span className="text-xs font-extrabold uppercase tracking-widest text-fresh block font-display">
                About Us
              </span>
              <h2 className="text-2xl sm:text-[36px] font-black text-navy tracking-tight leading-tight font-display">
                Built for Tunisia's<br />Student Workforce
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                GetBoth was born from a simple observation: Tunisian university students need flexible income opportunities that respect their academic schedules, while local businesses struggle to find reliable short-term workers for events, services, and projects.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                We bridge this gap with a modern digital marketplace built on trust, transparency, and speed. Every mission is escrow-protected, every student is verified, and every employer is KYC-approved. GetBoth isn't just a job board — it's a community where both sides grow together.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 border border-slate-200 shadow-xs flex items-center justify-center shrink-0">
                  <img src="/logo.png" alt="GetBoth Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-lg font-black text-navy font-display">Get<span className="text-tunisian">Both</span></span>
                  <p className="text-xs text-slate-500 font-medium">Your time. Your skills. Your opportunity.</p>
                </div>
              </div>
            </div>

            {/* Right — Stats grid */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
              {[
                { icon: Rocket, label: 'Founded', value: '2024', bg: 'bg-fresh-50', iconColor: 'text-fresh' },
                { icon: Globe, label: 'Active In', value: '10+ Cities', bg: 'bg-tunisian-50', iconColor: 'text-tunisian' },
                { icon: Heart, label: 'Student Cost', value: 'Zero Fees', bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
                { icon: Phone, label: 'Support', value: '24/7', bg: 'bg-sunny-50', iconColor: 'text-sunny-600' },
              ].map((stat, i) => (
                <div key={stat.label} className={`animate-scale-in delay-${(i + 2) * 100} p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center card-hover`}>
                  <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.iconColor} flex items-center justify-center mx-auto mb-3`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xl font-black text-navy block font-display">{stat.value}</span>
                  <span className="text-xs text-slate-500 font-semibold mt-0.5 block">{stat.label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. VERIFIED TESTIMONIALS — 2 cards
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-fresh mb-2 block font-display">
            Community Stories
          </span>
          <h2 className="text-3xl sm:text-[40px] font-black text-navy tracking-tight font-display">
            Trusted by Tunisian Students & Companies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="animate-fade-in-up delay-100 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-5 card-hover">
            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Student"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-fresh/30"
              />
              <div>
                <h4 className="font-bold text-navy text-sm font-display">Sarah Ben Ali</h4>
                <p className="text-xs text-slate-500">INSAT Engineering Student (Tunis)</p>
                <div className="flex text-sunny mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-sunny" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              "GetBoth made it possible to earn 840 DT during my free weekends doing event hosting and promotional missions in Sousse and Tunis. Payout is immediate and stress-free!"
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold">Verified Student • 8 missions completed</span>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-5 card-hover">
            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=200"
                alt="Employer"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-tunisian/30 bg-white p-0.5"
              />
              <div>
                <h4 className="font-bold text-navy text-sm font-display">Karim Mansour</h4>
                <p className="text-xs text-slate-500">Director, Pulse Events Tunisia</p>
                <div className="flex text-sunny mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-sunny" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              "We frequently organize tech conferences in Tunis and Sousse. Finding 10 bilingual, energetic students used to take days. With GetBoth, we fill our missions in under 3 hours."
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold">Verified Employer • 42 missions posted</span>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          8. FINAL CTA BANNER — Premium gradient
         ═══════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-4xl bg-gradient-to-br from-navy via-navy-600 to-steel text-white text-center space-y-6 relative overflow-hidden shadow-float">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fresh/20 rounded-full blur-[80px] pointer-events-none animate-float-slow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-tunisian/15 rounded-full blur-[80px] pointer-events-none animate-float delay-500"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs font-bold text-sunny uppercase tracking-widest font-display">
              Start Now — 100% Free Registration
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-display">
              Ready to GetBoth?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
              Whether you want to earn money as a student or hire verified youth talent for your next event, GetBoth connects you seamlessly.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setRole('student');
                  setActiveTab('jobs');
                }}
                className="h-12 sm:h-[52px] px-8 rounded-2xl bg-fresh hover:bg-fresh-600 text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.03] btn-press"
              >
                Sign Up as a Student
              </button>
              <button
                onClick={() => {
                  setRole('employer');
                  setActiveTab('dashboard');
                }}
                className="h-12 sm:h-[52px] px-8 rounded-2xl bg-tunisian hover:bg-tunisian-600 text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.03] btn-press"
              >
                Sign Up as an Employer
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
