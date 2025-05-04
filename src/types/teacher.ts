export interface TeacherDashboard {
  courses: Array<{
    id: string;
    title: string;
    students: number;
    activeStudents: number;
    completionRate: number;
    averageRating: number;
    lastActivity: string;
  }>;
  earnings: {
    totalEarnings: number;
    platformFee: number;
    netEarnings: number;
    pendingPayments: number;
    paymentHistory: Array<{
      id: string;
      amount: number;
      date: string;
      status: 'pending' | 'paid' | 'failed';
      courseId: string;
    }>;
  };
  students: Array<{
    id: string;
    name: string;
    email: string;
    enrolledCourses: string[];
    lastActivity: string;
    progress: Array<{
      courseId: string;
      progress: number;
      lastAccessed: string;
    }>;
  }>;
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      studentQuestions: boolean;
      courseUpdates: boolean;
      paymentNotifications: boolean;
    };
    availability: {
      timeZone: string;
      workingHours: {
        start: string;
        end: string;
      };
      days: string[];
    };
    communication: {
      preferredMethod: 'email' | 'platform' | 'both';
      responseTime: number;
    };
  };
}

export interface CourseManagement {
  courses: Array<{
    id: string;
    title: string;
    description: string;
    students: number;
    status: 'active' | 'inactive';
    lastUpdated: string;
  }>;
}

export interface CourseContentManagement {
  content: Array<{
    id: string;
    title: string;
    type: 'lesson' | 'quiz' | 'assignment';
    duration: string;
    order: number;
    status: 'published' | 'draft';
  }>;
}

export interface StudentManagement {
  students: Array<{
    id: string;
    name: string;
    email: string;
    enrolledCourses: number;
    progress: number;
    lastActivity: string;
  }>;
} 