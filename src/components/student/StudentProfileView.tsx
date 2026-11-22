import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  MapPin,
  FileText,
  Plus,
  Trash2,
  CheckCircle2,
  Globe,
  Award,
  Sparkles,
  Upload,
  Briefcase,
  Star
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

export const StudentProfileView: React.FC = () => {
  const { student, updateStudentProfile } = useApp();

  const [formData, setFormData] = useState({
    fullName: student.fullName,
    email: student.email,
    phone: student.phone,
    city: student.city,
    university: student.university,
    fieldOfStudy: student.fieldOfStudy,
    academicLevel: student.academicLevel,
    dob: student.dob,
    bio: student.bio,
    portfolioUrl: student.portfolioUrl || '',
    cvUrl: student.cvUrl || 'CV_Sarah_Ben_Ali_2025.pdf'
  });

  const [skills, setSkills] = useState<string[]>(student.skills);
  const [newSkill, setNewSkill] = useState('');
  const [preferredCats, setPreferredCats] = useState<string[]>(student.preferredCategories);
  const [isSaved, setIsSaved] = useState(false);
  const [showAddExpModal, setShowAddExpModal] = useState(false);
  const [newExp, setNewExp] = useState({
    role: '',
    company: '',
    duration: '',
    description: ''
  });

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const toggleCategory = (cat: string) => {
    if (cat === 'All Categories') return;
    if (preferredCats.includes(cat)) {
      setPreferredCats(preferredCats.filter(c => c !== cat));
    } else {
      setPreferredCats([...preferredCats, cat]);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      ...formData,
      skills,
      preferredCategories: preferredCats
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleAddExperience = () => {
    if (!newExp.role || !newExp.company) return;
    const added = {
      id: `exp-${Date.now()}`,
      role: newExp.role,
      company: newExp.company,
      duration: newExp.duration || 'Short-term',
      description: newExp.description
    };
    updateStudentProfile({
      experiences: [added, ...student.experiences]
    });
    setNewExp({ role: '', company: '', duration: '', description: '' });
    setShowAddExpModal(false);
  };

  const handleRemoveExperience = (id: string) => {
    updateStudentProfile({
      experiences: student.experiences.filter(e => e.id !== id)
    });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="animate-fade-in-up rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-fresh mb-1 block font-display">
              Student Identity & Portfolio
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-navy tracking-tight font-display">
              My Student Profile & CV
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Employers review your skills, academic background, and ratings before hiring.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Changes saved!</span>
              </span>
            )}
            <button
              onClick={handleSaveProfile}
              className="h-11 sm:h-12 px-6 rounded-2xl bg-navy hover:bg-navy-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 hover:scale-[1.02] btn-press"
            >
              Save Profile Changes
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Avatar, Badges & CV Upload */}
        <div className="space-y-6">
          
          {/* Avatar & Snapshot */}
          <div className="animate-fade-in-up delay-100 rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs text-center space-y-4 card-hover">
            <div className="relative inline-block">
              <img
                src={student.avatar}
                alt={student.fullName}
                className="w-28 h-28 rounded-3xl object-cover ring-4 ring-fresh/30 shadow-md mx-auto"
              />
              <span className="absolute bottom-1 right-1 p-1.5 rounded-xl bg-fresh text-white shadow-sm" title="Verified Student">
                <Sparkles className="w-4 h-4" />
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-navy font-display">{student.fullName}</h3>
              <p className="text-xs text-slate-500">{student.fieldOfStudy}</p>
              <p className="text-xs font-semibold text-steel mt-0.5">{student.university}</p>
            </div>

            {/* Badges / Rating row */}
            <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Rating</span>
                <span className="font-extrabold text-sunny flex items-center justify-center gap-1 font-display">
                  <Star className="w-3.5 h-3.5 fill-sunny" /> {student.rating}
                </span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-[10px] text-slate-400 block font-semibold">Completed</span>
                <span className="font-extrabold text-navy font-display">{student.completedMissionsCount} jobs</span>
              </div>
              <div className="border-l border-slate-100 pl-4">
                <span className="text-[10px] text-slate-400 block font-semibold">Earned</span>
                <span className="font-extrabold text-tunisian font-display">{student.totalEarnings} DT</span>
              </div>
            </div>
          </div>

          {/* CV Section */}
          <div className="animate-fade-in-up delay-200 rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy flex items-center justify-between font-display">
              <span>Curriculum Vitae (PDF)</span>
              <span className="text-fresh font-bold text-[10px]">Verified</span>
            </h4>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-tunisian-50 text-tunisian">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-navy block truncate max-w-[150px]">
                    {formData.cvUrl}
                  </span>
                  <span className="text-[10px] text-slate-400">PDF • 1.4 MB</span>
                </div>
              </div>
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  alert(`Viewing PDF document: ${formData.cvUrl}`);
                }}
                className="text-xs font-bold text-fresh hover:underline"
              >
                View
              </a>
            </div>

            <label className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 hover:border-fresh hover:bg-fresh-50/30 text-slate-600 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition">
              <Upload className="w-3.5 h-3.5 text-fresh" />
              <span>Replace / Upload New PDF</span>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => {
                  if (e.target.files?.[0]) {
                    setFormData({ ...formData, cvUrl: e.target.files[0].name });
                  }
                }}
              />
            </label>
          </div>

          {/* Languages */}
          <div className="animate-fade-in-up delay-300 rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy font-display">
              Languages
            </h4>
            <div className="space-y-2">
              {student.languages.map((l, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0">
                  <span className="font-bold text-navy">{l.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 font-medium text-steel">
                    {l.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="animate-fade-in-up delay-400 rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-navy font-display">
              Certifications & Badges
            </h4>
            <div className="space-y-2">
              {student.certificates.map((cert, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-steel">
                  <Award className="w-4 h-4 text-sunny shrink-0" />
                  <span className="font-semibold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Personal Info, Skills, Experiences, Availability (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Info Card */}
          <div className="animate-fade-in-up delay-150 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-navy font-display">Academic & Contact Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">City / Governorate</label>
                <select
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 cursor-pointer"
                >
                  <option value="Tunis">Tunis</option>
                  <option value="Sousse">Sousse</option>
                  <option value="Monastir">Monastir</option>
                  <option value="Sfax">Sfax</option>
                  <option value="Ariana">Ariana</option>
                  <option value="Nabeul">Nabeul</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">University / Faculty</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={e => setFormData({ ...formData, university: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Field of Study</label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={e => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Academic Level</label>
                <select
                  value={formData.academicLevel}
                  onChange={e => setFormData({ ...formData, academicLevel: e.target.value as any })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 cursor-pointer"
                >
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                  <option value="Cycle Ingénieur">Cycle Ingénieur</option>
                  <option value="Autre">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-navy mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={e => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1.5">Short Biography & Pitch</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50 resize-none"
                placeholder="Highlight your availability, strengths, and attitude..."
              />
            </div>
          </div>

          {/* Skills Management */}
          <div className="animate-fade-in-up delay-250 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-navy font-display">Skills & Capabilities</h3>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a new skill (e.g. Hostess, Python, French C1, Barcode)..."
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 h-11 text-xs sm:text-sm px-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh/30 focus:border-fresh bg-slate-50/50"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="h-11 px-5 rounded-xl bg-fresh hover:bg-fresh-600 text-white font-bold text-xs transition btn-press"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-navy font-semibold text-xs border border-slate-200 hover:border-fresh transition-colors"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-tunisian"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Preferred Job Categories */}
          <div className="animate-fade-in-up delay-300 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-navy font-display">Preferred Job Categories</h3>
            <p className="text-xs text-slate-500">We notify you first when missions in these categories open up.</p>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter(c => c !== 'All Categories').map(cat => {
                const isSelected = preferredCats.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                      isSelected
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? `✓ ${cat}` : `+ ${cat}`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Previous Experiences */}
          <div className="animate-fade-in-up delay-350 rounded-3xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-navy font-display">Past Experience & Gigs</h3>
              <button
                type="button"
                onClick={() => setShowAddExpModal(true)}
                className="text-xs font-bold text-fresh hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Experience</span>
              </button>
            </div>

            {student.experiences.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center italic">No prior experience listed yet.</p>
            ) : (
              <div className="space-y-3">
                {student.experiences.map(exp => (
                  <div key={exp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4 card-hover">
                    <div className="space-y-1 text-xs">
                      <h4 className="font-bold text-navy font-display">{exp.role}</h4>
                      <p className="text-slate-500 font-medium">{exp.company} • {exp.duration}</p>
                      {exp.description && <p className="text-slate-600 mt-1 leading-relaxed">{exp.description}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-tunisian hover:bg-slate-200 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Inline add experience form */}
            {showAddExpModal && (
              <div className="p-4 rounded-2xl bg-blush/30 border border-blush-300 space-y-3 animate-fade-in">
                <div className="flex justify-between items-center text-xs font-bold text-navy font-display">
                  <span>New Experience / Mission Record</span>
                  <button type="button" onClick={() => setShowAddExpModal(false)} className="text-slate-400 hover:text-navy">Cancel</button>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    placeholder="Role (e.g. Hostess, Tutor)"
                    value={newExp.role}
                    onChange={e => setNewExp({ ...newExp, role: e.target.value })}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Company / Event"
                    value={newExp.company}
                    onChange={e => setNewExp({ ...newExp, company: e.target.value })}
                    className="p-2.5 rounded-xl border border-slate-200 bg-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Duration (e.g. 2 days, 15 hours)"
                  value={newExp.duration}
                  onChange={e => setNewExp({ ...newExp, duration: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white"
                />
                <textarea
                  placeholder="Short description of what you accomplished..."
                  value={newExp.description}
                  onChange={e => setNewExp({ ...newExp, description: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 bg-white resize-none"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="w-full py-2.5 bg-navy hover:bg-navy-600 text-white font-bold text-xs rounded-xl transition btn-press"
                >
                  Save Experience
                </button>
              </div>
            )}
          </div>

        </div>
      </form>
    </div>
  );
};
