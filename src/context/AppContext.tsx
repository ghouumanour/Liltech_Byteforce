import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  StudentProfile,
  EmployerProfile,
  JobMission,
  Application,
  ApplicationStatus,
  Review,
  Notification,
  ChatMessage,
  JobFilter
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_EMPLOYERS,
  INITIAL_JOBS,
  INITIAL_APPLICATIONS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MESSAGES
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  
  // Profiles
  student: StudentProfile;
  employer: EmployerProfile;
  allStudents: StudentProfile[];
  allEmployers: EmployerProfile[];
  
  // Jobs & Applications
  jobs: JobMission[];
  applications: Application[];
  bookmarkedJobIds: string[];
  reviews: Review[];
  notifications: Notification[];
  messages: ChatMessage[];
  
  // Filters
  filter: JobFilter;
  setFilter: React.Dispatch<React.SetStateAction<JobFilter>>;
  resetFilter: () => void;
  
  // Modals & Drawers state
  selectedJobForDetails: JobMission | null;
  setSelectedJobForDetails: (job: JobMission | null) => void;
  selectedJobForApply: JobMission | null;
  setSelectedJobForApply: (job: JobMission | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot') => void;
  isChatDrawerOpen: boolean;
  setIsChatDrawerOpen: (open: boolean) => void;
  chatPartner: { id: string; name: string; avatar: string; role: 'student' | 'employer'; jobId?: string; jobTitle?: string } | null;
  setChatPartner: (partner: { id: string; name: string; avatar: string; role: 'student' | 'employer'; jobId?: string; jobTitle?: string } | null) => void;
  isPostJobModalOpen: boolean;
  setIsPostJobModalOpen: (open: boolean) => void;
  isMissionPassOpen: boolean;
  setIsMissionPassOpen: (open: boolean) => void;
  activePassApplication: Application | null;
  setActivePassApplication: (app: Application | null) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  reviewTarget: { jobId: string; jobTitle: string; toUserId: string; toUserName: string; toRole: 'student' | 'employer' } | null;
  setReviewTarget: (target: { jobId: string; jobTitle: string; toUserId: string; toUserName: string; toRole: 'student' | 'employer' } | null) => void;
  
  // Actions
  toggleBookmark: (jobId: string) => void;
  applyToJob: (jobId: string, coverNote: string, cvAttached: boolean) => boolean;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  checkInMission: (appId: string) => void;
  completeMissionAndPayout: (appId: string) => void;
  createJob: (jobData: Omit<JobMission, 'id' | 'createdAt' | 'filledPositions' | 'status'>) => void;
  updateStudentProfile: (updated: Partial<StudentProfile>) => void;
  updateEmployerProfile: (updated: Partial<EmployerProfile>) => void;
  sendMessage: (recipientId: string, content: string, jobId?: string, jobTitle?: string) => void;
  addReview: (rating: number, comment: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  verifyEmployer: (employerId: string) => void;
  moderateJobStatus: (jobId: string, status: 'open' | 'cancelled') => void;
  toggleUserSuspension: (userId: string, isStudent: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialFilter: JobFilter = {
  search: '',
  category: 'All Categories',
  city: 'All Cities',
  minRate: 0,
  maxRate: 50,
  urgencyOnly: false,
  sortBy: 'newest'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading from localStorage or default
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('getboth_role') as UserRole) || 'student';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [allStudents, setAllStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem('getboth_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [allEmployers, setAllEmployers] = useState<EmployerProfile[]>(() => {
    const saved = localStorage.getItem('getboth_employers');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYERS;
  });

  const [jobs, setJobs] = useState<JobMission[]>(() => {
    const saved = localStorage.getItem('getboth_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem('getboth_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('getboth_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('getboth_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('getboth_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('getboth_bookmarks');
    return saved ? JSON.parse(saved) : ['job-1', 'job-4'];
  });

  const [filter, setFilter] = useState<JobFilter>(initialFilter);

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobMission | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobMission | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState<{ id: string; name: string; avatar: string; role: 'student' | 'employer'; jobId?: string; jobTitle?: string } | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isMissionPassOpen, setIsMissionPassOpen] = useState(false);
  const [activePassApplication, setActivePassApplication] = useState<Application | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<{ jobId: string; jobTitle: string; toUserId: string; toUserName: string; toRole: 'student' | 'employer' } | null>(null);

  // Active user reference
  const currentStudent = allStudents[0];
  const currentEmployer = allEmployers[0];

  // Save to localStorage when state updates
  useEffect(() => {
    localStorage.setItem('getboth_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('getboth_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('getboth_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('getboth_students', JSON.stringify(allStudents));
  }, [allStudents]);

  useEffect(() => {
    localStorage.setItem('getboth_employers', JSON.stringify(allEmployers));
  }, [allEmployers]);

  useEffect(() => {
    localStorage.setItem('getboth_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('getboth_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('getboth_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('getboth_bookmarks', JSON.stringify(bookmarkedJobIds));
  }, [bookmarkedJobIds]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Sensible default tab when switching role
    if (newRole === 'student') setActiveTab('dashboard');
    else if (newRole === 'employer') setActiveTab('dashboard');
    else if (newRole === 'admin') setActiveTab('metrics');
    else if (newRole === 'guest') setActiveTab('explore');
  };

  const resetFilter = () => {
    setFilter(initialFilter);
  };

  const toggleBookmark = (jobId: string) => {
    setBookmarkedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = (jobId: string, coverNote: string, cvAttached: boolean): boolean => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return false;

    // Check if already applied
    const alreadyApplied = applications.some(a => a.jobId === jobId && a.studentId === currentStudent.id);
    if (alreadyApplied) return false;

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      studentId: currentStudent.id,
      studentName: currentStudent.fullName,
      studentAvatar: currentStudent.avatar,
      studentUniversity: currentStudent.university.split(' ')[0],
      studentField: currentStudent.fieldOfStudy,
      studentRating: currentStudent.rating,
      coverNote,
      cvAttached,
      cvFileName: cvAttached ? (currentStudent.cvUrl || 'Student_CV.pdf') : undefined,
      status: 'pending',
      payoutStatus: 'unpaid',
      appliedAt: new Date().toISOString(),
      checkedIn: false
    };

    setApplications(prev => [newApp, ...prev]);

    // Send notification to employer
    const empNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: job.employerId,
      title: 'New Applicant Received! 📄',
      message: `${currentStudent.fullName} applied for your mission "${job.title}".`,
      type: 'application',
      linkTarget: 'applicants',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [empNotification, ...prev]);

    return true;
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updated: Application = { ...app, status };
        if (status === 'accepted') {
          updated.acceptedAt = new Date().toISOString();
          updated.payoutStatus = 'escrowed';
          updated.checkInCode = `GB-${Math.floor(1000 + Math.random() * 9000)}`;

          // Update job filled positions
          setJobs(jobList => jobList.map(j => {
            if (j.id === app.jobId) {
              return { ...j, filledPositions: Math.min(j.availablePositions, j.filledPositions + 1) };
            }
            return j;
          }));

          // Notify student
          const job = jobs.find(j => j.id === app.jobId);
          const studentNotification: Notification = {
            id: `notif-${Date.now()}`,
            userId: app.studentId,
            title: 'You are Hired! 🎉',
            message: `Congratulations! Your application for "${job?.title || 'Mission'}" has been accepted. Check your mission pass.`,
            type: 'hire',
            linkTarget: 'schedule',
            isRead: false,
            createdAt: new Date().toISOString()
          };
          setNotifications(n => [studentNotification, ...n]);
        }
        return updated;
      }
      return app;
    }));
  };

  const checkInMission = (appId: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, checkedIn: true };
      }
      return app;
    }));
  };

  const completeMissionAndPayout = (appId: string) => {
    const app = applications.find(a => a.id === appId);
    if (!app) return;

    const job = jobs.find(j => j.id === app.jobId);
    const amount = job ? job.totalPayment : 50;

    setApplications(prev => prev.map(a => {
      if (a.id === appId) {
        return {
          ...a,
          status: 'completed',
          payoutStatus: 'released',
          completedAt: new Date().toISOString()
        };
      }
      return a;
    }));

    // Update student earnings & stats
    setAllStudents(prev => prev.map(s => {
      if (s.id === app.studentId) {
        return {
          ...s,
          totalEarnings: s.totalEarnings + amount,
          completedMissionsCount: s.completedMissionsCount + 1
        };
      }
      return s;
    }));

    // Update employer stats
    if (job) {
      setAllEmployers(prev => prev.map(e => {
        if (e.id === job.employerId) {
          return {
            ...e,
            completedMissionsCount: e.completedMissionsCount + 1,
            totalSpent: e.totalSpent + amount
          };
        }
        return e;
      }));
    }

    // Student notification
    const payoutNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: app.studentId,
      title: 'Payment Credited! 💸',
      message: `${amount} DT has been successfully transferred to your balance for completing "${job?.title}".`,
      type: 'payout',
      linkTarget: 'dashboard',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [payoutNotif, ...prev]);
  };

  const createJob = (jobData: Omit<JobMission, 'id' | 'createdAt' | 'filledPositions' | 'status'>) => {
    const newJob: JobMission = {
      ...jobData,
      id: `job-${Date.now()}`,
      employerId: currentEmployer.id,
      companyName: currentEmployer.companyName,
      companyLogo: currentEmployer.logo,
      isCompanyVerified: currentEmployer.verificationStatus === 'verified',
      employerRating: currentEmployer.rating,
      filledPositions: 0,
      status: 'open',
      createdAt: new Date().toISOString()
    };

    setJobs(prev => [newJob, ...prev]);

    // Update employer posted count
    setAllEmployers(prev => prev.map(e => {
      if (e.id === currentEmployer.id) {
        return { ...e, jobsPostedCount: e.jobsPostedCount + 1 };
      }
      return e;
    }));

    // Notify students interested in category
    const broadcastNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: currentStudent.id,
      title: `New Mission in ${newJob.city}! 🚀`,
      message: `${newJob.companyName} just posted "${newJob.title}" (${newJob.hourlyRate} DT/hr).`,
      type: 'system',
      linkTarget: 'jobs',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [broadcastNotif, ...prev]);
  };

  const updateStudentProfile = (updated: Partial<StudentProfile>) => {
    setAllStudents(prev => prev.map(s => {
      if (s.id === currentStudent.id) {
        return { ...s, ...updated };
      }
      return s;
    }));
  };

  const updateEmployerProfile = (updated: Partial<EmployerProfile>) => {
    setAllEmployers(prev => prev.map(e => {
      if (e.id === currentEmployer.id) {
        return { ...e, ...updated };
      }
      return e;
    }));
  };

  const sendMessage = (recipientId: string, content: string, jobId?: string, jobTitle?: string) => {
    const isSenderStudent = role === 'student';
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId: `conv-${isSenderStudent ? currentStudent.id : currentEmployer.id}-${recipientId}`,
      jobId,
      jobTitle,
      senderId: isSenderStudent ? currentStudent.id : currentEmployer.id,
      senderName: isSenderStudent ? currentStudent.fullName : currentEmployer.companyName,
      senderAvatar: isSenderStudent ? currentStudent.avatar : currentEmployer.logo,
      senderRole: isSenderStudent ? 'student' : 'employer',
      recipientId,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages(prev => [...prev, newMsg]);

    // Add recipient notification
    const msgNotif: Notification = {
      id: `notif-${Date.now()}`,
      userId: recipientId,
      title: `New Message from ${newMsg.senderName} 💬`,
      message: content.length > 50 ? `${content.substring(0, 50)}...` : content,
      type: 'message',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [msgNotif, ...prev]);
  };

  const addReview = (rating: number, comment: string) => {
    if (!reviewTarget) return;

    const isStudentAuthor = role === 'student';
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      jobId: reviewTarget.jobId,
      jobTitle: reviewTarget.jobTitle,
      fromUserId: isStudentAuthor ? currentStudent.id : currentEmployer.id,
      fromUserName: isStudentAuthor ? currentStudent.fullName : currentEmployer.companyName,
      fromUserAvatar: isStudentAuthor ? currentStudent.avatar : currentEmployer.logo,
      fromRole: isStudentAuthor ? 'student' : 'employer',
      toUserId: reviewTarget.toUserId,
      rating,
      comment,
      createdAt: new Date().toISOString()
    };

    setReviews(prev => [newRev, ...prev]);
    setIsReviewModalOpen(false);
    setReviewTarget(null);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const verifyEmployer = (employerId: string) => {
    setAllEmployers(prev => prev.map(e => e.id === employerId ? { ...e, verificationStatus: 'verified' } : e));
    setJobs(prev => prev.map(j => j.employerId === employerId ? { ...j, isCompanyVerified: true } : j));
  };

  const moderateJobStatus = (jobId: string, status: 'open' | 'cancelled') => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status } : j));
  };

  const toggleUserSuspension = (userId: string, isStudent: boolean) => {
    if (isStudent) {
      setAllStudents(prev => prev.map(s => s.id === userId ? { ...s, isVerified: !s.isVerified } : s));
    } else {
      setAllEmployers(prev => prev.map(e => e.id === userId ? {
        ...e,
        verificationStatus: e.verificationStatus === 'verified' ? 'unverified' : 'verified'
      } : e));
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        student: currentStudent,
        employer: currentEmployer,
        allStudents,
        allEmployers,
        jobs,
        applications,
        bookmarkedJobIds,
        reviews,
        notifications,
        messages,
        filter,
        setFilter,
        resetFilter,
        selectedJobForDetails,
        setSelectedJobForDetails,
        selectedJobForApply,
        setSelectedJobForApply,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isChatDrawerOpen,
        setIsChatDrawerOpen,
        chatPartner,
        setChatPartner,
        isPostJobModalOpen,
        setIsPostJobModalOpen,
        isMissionPassOpen,
        setIsMissionPassOpen,
        activePassApplication,
        setActivePassApplication,
        isReviewModalOpen,
        setIsReviewModalOpen,
        reviewTarget,
        setReviewTarget,
        toggleBookmark,
        applyToJob,
        updateApplicationStatus,
        checkInMission,
        completeMissionAndPayout,
        createJob,
        updateStudentProfile,
        updateEmployerProfile,
        sendMessage,
        addReview,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        verifyEmployer,
        moderateJobStatus,
        toggleUserSuspension
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
