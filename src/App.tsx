import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar';
import { Navbar } from './components/common/Navbar';
import { DashboardSidebar } from './components/common/DashboardSidebar';
import { Footer } from './components/common/Footer';
import { AuthModal } from './components/common/AuthModal';
import { ChatDrawer } from './components/common/ChatDrawer';
import { MissionPassModal } from './components/common/MissionPassModal';
import { ReviewModal } from './components/common/ReviewModal';
import { JobDetailsModal } from './components/student/JobDetailsModal';
import { ApplyModal } from './components/student/ApplyModal';
import { PostJobModal } from './components/employer/PostJobModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { StudentDashboard } from './components/student/StudentDashboard';
import { JobDiscovery } from './components/student/JobDiscovery';
import { StudentApplications } from './components/student/StudentApplications';
import { StudentSchedule } from './components/student/StudentSchedule';
import { StudentProfileView } from './components/student/StudentProfileView';

import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { EmployerApplicants } from './components/employer/EmployerApplicants';
import { EmployerCompanyProfile } from './components/employer/EmployerCompanyProfile';

import { AdminDashboard } from './components/admin/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { role, activeTab, demoMode, authenticated } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFD] text-slate-800">
      
      {/* Interactive Switcher Bar for instant evaluator testing */}
      {demoMode && <RoleSwitcherBar />}

      {/* Main Glass Navbar */}
      <Navbar />
      {authenticated && <div className="bg-slate-100 border-b border-slate-200 text-center text-xs py-2">Authenticated account. Mission management is in integration preview; transactions are simulated.</div>}

      {/* Main Layout Area */}
      {role === 'guest' ? (
        // Full width container for Guest / Landing experience
        <div className="flex-1 flex flex-col">
          <main className={activeTab === 'browse' ? "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4" : "flex-1 w-full min-w-0"}>
            {activeTab === 'explore' && <LandingPage />}
            {activeTab === 'browse' && <JobDiscovery />}
            {activeTab === 'how-it-works' && <LandingPage />}
          </main>
          <Footer />
        </div>
      ) : (
        // Modern SaaS Split Layout: Sidebar + Dashboard Container
        <div className="flex-1 flex w-full">
          {/* Left Sidebar */}
          <DashboardSidebar />

          {/* Main Dashboard Viewport */}
          <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full">
            {/* Student Views */}
            {role === 'student' && (
              <>
                {activeTab === 'dashboard' && <StudentDashboard />}
                {activeTab === 'jobs' && <JobDiscovery />}
                {activeTab === 'applications' && <StudentApplications />}
                {activeTab === 'schedule' && <StudentSchedule />}
                {activeTab === 'profile' && <StudentProfileView />}
              </>
            )}

            {/* Employer Views */}
            {role === 'employer' && (
              <>
                {(activeTab === 'dashboard' || activeTab === 'my-jobs') && <EmployerDashboard />}
                {activeTab === 'applicants' && <EmployerApplicants />}
                {activeTab === 'company-profile' && <EmployerCompanyProfile />}
              </>
            )}

            {/* Administrator Views */}
            {role === 'admin' && (
              <AdminDashboard />
            )}
          </main>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <AuthModal />
      <JobDetailsModal />
      <ApplyModal />
      <PostJobModal />
      <MissionPassModal />
      <ReviewModal />
      <ChatDrawer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
