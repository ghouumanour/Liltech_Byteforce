import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { loadMissions,loadApplications,publishMission,submitApplication,transitionApplication } from '../../backend/services/missions';
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
  authenticated: boolean;
  demoMode: boolean;
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
  authModalMode: 'login' | 'signup' | 'forgot' | 'reset';
  setAuthModalMode: (mode: 'login' | 'signup' | 'forgot' | 'reset') => void;
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
  applyToJob: (jobId: string, coverNote: string, cvAttached: boolean) => Promise<boolean>;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  checkInMission: (appId: string) => void;
  completeMissionAndPayout: (appId: string) => void;
  createJob: (jobData: Omit<JobMission, 'id' | 'createdAt' | 'filledPositions' | 'status'>) => Promise<boolean>;
  updateStudentProfile: (updated: Partial<StudentProfile>) => Promise<boolean>;
  updateEmployerProfile: (updated: Partial<EmployerProfile>) => Promise<boolean>;
  sendMessage: (recipientId: string, content: string, jobId?: string, jobTitle?: string) => void;
  addReview: (rating: number, comment: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  verifyEmployer: (employerId: string) => void;
  moderateJobStatus: (jobId: string, status: 'open' | 'cancelled') => void;
  toggleUserSuspension: (userId: string, isStudent: boolean) => void;
}

