export type UserRole = 'student' | 'employer' | 'admin' | 'guest';

export interface StudentExperience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  dob: string;
  university: string;
  fieldOfStudy: string;
  academicLevel: 'Licence 1' | 'Licence 2' | 'Licence 3' | 'Master 1' | 'Master 2' | 'Cycle Ingénieur' | 'Autre';
  city: string;
  bio: string;
  skills: string[];
  languages: { name: string; level: 'Basic' | 'Intermediate' | 'Fluent' | 'Native' }[];
  experiences: StudentExperience[];
  cvUrl?: string;
  portfolioUrl?: string;
  certificates: string[];
  availabilitySlots: {
    day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    slots: ('Morning' | 'Afternoon' | 'Evening')[];
  }[];
  preferredCategories: string[];
  rating: number;
  reviewCount: number;
  completedMissionsCount: number;
  totalEarnings: number;
  isVerified: boolean;
}

export interface EmployerProfile {
  id: string;
  userId: string;
  companyName: string;
  logo: string;
  industry: string;
  registrationNumber: string; // Matricule Fiscal
  description: string;
  website: string;
  address: string;
  city: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  rating: number;
  reviewCount: number;
  jobsPostedCount: number;
  completedMissionsCount: number;
  totalSpent: number;
}

export interface JobMission {
  id: string;
  employerId: string;
  companyName: string;
  companyLogo: string;
  isCompanyVerified: boolean;
  employerRating: number;
  title: string;
  category: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  requiredSkills: string[];
  hourlyRate: number; // in DT (Tunisian Dinar)
  durationHours: number;
  totalPayment: number; // hourlyRate * durationHours
  city: string;
  address: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "14:00"
  endTime: string; // e.g. "18:00"
  availablePositions: number;
  filledPositions: number;
  urgency: 'normal' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  attire?: string;
  transportProvided?: boolean;
  mealProvided?: boolean;
  createdAt: string;
}

export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'accepted' | 'rejected' | 'completed';

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentUniversity: string;
  studentField: string;
  studentRating: number;
  coverNote: string;
  cvAttached: boolean;
  cvFileName?: string;
  status: ApplicationStatus;
  payoutStatus: 'unpaid' | 'escrowed' | 'released';
  appliedAt: string;
  acceptedAt?: string;
  completedAt?: string;
  checkInCode?: string;
  checkedIn: boolean;
}

export interface Review {
  id: string;
  jobId: string;
  jobTitle: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar: string;
  fromRole: 'student' | 'employer';
  toUserId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  jobId?: string;
  jobTitle?: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'student' | 'employer';
  recipientId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'hire' | 'payout' | 'message' | 'system' | 'reminder';
  linkTarget?: string;
  isRead: boolean;
  createdAt: string;
}

export interface JobFilter {
  search: string;
  category: string;
  city: string;
  minRate: number;
  maxRate: number;
  urgencyOnly: boolean;
  sortBy: 'newest' | 'rate-desc' | 'rate-asc' | 'duration-asc' | 'employer-rating';
}
