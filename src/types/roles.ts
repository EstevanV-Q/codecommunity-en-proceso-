// Roles administrativos (gestión de la plataforma)
export type AdminRole = 
  // Núcleo Ejecutivo
  | 'founder' 
  | 'owner'
  
  // Equipo Técnico
  | 'cto'
  | 'seniorDev'
  | 'juniorDev'
  | 'devOps'
  
  // Equipo de Moderación
  | 'admin'
  | 'moderator'
  | 'helper'
  
  // Departamentos Especializados
  | 'marketing'
  | 'accounting'
  | 'designer'
  
  // Roles Educativos
  | 'professor'
  | 'instructor'
  | 'teachingAssistant'
  | 'student'
  | 'mentee'
  | 'seniorMentor'
  | 'mentor'
  | 'juniorMentor'
  
  // Roles de Comunidad
  | 'viewer'
  | 'subscriber'
  
  // Usuario regular
  | 'user';

// Roles técnicos (desarrollo y mantenimiento)
export type TechnicalRole = 'cto' | 'seniorDev' | 'juniorDev' | 'devOps';

// Roles educativos
export type TeachingRole = 'professor' | 'instructor' | 'teachingAssistant';
export type LearningRole = 'student' | 'mentee';
export type MentoringRole = 'seniorMentor' | 'mentor' | 'juniorMentor';

// Roles de usuario regular
export type UserRole = 'student' | 'viewer' | 'subscriber';

// Roles de mentor
export type MentorLevel = 'junior' | 'intermediate' | 'senior' | 'expert';
export type MentorSpecialty = 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'ai';
export type MentorStatus = 'active' | 'inactive' | 'onLeave';

// Roles por área
export interface UserRoles {
  administrative?: AdminRole[];
  technical?: TechnicalRole[];
  teaching?: TeachingRole[];
  learning?: LearningRole[];
  mentoring?: MentoringRole[];
}

// Estado del usuario
export type UserStatus = 'active' | 'inactive';

// Interface para usuario con roles
export interface UserWithRoles {
  id: string;
  name: string;
  email: string;
  roles: UserRoles;
  status: UserStatus;
  technologies?: string[];
  createdAt: string;
  specializations?: string[]; // Para mentores y profesores
  level?: 'beginner' | 'intermediate' | 'advanced'; // Para estudiantes
}

// Tipo unión de todos los roles
export type Role = AdminRole | TechnicalRole | TeachingRole | LearningRole | MentoringRole;

// Función para verificar si un usuario tiene un rol específico en un área
export const hasRole = (
  userRoles: UserRoles,
  area: keyof UserRoles,
  role: Role
): boolean => {
  const roles = userRoles[area];
  if (!roles) return false;

  switch (area) {
    case 'administrative':
      return (roles as AdminRole[]).includes(role as AdminRole);
    case 'technical':
      return (roles as TechnicalRole[]).includes(role as TechnicalRole);
    case 'teaching':
      return (roles as TeachingRole[]).includes(role as TeachingRole);
    case 'learning':
      return (roles as LearningRole[]).includes(role as LearningRole);
    case 'mentoring':
      return (roles as MentoringRole[]).includes(role as MentoringRole);
    default:
      return false;
  }
};

// Función para verificar si un usuario tiene acceso a un área específica
export const hasAreaAccess = (userRoles: UserRoles, area: keyof UserRoles): boolean => {
  return Boolean(userRoles[area]?.length);
};

// Interface para usuario regular
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
  preferences?: {
    notifications: boolean;
    newsletter: boolean;
    language: string;
  };
}

// Interface para mentor
export interface Mentor {
  id: string;
  name: string;
  email: string;
  level: MentorLevel;
  specialties: MentorSpecialty[];
  status: MentorStatus;
  createdAt: string;
  availability: {
    hoursPerWeek: number;
    timeZone: string;
    preferredHours: string[];
  };
  experience: {
    yearsOfExperience: number;
    technologies: string[];
    languages: string[];
  };
  metrics?: {
    studentsHelped: number;
    averageRating: number;
    completedSessions: number;
    successRate: number;
  };
  pricing?: {
    hourlyRate: number;
    currency: string;
    packages: {
      hours: number;
      price: number;
      description: string;
    }[];
  };
} 