const EMPTY_STUDENT:StudentProfile={id:'',userId:'',fullName:'',email:'',phone:'',avatar:'',dob:'',university:'',fieldOfStudy:'',academicLevel:'Autre',city:'',bio:'',skills:[],languages:[],experiences:[],certificates:[],availabilitySlots:[],preferredCategories:[],rating:0,reviewCount:0,completedMissionsCount:0,totalEarnings:0,isVerified:false};
const EMPTY_EMPLOYER:EmployerProfile={id:'',userId:'',companyName:'',logo:'',industry:'',registrationNumber:'',description:'',website:'',address:'',city:'',verificationStatus:'unverified',contactPerson:'',contactEmail:'',contactPhone:'',rating:0,reviewCount:0,jobsPostedCount:0,completedMissionsCount:0,totalSpent:0};
const STUDENT_FIELDS={fullName:'full_name',phone:'phone',avatar:'avatar_url',dob:'dob',university:'university',fieldOfStudy:'study_field',academicLevel:'academic_level',city:'city',bio:'bio',skills:'skills',languages:'languages',experiences:'experiences',certificates:'certificates',availabilitySlots:'availability_slots',preferredCategories:'preferred_categories',portfolioUrl:'portfolio_url',cvUrl:'cv_url'};
const EMPLOYER_FIELDS={companyName:'company_name',logo:'company_logo_url',industry:'industry',registrationNumber:'registration_number',description:'description',website:'website',address:'address',city:'city',contactPerson:'full_name',contactPhone:'phone'};
function mapFields(value:object,fields:Record<string,string>){return Object.fromEntries(Object.entries(value).filter(([key])=>key in fields).map(([key,v])=>[fields[key],key==='dob'&&!v?null:v]));}
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
    return 'guest';
  });

  const [activeTab, setActiveTab] = useState<string>('explore');

  const [allStudents, setAllStudents] = useState<StudentProfile[]>(() => {
    return [];
  });

  const [allEmployers, setAllEmployers] = useState<EmployerProfile[]>(() => {
    return [];
  });

  const [jobs, setJobs] = useState<JobMission[]>(() => {
    return [];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    return [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    return [];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return [];
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [];
  });

  const [bookmarkedJobIds, setBookmarkedJobIds] = useState<string[]>(() => {
    return [];
  });

  const [filter, setFilter] = useState<JobFilter>(initialFilter);

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<JobMission | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobMission | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | 'forgot' | 'reset'>('login');
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState(false);
  const [chatPartner, setChatPartner] = useState<{ id: string; name: string; avatar: string; role: 'student' | 'employer'; jobId?: string; jobTitle?: string } | null>(null);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);
  const [isMissionPassOpen, setIsMissionPassOpen] = useState(false);
  const [activePassApplication, setActivePassApplication] = useState<Application | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<{ jobId: string; jobTitle: string; toUserId: string; toUserName: string; toRole: 'student' | 'employer' } | null>(null);

  const [authenticated, setAuthenticated] = useState(false);
  const [accountRole, setAccountRole] = useState<UserRole>('guest');
  const demoMode = false;
  useEffect(() => {
    let active = true;
    let generation = 0;
    async function synchronize(userId: string | undefined) {
      const id = ++generation;
      if (!userId) { if(active){setAllStudents([]);setAllEmployers([]);setApplications([]);setBookmarkedJobIds([]);setMessages([]);setNotifications([]);setReviews([]);setAuthenticated(false);setAccountRole('guest');setRoleState('guest');setActiveTab('explore');} return; }
      const {data:p,error} = await supabase.from('profiles').select('*').eq('id',userId).single();
      if (!active || id!==generation) return;
      if (error || !p || !['student','employer','admin'].includes(p.role)) {setAuthenticated(false);setRoleState('guest');setActiveTab('explore');return;}
      setAuthenticated(true);setAccountRole(p.role);
      if(p.role==='student') setAllStudents([{id:p.id,userId:p.id,fullName:p.full_name,email:p.email,phone:p.phone||'',avatar:p.avatar_url||'',dob:p.dob||'',university:p.university||'',fieldOfStudy:p.study_field||'',academicLevel:p.academic_level||'Autre',city:p.city||'Sousse',bio:p.bio||'',skills:p.skills||[],languages:p.languages||[],experiences:p.experiences||[],certificates:p.certificates||[],availabilitySlots:p.availability_slots||[],preferredCategories:p.preferred_categories||[],portfolioUrl:p.portfolio_url||undefined,rating:Number(p.rating||0),reviewCount:p.reviews_count||0,completedMissionsCount:0,totalEarnings:Number(p.available_balance||0),isVerified:!!p.is_verified_student,cvUrl:p.cv_url||undefined}]);
      if(p.role==='employer') setAllEmployers([{id:p.id,userId:p.id,companyName:p.company_name||p.full_name,logo:p.company_logo_url||'',industry:p.industry||'',registrationNumber:p.registration_number||'',description:p.description||'',website:p.website||'',address:p.address||'',city:p.city||'Sousse',verificationStatus:'unverified',contactPerson:p.full_name,contactEmail:p.email,contactPhone:p.phone||'',rating:Number(p.rating||0),reviewCount:p.reviews_count||0,jobsPostedCount:0,completedMissionsCount:0,totalSpent:0}]);
      setJobs([]);setApplications([]);setReviews([]);setNotifications([]);setMessages([]);setBookmarkedJobIds([]);
      if(p.role==='student') {const {data:b}=await supabase.from('bookmarks').select('mission_id').eq('student_id',p.id);if(!active||id!==generation)return;setBookmarkedJobIds((b||[]).map(x=>x.mission_id));}
      setRoleState(p.role);setActiveTab(p.role==='admin'?'metrics':'dashboard');
    }
    const {data:{subscription}}=supabase.auth.onAuthStateChange((event,session)=>{
      if(event==='TOKEN_REFRESHED')return;
      if(event==='PASSWORD_RECOVERY'){ setAuthModalMode('reset');setIsAuthModalOpen(true);return; }
      setTimeout(()=>{if(active)void synchronize(session?.user.id)},0);
    });
    return ()=>{active=false;subscription.unsubscribe()};
  }, []);

  useEffect(()=>{if(!demoMode){let alive=true;const refresh=()=>{void loadMissions().then(v=>{if(alive)setJobs(v)}).catch(console.error);if(authenticated)void loadApplications().then(v=>{if(alive)setApplications(v)}).catch(console.error);};refresh();const timer=setInterval(refresh,5000);return()=>{alive=false;clearInterval(timer)};}},[authenticated,demoMode]);
  // Active user reference
  const currentStudent = allStudents[0] || EMPTY_STUDENT;
  const currentEmployer = allEmployers[0] || EMPTY_EMPLOYER;

  // Save to localStorage when state updates
  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_role', role);
  }, [role]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_students', JSON.stringify(allStudents));
  }, [allStudents]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_employers', JSON.stringify(allEmployers));
  }, [allEmployers]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if(import.meta.env.VITE_DEMO_MODE === 'true' && !authenticated) localStorage.setItem('getboth_bookmarks', JSON.stringify(bookmarkedJobIds));
  }, [bookmarkedJobIds]);

  const setRole = (newRole: UserRole) => {
    if (!demoMode) {
      if (newRole === 'guest') { void supabase.auth.signOut(); setAuthenticated(false);setAccountRole('guest');setRoleState('guest');setActiveTab('explore');return; }
      if (!authenticated) { setAuthModalMode('login');setIsAuthModalOpen(true);return; }
      if (newRole !== accountRole) return;
    }
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

  const toggleBookmark = async (jobId: string) => {
    if(!authenticated){setAuthModalMode('login');setIsAuthModalOpen(true);return;}if(role!=='student')return;
    const existing=bookmarkedJobIds.includes(jobId);const result=existing?await supabase.from('bookmarks').delete().eq('student_id',currentStudent.id).eq('mission_id',jobId):await supabase.from('bookmarks').upsert({student_id:currentStudent.id,mission_id:jobId},{ignoreDuplicates:true});if(result.error){alert(result.error.message);return;}
    setBookmarkedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const applyToJob = async (jobId: string, coverNote: string, cvAttached: boolean): Promise<boolean> => {
    if(!demoMode){if(!authenticated||role!=='student')return false;try{await submitApplication(jobId,currentStudent.fullName,coverNote,cvAttached);setApplications(await loadApplications());return true;}catch(e){alert(e instanceof Error?e.message:String((e as any)?.message||e));return false;}}
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
      title: 'New Applicant Received! ',
      message: `${currentStudent.fullName} applied for your mission "${job.title}".`,
      type: 'application',
      linkTarget: 'applicants',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [empNotification, ...prev]);

    return true;
  };

  const runTransition = async (appId:string,action:string) => {
    try {
      await transitionApplication(appId,action);
      const [apps,missions]=await Promise.all([loadApplications(),loadMissions()]);
      setApplications(apps);setJobs(missions);
      setActivePassApplication(prev=>prev?.id===appId?(apps.find(a=>a.id===appId)||null):prev);
      const {data:{user}}=await supabase.auth.getUser();
      if(user && role==='student'){const {data:p}=await supabase.from('profiles').select('available_balance').eq('id',user.id).single();if(p)setAllStudents(v=>v.map(x=>x.id===user.id?{...x,totalEarnings:Number(p.available_balance||0),completedMissionsCount:apps.filter(a=>a.studentId===user.id&&a.status==='completed').length}:x));}
    } catch(e){alert((e as any)?.message||'Mission action failed');}
  };
  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    if(!demoMode){if(authenticated)void runTransition(appId,status);return;}
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
            title: 'You are Hired! ',
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
    if(!demoMode){if(authenticated)void runTransition(appId,'check_in');return;}
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return { ...app, checkedIn: true };
      }
      return app;
    }));
  };

  const completeMissionAndPayout = (appId: string) => {
    if(!demoMode){if(authenticated)void runTransition(appId,'completed');return;}
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
      title: 'Payment Credited! ',
      message: `${amount} DT has been successfully transferred to your balance for completing "${job?.title}".`,
      type: 'payout',
      linkTarget: 'dashboard',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [payoutNotif, ...prev]);
  };

  const createJob = async (jobData: Omit<JobMission, 'id' | 'createdAt' | 'filledPositions' | 'status'>):Promise<boolean> => {
    if(!demoMode){if(!authenticated||role!=='employer')return false;try{await publishMission(jobData);setJobs(await loadMissions());return true;}catch(e){alert(e instanceof Error?e.message:String((e as any)?.message||e));return false;}}
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
      title: `New Mission in ${newJob.city}! `,
      message: `${newJob.companyName} just posted "${newJob.title}" (${newJob.hourlyRate} DT/hr).`,
      type: 'system',
      linkTarget: 'jobs',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [broadcastNotif, ...prev]);
    return true;
  };

  const updateStudentProfile = async (updated: Partial<StudentProfile>):Promise<boolean> => {
    if(!authenticated||role!=='student')return false;
    const {error}=await supabase.from('profiles').update(mapFields(updated,STUDENT_FIELDS)).eq('id',currentStudent.id).select('id').single();if(error){alert(error.message);return false;}
    delete updated.email;
    setAllStudents(prev => prev.map(s => {
      if (s.id === currentStudent.id) {
        return { ...s, ...updated };
      }
      return s;
    }));
    return true;
  };

  const updateEmployerProfile = async (updated: Partial<EmployerProfile>):Promise<boolean> => {
    if(!authenticated||role!=='employer')return false;
    const {error}=await supabase.from('profiles').update(mapFields(updated,EMPLOYER_FIELDS)).eq('id',currentEmployer.id).select('id').single();if(error){alert(error.message);return false;}
    delete updated.contactEmail;
    setAllEmployers(prev => prev.map(e => {
      if (e.id === currentEmployer.id) {
        return { ...e, ...updated };
      }
      return e;
    }));
    return true;
  };

  const sendMessage = (recipientId: string, content: string, jobId?: string, jobTitle?: string) => {
    if(!demoMode){alert('This feature is not connected to the live database yet.');return;}
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
      title: `New Message from ${newMsg.senderName} `,
      message: content.length > 50 ? `${content.substring(0, 50)}...` : content,
      type: 'message',
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [msgNotif, ...prev]);
  };

  const addReview = (rating: number, comment: string) => {
    if(!demoMode){alert('This feature is not connected to the live database yet.');return;}
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
    if(!demoMode){alert('This feature is not connected to the live database yet.');return;}
    setAllEmployers(prev => prev.map(e => e.id === employerId ? { ...e, verificationStatus: 'verified' } : e));
    setJobs(prev => prev.map(j => j.employerId === employerId ? { ...j, isCompanyVerified: true } : j));
  };

  const moderateJobStatus = (jobId: string, status: 'open' | 'cancelled') => {
    if(!demoMode){alert('This feature is not connected to the live database yet.');return;}
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status } : j));
  };

  const toggleUserSuspension = (userId: string, isStudent: boolean) => {
    if(!demoMode){alert('This feature is not connected to the live database yet.');return;}
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
        authenticated,
        demoMode,
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
