import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Clock,
  Calendar,
  Users,
  ShieldCheck,
  Star,
  Bookmark,
  Sparkles,
  SlidersHorizontal,
  X,
  ArrowRight,
  Coffee,
  Car
} from 'lucide-react';
import { CATEGORIES, CITIES } from '../../data/mockData';
import { JobMission } from '../../types';

export const JobDiscovery: React.FC = () => {
  const {
    jobs,
    filter,
    setFilter,
    resetFilter,
    setSelectedJobForDetails,
    setSelectedJobForApply,
    bookmarkedJobIds,
    toggleBookmark,
    applications,
    student,
    role,
    setIsAuthModalOpen
  } = useApp();

  const [showFiltersDrawer, setShowFiltersDrawer] = useState(false);

  // Filter and sort jobs
  const filteredJobs = jobs.filter(job => {
    if (job.status !== 'open') return false;

    // Search query
    if (filter.search.trim()) {
      const q = filter.search.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.companyName.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      const matchSkills = job.requiredSkills.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchDesc && !matchSkills) return false;
    }

    // Category
    if (filter.category !== 'All Categories' && job.category !== filter.category) {
      return false;
    }

    // City
    if (filter.city !== 'All Cities' && job.city !== filter.city) {
      return false;
    }

    // Hourly Rate
    if (job.hourlyRate < filter.minRate || job.hourlyRate > filter.maxRate) {
      return false;
    }

    // Urgency
    if (filter.urgencyOnly && job.urgency !== 'urgent') {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (filter.sortBy === 'rate-desc') return b.hourlyRate - a.hourlyRate;
    if (filter.sortBy === 'rate-asc') return a.hourlyRate - b.hourlyRate;
    if (filter.sortBy === 'duration-asc') return a.durationHours - b.durationHours;
    if (filter.sortBy === 'employer-rating') return b.employerRating - a.employerRating;
    // Default 'newest'
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleApplyClick = (job: JobMission) => {
    if (role === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedJobForApply(job);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header & Search Bar */}
      <div className="animate-fade-in-up rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian mb-1 block font-display">
            Flexible Student Opportunities
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-display">
            Find Short-Term Missions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Work flexible student hours, earn competitive hourly rates in DT, and build verified professional experience.
          </p>
        </div>

        {/* Search & Filter Bar Controls */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by mission title, keyword, required skill, or company..."
              value={filter.search}
              onChange={e => setFilter({ ...filter, search: e.target.value })}
              className="w-full text-xs sm:text-sm pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
            />
            {filter.search && (
              <button
                onClick={() => setFilter({ ...filter, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-navy"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={filter.city}
              onChange={e => setFilter({ ...filter, city: e.target.value })}
              className="flex-1 sm:flex-none text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white font-semibold text-steel focus:outline-none focus:border-fresh"
            >
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={filter.sortBy}
              onChange={e => setFilter({ ...filter, sortBy: e.target.value as any })}
              className="flex-1 sm:flex-none text-xs sm:text-sm px-4 py-3 rounded-2xl border border-slate-200 bg-white font-semibold text-steel focus:outline-none focus:border-fresh"
            >
              <option value="newest">Newest First</option>
              <option value="rate-desc">Highest Pay (DT/hr)</option>
              <option value="employer-rating">Top Employer Rating</option>
              <option value="duration-asc">Shortest Duration</option>
            </select>

            <button
              onClick={() => setShowFiltersDrawer(!showFiltersDrawer)}
              className={`p-3 rounded-2xl border transition-all ${
                showFiltersDrawer || filter.urgencyOnly || filter.category !== 'All Categories'
                  ? 'bg-fresh text-white border-fresh'
                  : 'bg-white border-slate-200 text-steel hover:bg-slate-50'
              }`}
              title="More Filters"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showFiltersDrawer && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs animate-fadeIn">
            <div>
              <label className="block font-bold text-navy mb-1.5">
                Max Hourly Rate: <span className="text-tunisian font-black">{filter.maxRate} DT/hr</span>
              </label>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={filter.maxRate}
                onChange={e => setFilter({ ...filter, maxRate: Number(e.target.value) })}
                className="w-full accent-tunisian cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 DT/hr</span>
                <span>25 DT/hr</span>
                <span>50 DT/hr</span>
              </div>
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-navy p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition w-full">
                <input
                  type="checkbox"
                  checked={filter.urgencyOnly}
                  onChange={e => setFilter({ ...filter, urgencyOnly: e.target.checked })}
                  className="w-4 h-4 rounded text-tunisian focus:ring-tunisian"
                />
                <span className="flex items-center gap-1.5">
                                    <span>Show Urgent Missions Only</span>
                </span>
              </label>
            </div>

            <div className="flex items-center justify-end">
              <button
                onClick={resetFilter}
                className="text-xs font-semibold text-slate-500 hover:text-tunisian underline"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}

        {/* Category Pills Bar */}
        <div className="mt-5 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter({ ...filter, category: cat })}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter.category === cat
                  ? 'bg-navy text-white shadow-sm ring-1 ring-navy'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filter Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-navy">{filteredJobs.length}</strong> available student missions
        </span>
        {filter.city !== 'All Cities' && (
          <span className="bg-blush text-steel px-2 py-0.5 rounded-md font-semibold">
            Filtered by: {filter.city}
          </span>
        )}
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
          <p className="text-lg font-bold text-navy">No missions match your current filters.</p>
          <p className="text-xs text-slate-500">Try adjusting your keywords, selecting "All Categories", or widening the hourly rate.</p>
          <button
            onClick={resetFilter}
            className="px-4 py-2 rounded-xl bg-fresh text-white font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredJobs.map(job => {
            const isBookmarked = bookmarkedJobIds.includes(job.id);
            const existingApp = applications.find(a => a.jobId === job.id && a.studentId === student.id);
            const isApplied = !!existingApp;

            return (
              <div
                key={job.id}
                className="animate-fade-in-up bg-white rounded-3xl border border-slate-200/80 hover:border-fresh hover:shadow-float transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Card Top */}
                <div className="p-5 sm:p-6 space-y-4">
                  
                  {/* Employer Row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.companyName}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-100 shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-steel truncate max-w-[150px]">
                            {job.companyName}
                          </span>
                          {job.isCompanyVerified && (
                            <span title="Verified Employer">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-[11px] text-slate-500 mt-0.5">
                          <Star className="w-3 h-3 text-sunny fill-sunny mr-1" />
                          <span className="font-semibold text-slate-700">{job.employerRating}</span>
                          <span className="mx-1">•</span>
                          <span>{job.city}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleBookmark(job.id)}
                      className={`p-2 rounded-xl border transition ${
                        isBookmarked
                          ? 'bg-fresh-50 border-fresh text-fresh'
                          : 'border-slate-200 text-slate-400 hover:text-navy hover:bg-slate-50'
                      }`}
                      title={isBookmarked ? 'Saved' : 'Save'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-fresh' : ''}`} />
                    </button>
                  </div>

                  {/* Title & Urgency */}
                  <div>
                    {job.urgency === 'urgent' && (
                      <span className="inline-block px-2 py-0.5 rounded-full bg-tunisian-50 text-tunisian border border-tunisian-200 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
 Urgent Mission
                      </span>
                    )}
                    <h3
                      onClick={() => setSelectedJobForDetails(job)}
                      className="text-base font-black text-navy group-hover:text-fresh cursor-pointer transition leading-snug line-clamp-2"
                    >
                      {job.title}
                    </h3>
                  </div>

                  {/* Pricing & Timing Banner */}
                  <div className="p-3 rounded-2xl bg-blush/30 border border-blush-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block">Hourly Rate</span>
                      <span className="text-lg font-black text-tunisian">
                        {job.hourlyRate} <span className="text-xs font-bold">DT/hr</span>
                      </span>
                    </div>
                    <div className="text-right border-l border-blush-200 pl-3">
                      <span className="text-[10px] font-bold text-slate-500 block">Estimated Pay</span>
                      <span className="text-base font-black text-navy">
                        {job.totalPayment} <span className="text-xs font-bold">DT</span>
                      </span>
                    </div>
                  </div>

                  {/* Details Badges */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-fresh shrink-0" />
                      <span className="font-semibold text-steel">{job.date}</span>
                      <span className="text-slate-400">({job.startTime}–{job.endTime})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sunny shrink-0" />
                      <span>{job.durationHours} hours mission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{job.availablePositions - job.filledPositions} open positions left</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {job.requiredSkills.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-steel font-medium text-[10px]"
                      >
                        {s}
                      </span>
                    ))}
                    {job.requiredSkills.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-[10px]">
                        +{job.requiredSkills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedJobForDetails(job)}
                    className="text-xs font-bold text-steel hover:text-navy px-2 py-1 transition"
                  >
                    View Details
                  </button>

                  {isApplied ? (
                    <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold">
                      Applied ({existingApp?.status.toUpperCase()})
                    </span>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="px-4 py-2 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs shadow-xs transition-all duration-200 hover:scale-[1.02] flex items-center gap-1.5 btn-press"
                    >
                      <span>1-Click Apply</span>
                      <ArrowRight className="w-3.5 h-3.5 text-sunny" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
