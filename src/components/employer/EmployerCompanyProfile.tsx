import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  CheckCircle2,
  Sparkles,
  Star
} from 'lucide-react';

export const EmployerCompanyProfile: React.FC = () => {
  const { employer, updateEmployerProfile } = useApp();

  const [formData, setFormData] = useState({
    companyName: employer.companyName,
    industry: employer.industry,
    registrationNumber: employer.registrationNumber,
    description: employer.description,
    website: employer.website,
    address: employer.address,
    city: employer.city,
    contactPerson: employer.contactPerson,
    contactEmail: employer.contactEmail,
    contactPhone: employer.contactPhone
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmployerProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="animate-fade-in-up rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-tunisian mb-1 block font-display">
              Company Settings & Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-display">
              Company Profile & Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Maintain your official business information and verified badge to attract top student talent.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Saved successfully!</span>
              </span>
            )}
            <button
              onClick={handleSubmit}
              className="h-11 sm:h-12 px-6 rounded-2xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-[1.02] btn-press"
            >
              Save Company Info
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Verification Badge & Stats */}
        <div className="space-y-6">
          <div className="animate-fade-in-up delay-100 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs text-center space-y-4 card-hover">
            <img
              src={employer.logo}
              alt={employer.companyName}
              className="w-24 h-24 rounded-3xl object-cover ring-4 ring-fresh/30 shadow-md mx-auto bg-white"
            />
            <div>
              <h3 className="text-lg font-black text-navy font-display">{employer.companyName}</h3>
              <p className="text-xs text-slate-500">{employer.industry}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold font-display">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Tunisian Enterprise</span>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Missions</span>
                <span className="font-bold text-navy font-display">{employer.jobsPostedCount} posted</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] text-slate-400 block font-semibold">Total Paid</span>
                <span className="font-bold text-tunisian font-display">{employer.totalSpent} DT</span>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up delay-200 p-6 rounded-3xl bg-blush/30 border border-blush-300 text-xs text-steel space-y-2">
            <span className="font-bold text-navy block flex items-center gap-1.5 font-display">
              <Sparkles className="w-4 h-4 text-tunisian" />
              <span>KYC Compliance Standard</span>
            </span>
            <p className="text-slate-600 leading-relaxed">
              Your Matricule Fiscal ({employer.registrationNumber}) has been validated by GetBoth platform operations. This entitles your mission postings to the <strong>Verified Employer</strong> trust badge.
            </p>
          </div>
        </div>

        {/* Right Col: Editable Details */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="animate-fade-in-up delay-150 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-navy font-display">Corporate Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Company Legal Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Matricule Fiscal (Tax ID)</label>
                <input
                  type="text"
                  value={formData.registrationNumber}
                  onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Industry Sector</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={e => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Website URL</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={e => setFormData({ ...formData, website: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Headquarters City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Office Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Company Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 resize-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-navy uppercase tracking-wider mb-3 font-display">Primary Contact Person</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">Name & Title</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full h-10 text-xs px-3 rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">Direct Email</label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full h-10 text-xs px-3 rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-navy mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.contactPhone}
                    onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="w-full h-10 text-xs px-3 rounded-xl border border-slate-200 bg-slate-50/50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200 btn-press"
            >
              Update Company Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
