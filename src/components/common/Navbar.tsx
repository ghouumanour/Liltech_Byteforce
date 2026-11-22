import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Search,
  Bell,
  MessageSquare,
  Bookmark,
  Calendar,
  User,
  PlusCircle,
  ShieldCheck,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    student,
    employer,
    notifications,
    messages,
    bookmarkedJobIds,
    setIsAuthModalOpen,
    setAuthModalMode,
    setIsChatDrawerOpen,
    setIsPostJobModalOpen
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const unreadMessages = messages.filter(m => !m.isRead && m.recipientId === (role === 'student' ? student.id : employer.id));

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (role === 'guest') {
      if (tabId === 'explore') window.scrollTo({ top: 0, behavior: 'smooth' });
      if (tabId === 'how-it-works' && activeTab !== 'browse') {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-[37px] z-40 w-full glass-nav border-b border-slate-200/80 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick(role === 'guest' ? 'explore' : 'dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-slate-200/80 p-1 group hover:scale-105 transition">
              <img src="/logo.png" alt="GetBoth Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-navy">
                  Get<span className="text-tunisian">Both</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blush text-steel border border-blush-300 hidden sm:inline-block">
                  Jobs
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-tight hidden lg:block">
                Never choose. Have both.
              </p>
            </div>
          </div>

          {/* Center Navigation - Dependent on Role */}
          <nav className={`hidden ${role === 'guest' ? 'md:flex' : 'lg:flex'} items-center space-x-1 font-medium text-sm`}>
            {role === 'student' && (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('jobs')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'jobs'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <Search className="w-4 h-4 text-fresh" />
                  <span>Find Jobs</span>
                </button>
                <button
                  onClick={() => handleNavClick('applications')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'applications'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-tunisian" />
                  <span>My Applications</span>
                </button>
                <button
                  onClick={() => handleNavClick('schedule')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'schedule'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-4 h-4 text-sunny" />
                  <span>Missions & Pass</span>
                </button>
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'profile'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile & CV</span>
                </button>
              </>
            )}

            {role === 'employer' && (
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'dashboard'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => handleNavClick('my-jobs')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'my-jobs'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Posted Missions
                </button>
                <button
                  onClick={() => handleNavClick('applicants')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'applicants'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-4 h-4 text-fresh" />
                  <span>Applicants</span>
                </button>
                <button
                  onClick={() => handleNavClick('company-profile')}
                  className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeTab === 'company-profile'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Company Profile</span>
                </button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button
                  onClick={() => handleNavClick('metrics')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'metrics'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Platform Metrics
                </button>
                <button
                  onClick={() => handleNavClick('verify')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'verify'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Verifications
                </button>
                <button
                  onClick={() => handleNavClick('moderation')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'moderation'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Mission Moderation
                </button>
                <button
                  onClick={() => handleNavClick('users')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'users'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Users Directory
                </button>
              </>
            )}

            {role === 'guest' && (
              <>
                <button
                  onClick={() => handleNavClick('explore')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'explore'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    activeTab === 'how-it-works'
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  How It Works
                </button>
              </>
            )}
          </nav>

          {/* Right Action Icons & User Profile */}
          <div className="flex items-center space-x-2.5 sm:space-x-3.5">
            
            {/* Post Job CTA for Employer */}
            {role === 'employer' && (
              <button
                onClick={() => setIsPostJobModalOpen(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-tunisian hover:bg-tunisian-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Mission</span>
              </button>
            )}

            {/* Bookmarks for Students */}
            {role === 'student' && (
              <button
                onClick={() => handleNavClick('jobs')}
                title="Saved Jobs"
                className="p-2 rounded-xl text-steel hover:text-navy hover:bg-slate-100 transition relative"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkedJobIds.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-fresh text-white text-[10px] font-bold flex items-center justify-center">
                    {bookmarkedJobIds.length}
                  </span>
                )}
              </button>
            )}

            {/* Chat Messages */}
            {role !== 'guest' && (
              <button
                onClick={() => setIsChatDrawerOpen(true)}
                title="Messages"
                className="p-2 rounded-xl text-steel hover:text-navy hover:bg-slate-100 transition relative"
              >
                <MessageSquare className="w-5 h-5" />
                {unreadMessages.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-fresh text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadMessages.length}
                  </span>
                )}
              </button>
            )}

            {/* Notifications */}
            {role !== 'guest' && (
              <div className="relative">
                <button
                  onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                  title="Notifications"
                  className="p-2 rounded-xl text-steel hover:text-navy hover:bg-slate-100 transition relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-tunisian text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadNotifications.length}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown preview */}
                {isNotifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-float border border-slate-100 p-4 z-50 animate-scale-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="font-bold text-navy text-sm">Notifications</span>
                      <span className="text-xs text-fresh font-semibold">{notifications.length} total</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 py-2">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-4 text-center">No notifications yet.</p>
                      ) : (
                        notifications.slice(0, 4).map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              if (n.linkTarget) handleNavClick(n.linkTarget);
                              setIsNotifDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-xl cursor-pointer hover:bg-slate-50 transition ${
                              !n.isRead ? 'bg-blush/30' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-1">
                              <span className="text-xs font-bold text-navy">{n.title}</span>
                              <span className="text-[10px] text-slate-400">Just now</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-center">
                      <button
                        onClick={() => setIsNotifDropdownOpen(false)}
                        className="text-xs font-semibold text-fresh hover:underline"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile Avatar / Sign In */}
            {role === 'guest' ? (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-steel hover:text-navy transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthModalMode('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-fresh hover:bg-fresh-600 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
                >
                  Join us
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
                >
                  <img
                    src={
                      role === 'student'
                        ? student.avatar
                        : role === 'employer'
                        ? employer.logo
                        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
                    }
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-fresh/30"
                  />
                  <div className="hidden md:block text-left text-xs">
                    <p className="font-bold text-navy leading-none truncate max-w-[110px]">
                      {role === 'student'
                        ? student.fullName
                        : role === 'employer'
                        ? employer.companyName
                        : 'Admin'}
                    </p>
                    <p className="text-[10px] text-slate-500 capitalize leading-tight">
                      {role === 'student' ? 'Student' : role === 'employer' ? 'Company' : 'Super Admin'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-float border border-slate-100 p-2 z-50 animate-scale-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-navy truncate">
                        {role === 'student' ? student.fullName : role === 'employer' ? employer.companyName : 'Administrator'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {role === 'student' ? student.email : employer.contactEmail}
                      </p>
                    </div>

                    <div className="py-1">
                      {role === 'student' && (
                        <button
                          onClick={() => handleNavClick('profile')}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-steel hover:bg-slate-50 rounded-lg flex items-center gap-2"
                        >
                          <User className="w-3.5 h-3.5 text-fresh" />
                          <span>My Student Profile & CV</span>
                        </button>
                      )}
                      {role === 'employer' && (
                        <button
                          onClick={() => handleNavClick('company-profile')}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-steel hover:bg-slate-50 rounded-lg flex items-center gap-2"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-fresh" />
                          <span>Company Settings</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setRole('guest');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-medium text-tunisian hover:bg-tunisian-50 rounded-lg flex items-center gap-2 mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMobileMenuOpen}
              className={`${role === 'guest' ? 'md:hidden' : 'lg:hidden'} shrink-0 p-2 rounded-xl text-steel hover:bg-slate-100 transition`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
          <div className={`${role === 'guest' ? 'md:hidden' : 'lg:hidden'} bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-slide-down max-h-[65vh] overflow-y-auto`}>
          {role === 'guest' && (
            <>
              <button onClick={() => handleNavClick('explore')} className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50">Home</button>
              <button onClick={() => handleNavClick('how-it-works')} className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50">How It Works</button>
              <button onClick={() => { setIsMobileMenuOpen(false); setAuthModalMode('login'); setIsAuthModalOpen(true); }} className="w-full text-left px-3 py-2.5 font-medium text-sm text-navy hover:bg-slate-50 sm:hidden">Log In</button>
              <button onClick={() => { setIsMobileMenuOpen(false); setAuthModalMode('signup'); setIsAuthModalOpen(true); }} className="w-full text-center px-4 py-2.5 bg-fresh text-white font-semibold text-sm sm:hidden">Join us</button>
            </>
          )}
          {role === 'student' && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavClick('jobs')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50 flex items-center gap-2"
              >
                <Search className="w-4 h-4 text-fresh" />
                <span>Find Jobs</span>
              </button>
              <button
                onClick={() => handleNavClick('applications')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-tunisian" />
                <span>My Applications</span>
              </button>
              <button
                onClick={() => handleNavClick('schedule')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50 flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-sunny" />
                <span>Missions & Digital Pass</span>
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Profile & CV</span>
              </button>
            </>
          )}

          {role === 'employer' && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                Overview
              </button>
              <button
                onClick={() => handleNavClick('my-jobs')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                Posted Missions
              </button>
              <button
                onClick={() => handleNavClick('applicants')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50 flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-fresh" />
                <span>Applicants</span>
              </button>
              <button
                onClick={() => handleNavClick('company-profile')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Company Profile</span>
              </button>
              <button
                onClick={() => {
                  setIsPostJobModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-center px-4 py-2.5 rounded-xl bg-tunisian text-white font-semibold text-sm shadow-md mt-2"
              >
                + Post a Mission
              </button>
            </>
          )}

          {role === 'admin' && (
            <>
              <button
                onClick={() => handleNavClick('metrics')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                Platform Metrics
              </button>
              <button
                onClick={() => handleNavClick('verify')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                Employer Verifications
              </button>
              <button
                onClick={() => handleNavClick('moderation')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                Job Moderation
              </button>
              <button
                onClick={() => handleNavClick('users')}
                className="w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm text-navy hover:bg-slate-50"
              >
                User Directory
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
