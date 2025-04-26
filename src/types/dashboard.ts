// Interfaces para el Technical Dashboard
export interface SystemMetrics {
  cpu: {
    usage: number;
    temperature: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
  };
  network: {
    upload: number;
    download: number;
    latency: number;
  };
}

export interface CodeMetrics {
  coverage: number;
  qualityGate: string;
  bugs: number;
  vulnerabilities: number;
  codeSmells: number;
  technicalDebt: number;
  duplications: number;
  maintainability: string;
}

export interface DeploymentInfo {
  id: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  status: 'success' | 'failed' | 'in-progress';
  timestamp: string;
  commitHash: string;
  author: string;
  changes: string[];
}

export interface SecurityAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  status: 'open' | 'resolved' | 'in-progress';
  timestamp: string;
  affectedComponent: string;
  type: 'vulnerability' | 'dependency' | 'configuration';
  affected: string;
  discovered: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  service: string;
  message: string;
  metadata?: Record<string, any>;
}

// Interfaces para el Teacher Dashboard
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number; // en horas
  technologies: string[];
  requirements: string[];
  isPublished: boolean;
  price: number;
  mentor: string;
  enrolledStudents: number;
  rating: number;
  hasSpecificStartDate: boolean;
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  courseType: 'recorded' | 'live';
  isPublic: boolean;
  coverImage?: string;
  liveClassroom?: {
    meetingLink: string;
    meetingId: string;
    meetingPassword: string;
    schedule: Array<{
      date: string;
      startTime: string;
      endTime: string;
      topic: string;
    }>;
  };
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: {
    courseProgress: number;
    assignmentsCompleted: number;
    totalAssignments: number;
    averageGrade: number;
    lastActivity: string;
    trend: 'up' | 'down' | 'stable';
  };
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  courseId: string;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
  type: 'file' | 'text' | 'quiz';
  submissions: AssignmentSubmission[];
  totalStudents: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  status: 'submitted' | 'late' | 'missing';
  grade: number | null;
  feedback: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: 'assignment' | 'course' | 'meeting';
  description?: string;
}

export type AdminRole = 'teacher' | 'admin' | 'technical' | 'founder' | 'owner' | 'cto' | 'seniorDev' | 'dev' | 'assistant' | 'student';

export interface DashboardConfig {
  id: string;
  title: string;
  component: React.ComponentType;
  role: AdminRole;
  features: DashboardFeature[];
}

export interface DashboardFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
} 