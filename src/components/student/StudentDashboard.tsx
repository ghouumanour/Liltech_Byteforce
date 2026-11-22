import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Send,
  CheckCircle2,
  Trophy,
  DollarSign,
  Star,
  Search,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  QrCode,
  ShieldCheck,
  TrendingUp,
  Bookmark,
  ChevronRight
} from 'lucide-react';
import { JobMission } from '../../types';
import { StudentEarningsChart } from './StudentEarningsChart';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    jobs,
    applications,
    reviews,
    setActiveTab,
    setSelectedJobForDetails,
    setSelectedJobForApply,
    setActivePassApplication,
    setIsMissionPassOpen,
    toggleBookmark,
    bookmarkedJobIds
  } = useApp();

  const myApplications = applications.filter(a => a.studentId === student.id);
  const acceptedApps = myApplications.filter(a => a.status === 'accepted');
  const completedApps = myApplications.filter(a => a.status === 'completed');
  const pendingApps = myApplications.filter(a => a.status === 'pending');

  const upcomingApp = acceptedApps[0];
  const upcomingJob = upcomingApp ? jobs.find(j => j.id === upcomingApp.jobId) : null;

  const recommendedJobs = jobs.filter(
    j => j.status === 'open' && (j.city === student.city || student.preferredCategories.includes(j.category))
  ).slice(0, 3);

  const recentJobs = [...jobs]
    .filter(j => j.status === 'open')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Student Welcome Banner */}
      <div className="animate-fade-in-up relative rounded-3xl bg-navy text-white p-6 sm:p-8 overflow-hidden shadow-soft">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fresh/15 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-tunisian/15 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <img
                src={student.avatar}
                alt={student.fullName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-fresh/30 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-fresh text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-fresh/20 text-fresh border border-fresh/30 text-xs font-bold uppercase tracking-wider font-display">
                  Verified Student Worker
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  {student.academicLevel} • {student.university.split(' ')[0]}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1.5 font-display">
                Hello, {student.fullName.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Ready for your next short-term opportunity? You have <strong className="text-sunny">{jobs.filter(j => j.status === 'open').length} active missions</strong> waiting in your region.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('jobs')}
              className="flex-1 sm:flex-none h-11 px-5 rounded-2xl bg-fresh hover:bg-fresh-600 text-white font-bold text-sm shadow-md transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 btn-press"
            >
              <Search className="w-4 h-4" />
              <span>Explore Missions</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="flex-1 sm:flex-none h-11 px-4 rounded-2xl bg-navy-600 hover:bg-navy-700 text-slate-200 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 border border-navy-500 btn-press"
            >
              <span>Edit Profile & CV</span>
            </button>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="mt-6 pt-5 border-t border-navy-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-medium">Profile Strength:</span>
            <div className="w-40 sm:w-56 h-2.5 bg-navy-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fresh to-sunny w-[92%] rounded-full transition-all duration-1000"></div>
            </div>
            <span className="font-bold text-sunny">92%</span>
          </div>
          <span className="text-slate-400 text-[11px]">
            CV attached • Phone verified • 8 Skills listed
          </span>
        </div>
      </div>

      {/* 6 Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {[
          { label: 'Available Jobs', value: jobs.filter(j => j.status === 'open').length, icon: Briefcase, iconBg: 'bg-fresh-50 text-fresh', trend: '+3 this week', trendColor: 'text-emerald-600', hoverBorder: 'hover:border-fresh', tab: 'jobs' },
          { label: 'Submitted', value: myApplications.length, icon: Send, iconBg: 'bg-slate-100 text-steel', trend: `${pendingApps.length} in review`, trendColor: 'text-slate-500', hoverBorder: 'hover:border-fresh', tab: 'applications' },
          { label: 'Accepted', value: acceptedApps.length, icon: CheckCircle2, iconBg: 'bg-emerald-50 text-emerald-600', trend: 'Ready to work', trendColor: 'text-emerald-700', hoverBorder: 'hover:border-emerald-500', tab: 'applications', valueColor: 'text-emerald-600' },
          { label: 'Completed', value: student.completedMissionsCount, icon: Trophy, iconBg: 'bg-blush text-tunisian', trend: '100% on-time', trendColor: 'text-slate-500', hoverBorder: 'hover:border-fresh', tab: 'schedule' },
          { label: 'Total Earnings', value: `${student.totalEarnings}`, icon: DollarSign, iconBg: 'bg-tunisian-50 text-tunisian', trend: '+60 DT this month', trendColor: 'text-emerald-600', hoverBorder: 'hover:border-tunisian', valueColor: 'text-tunisian', suffix: ' DT' },
          { label: 'Student Rating', value: student.rating, icon: Star, iconBg: 'bg-sunny-50 text-sunny-600', trend: `From ${student.reviewCount} employers`, trendColor: 'text-slate-500', hoverBorder: 'hover:border-sunny', suffix: ' / 5.0', fillIcon: true },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              onClick={() => card.tab && setActiveTab(card.tab)}
              className={`animate-fade-in-up delay-${(i + 1) * 100} p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs ${card.hoverBorder} hover:shadow-soft transition-all duration-300 cursor-pointer group card-hover`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500">{card.label}</span>
                <div className={`p-2 rounded-xl ${card.iconBg}`}>
                  <Icon className={`w-4 h-4 ${card.fillIcon ? 'fill-sunny' : ''}`} />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black ${card.valueColor || 'text-navy'} block font-display animate-count-up delay-${(i + 2) * 100}`}>
                  {card.value}
                </span>
                {card.suffix && <span className="text-xs font-bold text-slate-400">{card.suffix}</span>}
              </div>
              <span className={`text-[11px] ${card.trendColor} font-medium mt-1 inline-flex items-center gap-1`}>
                {card.trendColor === 'text-emerald-600' && <TrendingUp className="w-3 h-3" />}
                {card.trend}
              </span>
            </div>
          );
        })}
      </div>

      {/* Upcoming Confirmed Mission Banner */}
      {upcomingApp && upcomingJob && (
        <div className="animate-fade-in-up delay-200 p-6 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-2 border-emerald-200/80 shadow-soft animate-border-glow">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold text-[10px] uppercase tracking-wider font-display">
                    Upcoming Confirmed Mission
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    Escrow Guaranteed ({upcomingJob.totalPayment} DT)
                  </span>
                </div>
                <h3 className="text-lg font-black text-navy mt-1 font-display">
                  {upcomingJob.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                  <span className="font-semibold text-steel">{upcomingJob.companyName}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{upcomingJob.date} • {upcomingJob.startTime}–{upcomingJob.endTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-tunisian" />
                    <span>{upcomingJob.address}</span>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePassApplication(upcomingApp);
                setIsMissionPassOpen(true);
              }}
              className="h-11 px-5 rounded-2xl bg-navy hover:bg-navy-600 text-white font-bold text-sm shadow-md transition-all duration-300 flex items-center gap-2 shrink-0 hover:scale-[1.02] btn-press"
            >
              <QrCode className="w-4 h-4 text-sunny" />
              <span>Show Digital Mission Pass</span>
            </button>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recommended Missions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-navy tracking-tight flex items-center gap-2 font-display">
                <Sparkles className="w-5 h-5 text-tunisian" />
                <span>Recommended for You</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Missions matching your study field, location ({student.city}) and skills
              </p>
            </div>
            <button
              onClick={() => setActiveTab('jobs')}
              className="text-xs font-bold text-fresh hover:text-navy flex items-center gap-1 transition group"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3.5">
            {recommendedJobs.map((job, i) => {
              const isBookmarked = bookmarkedJobIds.includes(job.id);
              return (
                <div
                  key={job.id}
                  className={`animate-fade-in-up delay-${(i + 1) * 100} p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-fresh hover:shadow-float transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-steel flex items-center gap-1">
                          {job.companyName}
                          {job.isCompanyVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                          )}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-tunisian" />
                          {job.city}
                        </span>
                        {job.urgency === 'urgent' && (
                          <span className="px-1.5 py-0.5 rounded bg-tunisian-50 text-tunisian text-[10px] font-bold">
                            ⚡ Urgent
                          </span>
                        )}
                      </div>

                      <h3
                        onClick={() => setSelectedJobForDetails(job)}
                        className="text-sm sm:text-base font-bold text-navy hover:text-fresh cursor-pointer mt-0.5 transition font-display"
                      >
                        {job.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {job.date} ({job.durationHours} hrs)
                        </span>
                        <span className="text-emerald-700 font-semibold text-[11px]">
                          {job.availablePositions - job.filledPositions} spots open
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-base font-black text-tunisian block leading-none font-display">
                        {job.hourlyRate} <span className="text-xs font-bold">DT/hr</span>
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Total ~{job.totalPayment} DT
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleBookmark(job.id)}
                        className={`p-2.5 rounded-xl border transition-all duration-200 ${
                          isBookmarked ? 'bg-fresh-50 border-fresh text-fresh' : 'border-slate-200 text-slate-400 hover:text-navy'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-fresh' : ''}`} />
                      </button>
                      <button
                        onClick={() => setSelectedJobForDetails(job)}
                        className="h-10 px-4 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs shadow-xs transition-all duration-200 btn-press"
                      >
                        View & Apply
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recently Published */}
          <div className="pt-4">
            <h3 className="text-lg font-bold text-navy mb-4 font-display">Recently Published Missions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {recentJobs.map((job, i) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobForDetails(job)}
                  className={`animate-fade-in-up delay-${(i + 1) * 100} p-4 rounded-3xl bg-white border border-slate-200/80 hover:border-fresh hover:shadow-float transition-all duration-300 cursor-pointer flex flex-col justify-between card-hover`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-steel truncate max-w-[140px]">{job.companyName}</span>
                      <span className="text-tunisian font-bold font-display">{job.hourlyRate} DT/hr</span>
                    </div>
                    <h4 className="text-sm font-bold text-navy line-clamp-1 font-display">{job.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{job.description}</p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-tunisian" />
                      {job.city}
                    </span>
                    <span className="font-semibold text-navy">{job.totalPayment} DT Total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          <div className="animate-slide-in-right">
            <StudentEarningsChart />
          </div>

          {/* Applications Tracker */}
          <div className="animate-slide-in-right delay-200 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-navy text-sm font-display">Application Tracker</h3>
              <button
                onClick={() => setActiveTab('applications')}
                className="text-xs font-semibold text-fresh hover:underline"
              >
                View all ({myApplications.length})
              </button>
            </div>

            <div className="space-y-3">
              {myApplications.slice(0, 3).map(app => {
                const job = jobs.find(j => j.id === app.jobId);
                return (
                  <div key={app.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-fresh/40 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-navy line-clamp-1">
                        {job?.title || 'Mission'}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'accepted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'completed'
                            ? 'bg-fresh-100 text-navy'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {job?.companyName} • {job?.city}
                    </p>
                    {app.status === 'accepted' && (
                      <button
                        onClick={() => {
                          setActivePassApplication(app);
                          setIsMissionPassOpen(true);
                        }}
                        className="mt-2 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 btn-press"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Open Mission Pass</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          <div className="animate-slide-in-right delay-300 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy text-sm font-display">Recent Employer Feedback</h3>
              <div className="flex items-center text-xs font-bold text-sunny">
                <Star className="w-3.5 h-3.5 fill-sunny mr-1" />
                <span>{student.rating} / 5.0</span>
              </div>
            </div>

            <div className="space-y-3">
              {reviews.filter(r => r.toUserId === student.id).slice(0, 2).map(rev => (
                <div key={rev.id} className="p-3 rounded-2xl bg-blush/30 border border-blush-200 hover:border-blush-300 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-navy">{rev.fromUserName}</span>
                    <div className="flex text-sunny">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-sunny" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
