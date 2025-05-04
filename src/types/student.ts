export interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nextLesson?: string;
}

export interface StudyGroup {
  id: string;
  name: string;
  members: Array<{
    id: string;
    name: string;
    avatar?: string;
    role: 'admin' | 'member';
  }>;
  activeDiscussions: number;
  discussions?: Array<{
    id: string;
    title: string;
    author: string;
    replies: number;
    lastActivity: string;
  }>;
  description?: string;
  isPrivate?: boolean;
}

export interface Feedback {
  id: string;
  courseName: string;
  rating: number;
  comment: string;
  studentName: string;
  studentAvatar?: string;
  date: string;
  tags?: string[];
}

export interface StudentDashboard {
  enrolledCourses: EnrolledCourse[];
  studyGroups: StudyGroup[];
  feedback: Feedback[];
  recentActivity: Array<{
    id: string;
    type: 'course' | 'assignment' | 'discussion';
    title: string;
    date: string;
    status: 'completed' | 'pending' | 'overdue';
  }>;
}

export interface CourseInteraction {
  id: string;
  courseId: string;
  type: 'comment' | 'question' | 'answer';
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  replies?: CourseInteraction[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  isResolved?: boolean;
} 