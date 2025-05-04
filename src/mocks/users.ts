import { AdminRole, TechnicalRole, TeachingRole, LearningRole, MentoringRole, UserRole } from '../types/roles';

export interface MentorPermissions {
  'courses.create'?: boolean;
  'courses.edit'?: boolean;
  'courses.manage'?: boolean;
  'content.create'?: boolean;
  'content.edit'?: boolean;
  'content.moderate'?: boolean;
  [key: string]: boolean | undefined;
}

export interface MockUser {
  id: string;
  email: string;
  password: string;
  displayName: string;
  role: AdminRole | TechnicalRole | TeachingRole | LearningRole | MentoringRole | UserRole;
  roles?: (AdminRole | TechnicalRole | TeachingRole | LearningRole | MentoringRole | UserRole)[];
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
  specialization?: string;
  availability?: string;
  rating?: number;
  students?: Array<{
    name: string;
    email: string;
  }>;
  permissions?: MentorPermissions;
}

export const mockUsers: MockUser[] = [
  // Roles Administrativos
  {
    id: '1',
    email: 'founder@codecommunity.com',
    password: 'Founder2024!',
    displayName: 'Fundador Principal',
    role: 'founder',
    roles: ['founder', 'admin'],
    emailVerified: true,
    photoURL: '/assets/avatars/founder-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
    interests: ['Desarrollo Web', 'Cloud Computing', 'Arquitectura de Software'],
    bio: 'Fundador y líder técnico de CodeCommunity con más de 10 años de experiencia en desarrollo de software.',
    location: 'Madrid, España',
    workExperience: 'CTO y Fundador de CodeCommunity',
    education: 'Máster en Ingeniería de Software',
    socialLinks: {
      github: 'https://github.com/founder',
      linkedin: 'https://linkedin.com/in/founder',
      website: 'https://founder-portfolio.com'
    },
    stats: {
      proyectosCompletados: 25,
      cursosCompletados: 15,
      contribuciones: 300,
      seguidores: 150
    }
  },
  {
    id: '2',
    email: 'owner@codecommunity.com',
    password: 'Owner2024!',
    displayName: 'Propietario',
    role: 'owner',
    roles: ['owner'],
    emailVerified: true,
    photoURL: '/assets/avatars/owner-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['Business Strategy', 'Project Management'],
    interests: ['Gestión Empresarial', 'Desarrollo de Negocios'],
    bio: 'Propietario y estratega principal de CodeCommunity',
    location: 'Barcelona, España',
    workExperience: 'CEO de CodeCommunity',
    education: 'MBA en Gestión Empresarial',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/owner'
    }
  },
  {
    id: '3',
    email: 'admin@codecommunity.com',
    password: 'Admin2024!',
    displayName: 'Administrador',
    role: 'admin',
    roles: ['admin'],
    emailVerified: true,
    photoURL: '/assets/avatars/admin-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['System Administration', 'Security'],
    interests: ['Gestión de Sistemas', 'Ciberseguridad'],
    bio: 'Administrador principal de la plataforma',
    location: 'Valencia, España',
    workExperience: 'Administrador de Sistemas Senior',
    education: 'Ingeniería en Sistemas'
  },
  {
    id: '4',
    email: 'moderator@codecommunity.com',
    password: 'Moderator2024!',
    displayName: 'Moderador',
    role: 'moderator',
    roles: ['moderator'],
    emailVerified: true,
    photoURL: '/assets/avatars/moderator-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['Community Management', 'Content Moderation'],
    interests: ['Gestión de Comunidad', 'Moderación de Contenido'],
    bio: 'Moderador principal de la comunidad',
    location: 'Sevilla, España',
    workExperience: 'Community Manager Senior',
    education: 'Comunicación Digital'
  },

  // Roles Técnicos
  {
    id: '5',
    email: 'cto@codecommunity.com',
    password: 'CTO2024!',
    displayName: 'CTO',
    role: 'cto',
    roles: ['cto'],
    emailVerified: true,
    photoURL: '/assets/avatars/cto-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['Architecture', 'Cloud', 'DevOps'],
    interests: ['Arquitectura de Software', 'Cloud Computing'],
    bio: 'Chief Technology Officer de CodeCommunity',
    location: 'Madrid, España',
    workExperience: 'CTO con 12 años de experiencia',
    education: 'Máster en Ingeniería de Software'
  },
  {
    id: '6',
    email: 'senior.dev@codecommunity.com',
    password: 'SeniorDev2024!',
    displayName: 'Desarrollador Senior',
    role: 'seniorDev',
    roles: ['seniorDev'],
    emailVerified: true,
    photoURL: '/assets/avatars/senior-dev-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
    interests: ['Desarrollo Full Stack', 'Cloud Architecture'],
    bio: 'Desarrollador Senior con 8 años de experiencia',
    location: 'Bilbao, España',
    workExperience: 'Senior Full Stack Developer',
    education: 'Ingeniería Informática'
  },
  {
    id: '7',
    email: 'junior.dev@codecommunity.com',
    password: 'JuniorDev2024!',
    displayName: 'Desarrollador Junior',
    role: 'juniorDev',
    roles: ['juniorDev'],
    emailVerified: true,
    photoURL: '/assets/avatars/junior-dev-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['JavaScript', 'React', 'Node.js'],
    interests: ['Frontend Development', 'Backend Development'],
    bio: 'Desarrollador Junior en crecimiento',
    location: 'Málaga, España',
    workExperience: 'Junior Full Stack Developer',
    education: 'Desarrollo Web'
  },

  // Roles de Soporte
  {
    id: '22',
    email: 'support@codecommunity.com',
    password: 'Support2024!',
    displayName: 'Soporte', 
    role: 'support',
    roles: ['support'],
    emailVerified: true,
    photoURL: '/assets/avatars/support-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['Customer Support', 'Technical Support']
  },
  {
    id: '23',
    email: 'supportll@codecommunity.com',
    password: 'SupportLL2024!',
    displayName: 'Soporte Nivel 2',
    role: 'supportll',
    roles: ['supportll'],
    emailVerified: true,
    photoURL: '/assets/avatars/supportll-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['Technical Support', 'Troubleshooting']
  },
  {
    id: '24',
    email: 'supportmanager@codecommunity.com',
    password: 'SupportManager2024!',
    displayName: 'Gerente de Soporte',
    role: 'supportManager',
    roles: ['supportManager'],
    emailVerified: true,
    photoURL: '/assets/avatars/support-manager-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['Team Management', 'Customer Support', 'Technical Support']
  },
  

  // Roles Educativos
  {
    id: '8',
    email: 'professor@codecommunity.com',
    password: 'Professor2024!',
    displayName: 'Profesor Principal',
    role: 'professor',
    roles: ['professor'],
    emailVerified: true,
    photoURL: '/assets/avatars/professor-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['Computer Science', 'Software Engineering'],
    interests: ['Educación', 'Investigación'],
    bio: 'Profesor con 15 años de experiencia en educación superior',
    location: 'Madrid, España',
    workExperience: 'Profesor Universitario',
    education: 'Doctorado en Ciencias de la Computación'
  },
  {
    id: '9',
    email: 'instructor@codecommunity.com',
    password: 'Instructor2024!',
    displayName: 'Instructor',
    role: 'instructor',
    roles: ['instructor'],
    emailVerified: true,
    photoURL: '/assets/avatars/instructor-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['Web Development', 'Mobile Development'],
    interests: ['Enseñanza', 'Desarrollo de Software'],
    bio: 'Instructor especializado en desarrollo web y móvil',
    location: 'Barcelona, España',
    workExperience: 'Instructor de Desarrollo Web',
    education: 'Ingeniería Informática'
  },
  {
    id: '10',
    email: 'teaching.assistant@codecommunity.com',
    password: 'Assistant2024!',
    displayName: 'Asistente de Enseñanza',
    role: 'teachingAssistant',
    roles: ['teachingAssistant'],
    emailVerified: true,
    photoURL: '/assets/avatars/assistant-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['JavaScript', 'Python', 'Java'],
    interests: ['Educación', 'Programación'],
    bio: 'Asistente de enseñanza especializado en programación básica',
    location: 'Valencia, España',
    workExperience: 'Asistente de Enseñanza',
    education: 'Ingeniería Informática'
  },

  // Roles de Aprendizaje
  {
    id: '11',
    email: 'advanced.student@codecommunity.com',
    password: 'Advanced2024!',
    displayName: 'Estudiante Avanzado',
    role: 'student',
    roles: ['student'],
    emailVerified: true,
    photoURL: '/assets/avatars/advanced-student-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['React', 'Node.js', 'TypeScript'],
    interests: ['Full Stack Development', 'Cloud Computing'],
    bio: 'Estudiante avanzado especializado en desarrollo full stack',
    location: 'Madrid, España',
    workExperience: 'Desarrollador Frontend',
    education: 'Ingeniería Informática',
    studentInfo: {
      level: 'advanced',
      enrolledCourses: ['React Avanzado', 'Node.js Profesional'],
      completedCourses: ['JavaScript Básico', 'HTML/CSS'],
      currentMentor: 'senior.mentor@codecommunity.com'
    }
  },
  {
    id: '12',
    email: 'intermediate.student@codecommunity.com',
    password: 'Intermediate2024!',
    displayName: 'Estudiante Intermedio',
    role: 'student',
    roles: ['student'],
    emailVerified: true,
    photoURL: '/assets/avatars/intermediate-student-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['JavaScript', 'React', 'CSS'],
    interests: ['Frontend Development', 'UI/UX Design'],
    bio: 'Estudiante intermedio enfocado en desarrollo frontend',
    location: 'Barcelona, España',
    workExperience: 'Desarrollador Frontend Junior',
    education: 'Desarrollo Web',
    studentInfo: {
      level: 'intermediate',
      enrolledCourses: ['React Intermedio', 'CSS Avanzado'],
      completedCourses: ['JavaScript Básico'],
      currentMentor: 'intermediate.mentor@codecommunity.com'
    }
  },
  {
    id: '13',
    email: 'beginner.student@codecommunity.com',
    password: 'Beginner2024!',
    displayName: 'Estudiante Principiante',
    role: 'student',
    roles: ['student'],
    emailVerified: true,
    photoURL: '/assets/avatars/beginner-student-avatar.jpg',
    experienceLevel: 'beginner',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    interests: ['Web Development', 'Programming'],
    bio: 'Estudiante principiante aprendiendo desarrollo web',
    location: 'Sevilla, España',
    workExperience: 'Sin experiencia previa',
    education: 'En curso - Desarrollo Web',
    studentInfo: {
      level: 'beginner',
      enrolledCourses: ['HTML/CSS Básico', 'JavaScript Básico'],
      completedCourses: [],
      currentMentor: 'junior.mentor@codecommunity.com'
    }
  },

  // Roles de Mentoría
  {
    id: '14',
    email: 'senior.mentor@codecommunity.com',
    password: 'SeniorMentor2024!',
    displayName: 'Mentor Senior',
    role: 'seniorMentor',
    roles: ['seniorMentor'],
    emailVerified: true,
    photoURL: '/assets/avatars/senior-mentor-avatar.jpg',
    experienceLevel: 'expert',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS'],
    interests: ['Mentoría', 'Desarrollo Full Stack'],
    bio: 'Mentor senior especializado en desarrollo full stack',
    location: 'Madrid, España',
    workExperience: 'Senior Full Stack Developer',
    education: 'Ingeniería Informática',
    mentorInfo: {
      level: 'senior',
      specialties: ['frontend', 'backend'],
      studentsHelped: 50,
      averageRating: 4.9,
      completedSessions: 200,
      successRate: 0.95,
      hourlyRate: 80,
      availability: {
        hoursPerWeek: 20,
        timeZone: 'UTC+1',
        preferredHours: ['10:00', '15:00', '18:00']
      }
    }
  },
  {
    id: '15',
    email: 'intermediate.mentor@codecommunity.com',
    password: 'IntermediateMentor2024!',
    displayName: 'Mentor Intermedio',
    role: 'mentor',
    roles: ['mentor'],
    emailVerified: true,
    photoURL: '/assets/avatars/intermediate-mentor-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['React Native', 'Node.js', 'Docker'],
    interests: ['Mentoría', 'Desarrollo Móvil'],
    bio: 'Mentor intermedio especializado en desarrollo móvil',
    location: 'Barcelona, España',
    workExperience: 'Mobile Developer',
    education: 'Ingeniería Informática',
    mentorInfo: {
      level: 'intermediate',
      specialties: ['mobile', 'devops'],
      studentsHelped: 30,
      averageRating: 4.7,
      completedSessions: 120,
      successRate: 0.90,
      hourlyRate: 60,
      availability: {
        hoursPerWeek: 15,
        timeZone: 'UTC+1',
        preferredHours: ['11:00', '16:00', '19:00']
      }
    }
  },
  {
    id: '16',
    email: 'junior.mentor@codecommunity.com',
    password: 'JuniorMentor2024!',
    displayName: 'Mentor Junior',
    role: 'juniorMentor',
    roles: ['juniorMentor'],
    emailVerified: true,
    photoURL: '/assets/avatars/junior-mentor-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['React', 'JavaScript', 'Python'],
    interests: ['Mentoría', 'Frontend Development'],
    bio: 'Mentor junior especializado en desarrollo frontend',
    location: 'Valencia, España',
    workExperience: 'Frontend Developer',
    education: 'Desarrollo Web',
    mentorInfo: {
      level: 'junior',
      specialties: ['frontend', 'ai'],
      studentsHelped: 15,
      averageRating: 4.5,
      completedSessions: 60,
      successRate: 0.85,
      hourlyRate: 40,
      availability: {
        hoursPerWeek: 10,
        timeZone: 'UTC+1',
        preferredHours: ['12:00', '17:00', '20:00']
      }
    }
  },

  // Roles de Usuario Regular
  {
    id: '17',
    email: 'subscriber@codecommunity.com',
    password: 'Subscriber2024!',
    displayName: 'Suscriptor',
    role: 'subscriber',
    roles: ['subscriber'],
    emailVerified: true,
    photoURL: '/assets/avatars/subscriber-avatar.jpg',
    experienceLevel: 'intermediate',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    interests: ['Web Development', 'UI/UI Design'],
    bio: 'Suscriptor premium de CodeCommunity',
    location: 'Málaga, España',
    workExperience: 'Desarrollador Frontend',
    education: 'Desarrollo Web'
  },
  {
    id: '18',
    email: 'viewer@codecommunity.com',
    password: 'Viewer2024!',
    displayName: 'Visualizador',
    role: 'viewer',
    roles: ['viewer'],
    emailVerified: true,
    photoURL: '/assets/avatars/viewer-avatar.jpg',
    experienceLevel: 'beginner',
    technologies: ['HTML', 'CSS'],
    interests: ['Web Development'],
    bio: 'Usuario básico de CodeCommunity',
    location: 'Granada, España',
    workExperience: 'Sin experiencia previa',
    education: 'En curso - Desarrollo Web'
  },

  // Roles Especializados
  {
    id: '19',
    email: 'designer@codecommunity.com',
    password: 'Designer2024!',
    displayName: 'Diseñador',
    role: 'seniorDev',
    roles: ['seniorDev'],
    emailVerified: true,
    photoURL: '/assets/avatars/designer-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['Figma', 'Adobe XD', 'UI/UX Design'],
    interests: ['Diseño de Interfaces', 'Experiencia de Usuario'],
    bio: 'Diseñador UI/UX especializado en plataformas educativas',
    location: 'Bilbao, España',
    workExperience: 'UI/UX Designer Senior',
    education: 'Diseño de Interacción'
  },
  {
    id: '20',
    email: 'marketing@codecommunity.com',
    password: 'Marketing2024!',
    displayName: 'Marketing',
    role: 'admin',
    roles: ['admin'],
    emailVerified: true,
    photoURL: '/assets/avatars/marketing-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['Digital Marketing', 'SEO', 'Content Strategy'],
    interests: ['Marketing Digital', 'Growth Hacking'],
    bio: 'Especialista en marketing digital y estrategia de contenido',
    location: 'Madrid, España',
    workExperience: 'Marketing Digital Manager',
    education: 'Marketing Digital'
  },
  {
    id: '21',
    email: 'accounting@codecommunity.com',
    password: 'Accounting2024!',
    displayName: 'Contabilidad',
    role: 'admin',
    roles: ['admin'],
    emailVerified: true,
    photoURL: '/assets/avatars/accounting-avatar.jpg',
    experienceLevel: 'advanced',
    technologies: ['Financial Management', 'Accounting Software'],
    interests: ['Gestión Financiera', 'Contabilidad'],
    bio: 'Especialista en gestión financiera y contabilidad',
    location: 'Barcelona, España',
    workExperience: 'Financial Manager',
    education: 'Contabilidad y Finanzas'
  }
];

