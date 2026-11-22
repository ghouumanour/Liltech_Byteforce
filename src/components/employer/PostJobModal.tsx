import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES, CITIES } from '../../data/mockData';

export const PostJobModal: React.FC = () => {
  const {
    isPostJobModalOpen,
    setIsPostJobModalOpen,
    createJob,
    employer,
    setActiveTab
  } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Event Hosting');
  const [city, setCity] = useState(employer.city || 'Tunis');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('2026-12-05');
  const [startTime, setStartTime] = useState('14:00');
  const [endTime, setEndTime] = useState('18:00');
  const [hourlyRate, setHourlyRate] = useState<number>(14);
  const [availablePositions, setAvailablePositions] = useState<number>(2);
  const [urgency, setUrgency] = useState<'normal' | 'urgent'>('normal');
  const [description, setDescription] = useState('');
  const [attire, setAttire] = useState('Smart casual');
  const [mealProvided, setMealProvided] = useState(true);
  const [transportProvided, setTransportProvided] = useState(false);
  const [skillsString, setSkillsString] = useState('Customer Service, Punctuality, Communication');
  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Welcome guests and verify attendance list',
    'Coordinate with team supervisor for task allocation'
  ]);
  const [newResp, setNewResp] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isPostJobModalOpen) return null;

  // Calculate duration
  const startHour = parseInt(startTime.split(':')[0], 10) || 14;
  const endHour = parseInt(endTime.split(':')[0], 10) || 18;
  const durationHours = Math.max(1, endHour - startHour);
  const totalPaymentPerStudent = hourlyRate * durationHours;
  const totalBudget = totalPaymentPerStudent * availablePositions;

  const handleAddResp = () => {
    if (newResp.trim()) {
      setResponsibilities([...responsibilities, newResp.trim()]);
      setNewResp('');
    }
  };

  const handleRemoveResp = (index: number) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !address.trim() || !description.trim()) {
      alert('Please fill out all required mission fields.');
      return;
    }

    const skills = skillsString.split(',').map(s => s.trim()).filter(Boolean);

    createJob({
      employerId: employer.id,
      companyName: employer.companyName,
      companyLogo: employer.logo,
      isCompanyVerified: employer.verificationStatus === 'verified',
      employerRating: employer.rating,
      title,
      category,
      city,
      address,
      date,
      startTime,
      endTime,
      durationHours,
      hourlyRate,
      totalPayment: totalPaymentPerStudent,
      availablePositions,
      urgency,
      description,
      responsibilities,
      requirements: [
        'Enrolled student with valid ID',
        'Punctual and professional conduct',
        'Follow designated attire rules'
      ],
      requiredSkills: skills.length > 0 ? skills : ['Punctuality', 'Teamwork'],
      attire,
      mealProvided,
      transportProvided
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsPostJobModalOpen(false);
      setActiveTab('my-jobs');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-float border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-scale-in">
        
        {/* Header gradient */}
        <div className="h-3 bg-gradient-to-r from-tunisian via-fresh to-navy"></div>

        <button
          onClick={() => setIsPostJobModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-navy hover:bg-slate-200 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-navy font-display">Mission Published! </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                Your mission <strong>"{title}"</strong> is now live on GetBoth. Qualified students in {city} will be notified immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-tunisian font-display">
                  Employer Dashboard • Mission Creation
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-navy mt-0.5 font-display">
                  Post a New Student Mission
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Connect with vetted, motivated students for temporary and short-term work.
                </p>
              </div>

              {/* Mission Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy mb-1.5">
                    Mission Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Event Assistant, Hostess, Logistics Support..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full h-11 text-xs px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-fresh cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c !== 'All Categories').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Urgency Level</label>
                  <select
                    value={urgency}
                    onChange={e => setUrgency(e.target.value as any)}
                    className="w-full h-11 text-xs px-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-fresh font-semibold cursor-pointer"
                  >
                    <option value="normal">Normal Mission</option>
                    <option value="urgent"> Urgent Mission (Promoted)</option>
                  </select>
                </div>
              </div>

              {/* Location & Venue */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">City</label>
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full h-11 text-xs px-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-fresh cursor-pointer"
                  >
                    {CITIES.filter(c => c !== 'All Cities').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-navy mb-1.5">Specific Venue / Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sousse Palace Hotel, Les Berges du Lac 2..."
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full h-11 text-xs px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Date, Time & Positions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full h-10 text-xs px-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full h-10 text-xs px-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full h-10 text-xs px-2.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">Positions</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={availablePositions}
                    onChange={e => setAvailablePositions(Number(e.target.value))}
                    className="w-full h-10 text-xs px-2.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>

              {/* Budget Calculation Banner */}
              <div className="p-4 bg-blush/40 rounded-2xl border border-blush-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <label className="block text-xs font-bold text-navy mb-1">
                      Hourly Salary (DT / hour) *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="5"
                        max="100"
                        step="1"
                        required
                        value={hourlyRate}
                        onChange={e => setHourlyRate(Number(e.target.value))}
                        className="w-28 text-base font-black text-tunisian px-3 py-2 rounded-xl border border-slate-200 bg-white text-center font-display"
                      />
                      <span className="text-xs font-bold text-steel">DT / hour</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-l border-blush-300 pt-3 sm:pt-0 sm:pl-6 text-right">
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold">Per Student Pay</span>
                      <span className="text-base font-black text-navy font-display">{totalPaymentPerStudent} DT</span>
                      <span className="text-[10px] text-slate-400 block">({durationHours} hrs)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block font-semibold">Total Escrow Budget</span>
                      <span className="text-xl font-black text-tunisian font-display">{totalBudget} DT</span>
                      <span className="text-[10px] text-slate-400 block">({availablePositions} students)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Mission Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain what the students will do, the team atmosphere, and what makes this mission a great experience..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 resize-none"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Key Responsibilities</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Add a responsibility item..."
                    value={newResp}
                    onChange={e => setNewResp(e.target.value)}
                    className="flex-1 h-10 text-xs px-3 rounded-xl border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddResp}
                    className="h-10 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-steel font-bold text-xs transition btn-press"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1.5">
                  {responsibilities.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span>• {r}</span>
                      <button type="button" onClick={() => handleRemoveResp(i)} className="text-slate-400 hover:text-tunisian font-bold px-1">
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills and perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-navy mb-1.5">Required Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skillsString}
                    onChange={e => setSkillsString(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-navy mb-1.5">Dress Code / Attire</label>
                  <input
                    type="text"
                    value={attire}
                    onChange={e => setAttire(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="flex gap-4 text-xs font-semibold text-steel">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mealProvided}
                    onChange={e => setMealProvided(e.target.checked)}
                    className="w-4 h-4 rounded text-navy"
                  />
                  <span>Meal / Drinks Provided</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={transportProvided}
                    onChange={e => setTransportProvided(e.target.checked)}
                    className="w-4 h-4 rounded text-navy"
                  />
                  <span>Transport Assistance Provided</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-tunisian hover:bg-tunisian-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 hover:scale-[1.01] flex items-center justify-center gap-2 btn-press"
              >
                <span>Publish Mission on GetBoth ({totalBudget} DT Escrow)</span>
                <Sparkles className="w-4 h-4 text-sunny" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
