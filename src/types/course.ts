export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  videoUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar?: string;
  };
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  totalStudents: number;
  category: string;
  thumbnail?: string;
  courseType: 'live' | 'recorded';
  hasSpecificStartDate: boolean;
  startDate: string;
  price: number;
  mentor: string;
  enrolledStudents: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  technologies?: string[];
  requirements?: string[];
  chapters?: Chapter[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment';
  duration: string;
  completed: boolean;
}

export interface CourseDetail extends Course {
  lessons: Lesson[];
  requirements: string[];
  whatYouWillLearn: string[];
  instructor: {
    name: string;
    avatar?: string;
    bio: string;
  };
}

export interface CourseContent {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'assignment';
  duration: string;
  order: number;
  status: 'published' | 'draft';
} 