export const findUserByEmail = (email: string): MockUser | undefined => {
  console.log('Buscando usuario con email:', email);
  const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
  console.log('Usuario encontrado:', user);
  return user;
};

export const validateUserCredentials = (email: string, password: string): MockUser | undefined => {
  console.log('Intentando validar credenciales para:', email);
  const user = findUserByEmail(email);
  
  if (!user) {
    console.log('No se encontró usuario con el email:', email);
    return undefined;
  }
  
  console.log('Comparando contraseñas:', {
    proporcionada: password,
    almacenada: user.password,
    coinciden: user.password === password
  });
  
  if (user.password === password) {
    console.log('Credenciales válidas para:', user.displayName);
    return user;
  }
  
  console.log('Contraseña incorrecta para el usuario:', email);
  return undefined;
};

export const handleLogin = async (email: string, password: string) => {
  try {
    console.log('Iniciando proceso de login para:', email);
    const user = await validateUserCredentials(email.trim(), password.trim());
    
    if (user) {
      console.log('Login exitoso para:', user.displayName);
      return {
        success: true,
        user: {
          ...user,
          roles: user.roles || [user.role]
        },
        message: 'Login exitoso'
      };
    } else {
      console.log('Login fallido para:', email);
      return {
        success: false,
        message: 'Credenciales inválidas'
      };
    }
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    return {
      success: false,
      message: 'Error en el proceso de login'
    };
  }
}; 