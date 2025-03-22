export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number;
  technologies: string[];
  requirements: string[];
  isPublished: boolean;
  price: number;
  mentor: string;
  enrolledStudents: number;
  rating: number;
  hasSpecificStartDate: boolean;
  startDate: string;
  createdAt: string;
  updatedAt: string;
  courseType: 'recorded' | 'live';
  thumbnail?: string;
} 