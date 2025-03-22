import { AdminRole, TechnicalRole, TeachingRole, LearningRole, MentoringRole, UserRole } from '../../types/roles';

export interface User {
    id: string;
    email: string;
    password: string;
    displayName: string;
    role: AdminRole | TechnicalRole | TeachingRole | LearningRole | MentoringRole | UserRole;
    emailVerified: boolean;
    photoURL?: string;
    experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    technologies?: string[];
    interests?: string[];
    bio?: string;
    location?: string;
    workExperience?: string;
    education?: string;
    socialLinks?: {
        github?: string;
        linkedin?: string;
        website?: string;
    };
    stats?: {
        proyectosCompletados: number;
        cursosCompletados: number;
        contribuciones: number;
        seguidores: number;
    };
    mentorInfo?: {
        level: 'junior' | 'intermediate' | 'senior' | 'expert';
        specialties: string[];
        studentsHelped: number;
        averageRating: number;
        completedSessions: number;
        successRate: number;
        hourlyRate: number;
        availability: {
            hoursPerWeek: number;
            timeZone: string;
            preferredHours: string[];
        };
    };
    studentInfo?: {
        level: 'beginner' | 'intermediate' | 'advanced';
        enrolledCourses: string[];
        completedCourses: string[];
        currentMentor?: string;
    };
    createdAt: string;
    lastLoginAt?: string;
}

export interface StorageInterface {
    initialize(): Promise<void>;
    clear(): Promise<void>;
    
    // Operaciones de usuario
    createUser(userData: Omit<User, 'id'>): Promise<User>;
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
    deleteUser(id: string): Promise<void>;
    
    // Operaciones de tecnologías
    addTechnology(userId: string, technology: string): Promise<void>;
    removeTechnology(userId: string, technology: string): Promise<void>;
    getUserTechnologies(userId: string): Promise<string[]>;
    getAllUsers(): Promise<User[]>;
    debugDatabase(): Promise<{ users: User[]; technologies: any[] }>;
} 