import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Definición de roles según la estructura organizativa
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

// Definición de permisos según la matriz de accesos
export interface AdminPermissions {
  // Permisos de infraestructura
  'infrastructure.config': boolean;
  'infrastructure.deploy': boolean;
  
  // Permisos de usuarios
  'users.manage': boolean;
  'users.view': boolean;
  
  // Permisos de contenido
  'content.moderate': boolean;
  'content.create': boolean;
  'content.edit': boolean;
  
  // Permisos de cursos
  'courses.manage': boolean;
  'courses.create': boolean;
  'courses.edit': boolean;
  
  // Permisos financieros
  'finance.manage': boolean;
  'finance.view': boolean;
  'finance.transactions': boolean;
  
  // Permisos de marketing
  'marketing.campaigns': boolean;
  'marketing.analytics': boolean;
  
  // Permisos de desarrollo
  'dev.production': boolean;
  'dev.staging': boolean;
  'dev.repository': boolean;
  
  // Permisos de datos
  'data.sensitive': boolean;
  'data.analytics': boolean;
  
  // Permisos de diseño
  'design.system': boolean;
  'design.prototype': boolean;
  
  // Accesos a módulos principales
  'module.platformCore': boolean;
  'module.learningEngine': boolean;
  'module.communityHub': boolean;
  'module.internalTools': boolean;
}

// Definición de accesos a submódulos
export interface ModuleAccess {
  // Núcleo de Plataforma
  'platform-core': {
    'identity-management': boolean;
    'payment-gateway': boolean;
    'content-delivery-network': boolean;
    'api-gateway': boolean;
  };
  
  // Módulo Educativo
  'learning-engine': {
    'course-builder': boolean;
    'progress-tracker': boolean;
    'certification-system': boolean;
    'virtual-labs': boolean;
  };
  
  // Ecosistema Social
  'community-hub': {
    'moderation-panel': boolean;
    'reputation-system': boolean;
    'event-manager': boolean;
    'collaboration-tools': boolean;
  };
  
  // Herramientas Internas
  'internal-tools': {
    'admin-dashboard': boolean;
    'dev-ops-center': boolean;
    'financial-reports': boolean;
    'marketing-suite': boolean;
  };
}

interface AdminContextType {
  role: AdminRole;
  permissions: AdminPermissions;
  moduleAccess: ModuleAccess;
  isAdmin: boolean;
  isTechnical: boolean;
  isExecutive: boolean;
  checkPermission: (permission: keyof AdminPermissions) => boolean;
  checkModuleAccess: (module: keyof ModuleAccess, submodule: string) => boolean;
  getEscalationLevel: () => number;
}

// Permisos base para roles educativos
const baseEducationalPermissions: AdminPermissions = {
  'infrastructure.config': false,
  'infrastructure.deploy': false,
  'users.manage': false,
  'users.view': false,
  'content.moderate': false,
  'content.create': false,
  'content.edit': false,
  'courses.manage': false,
  'courses.create': false,
  'courses.edit': false,
  'finance.manage': false,
  'finance.view': false,
  'finance.transactions': false,
  'marketing.campaigns': false,
  'marketing.analytics': false,
  'dev.production': false,
  'dev.staging': false,
  'dev.repository': false,
  'data.sensitive': false,
  'data.analytics': false,
  'design.system': false,
  'design.prototype': false,
  'module.platformCore': false,
  'module.learningEngine': true,
  'module.communityHub': true,
  'module.internalTools': false
};

// Accesos base para roles educativos
const baseEducationalAccess: ModuleAccess = {
  'platform-core': {
    'identity-management': false,
    'payment-gateway': false,
    'content-delivery-network': false,
    'api-gateway': false
  },
  'learning-engine': {
    'course-builder': false,
    'progress-tracker': true,
    'certification-system': false,
    'virtual-labs': true
  },
  'community-hub': {
    'moderation-panel': false,
    'reputation-system': true,
    'event-manager': true,
    'collaboration-tools': true
  },
  'internal-tools': {
    'admin-dashboard': false,
    'dev-ops-center': false,
    'financial-reports': false,
    'marketing-suite': false
  }
};

// Permisos predeterminados por rol
const defaultPermissions: Record<AdminRole, AdminPermissions> = {
  // Núcleo Ejecutivo
  founder: {
    'infrastructure.config': true,
    'infrastructure.deploy': true,
    'users.manage': true,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.manage': true,
    'courses.create': true,
    'courses.edit': true,
    'finance.manage': true,
    'finance.view': true,
    'finance.transactions': true,
    'marketing.campaigns': true,
    'marketing.analytics': true,
    'dev.production': true,
    'dev.staging': true,
    'dev.repository': true,
    'data.sensitive': true,
    'data.analytics': true,
    'design.system': true,
    'design.prototype': true,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true
  },
  owner: {
    'infrastructure.config': true,
    'infrastructure.deploy': false,
    'users.manage': true,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.manage': true,
    'courses.create': true,
    'courses.edit': true,
    'finance.manage': true,
    'finance.view': true,
    'finance.transactions': true,
    'marketing.campaigns': true,
    'marketing.analytics': true,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': true,
    'data.analytics': true,
    'design.system': true,
    'design.prototype': true,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true
  },
  
  // Equipo Técnico
  cto: {
    'infrastructure.config': true,
    'infrastructure.deploy': true,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': true,
    'content.edit': true,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': false,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': true,
    'dev.production': true,
    'dev.staging': true,
    'dev.repository': true,
    'data.sensitive': false,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true
  },
  seniorDev: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': true,
    'content.edit': true,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': false,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': false,
    'dev.production': true,
    'dev.staging': true,
    'dev.repository': true,
    'data.sensitive': false,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': false,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': false
  },
  juniorDev: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': false,
    'users.view': false,
    'content.moderate': false,
    'content.create': false,
    'content.edit': false,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': false,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': false,
    'dev.production': true,
    'dev.staging': true,
    'dev.repository': true,
    'data.sensitive': false,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': false,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': false
  },
  
  // Equipo de Moderación
  admin: {
    'infrastructure.config': true,
    'infrastructure.deploy': true,
    'users.manage': true,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.manage': true,
    'courses.create': true,
    'courses.edit': true,
    'finance.manage': true,
    'finance.view': true,
    'finance.transactions': true,
    'marketing.campaigns': true,
    'marketing.analytics': true,
    'dev.production': true,
    'dev.staging': true,
    'dev.repository': true,
    'data.sensitive': true,
    'data.analytics': true,
    'design.system': true,
    'design.prototype': true,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true
  },
  moderator: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': true,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.manage': true,
    'courses.create': true,
    'courses.edit': true,
    'finance.manage': false,
    'finance.view': true,
    'finance.transactions': false,
    'marketing.campaigns': true,
    'marketing.analytics': true,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': true,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': true,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true
  },
  helper: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': true,
    'content.edit': true,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': false,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': false,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': false,
    'data.analytics': false,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': false,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': false
  },
  
  // Departamentos Especializados
  marketing: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': true,
    'content.edit': true,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': true,
    'finance.transactions': false,
    'marketing.campaigns': true,
    'marketing.analytics': true,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': false,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': true,
    'module.platformCore': false,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': false
  },
  accounting: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': false,
    'content.edit': false,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': true,
    'finance.view': true,
    'finance.transactions': true,
    'marketing.campaigns': false,
    'marketing.analytics': false,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': true,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': false,
    'module.learningEngine': false,
    'module.communityHub': false,
    'module.internalTools': true
  },
  designer: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': true,
    'content.edit': true,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': false,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': false,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': false,
    'data.analytics': false,
    'design.system': true,
    'design.prototype': true,
    'module.platformCore': false,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': false
  },
  
  // Roles Educativos
  professor: {
    'infrastructure.config': false,
    'infrastructure.deploy': false,
    'users.manage': true,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.manage': true,
    'courses.create': true,
    'courses.edit': true,
    'finance.manage': false,
    'finance.view': true,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': true,
    'dev.production': false,
    'dev.staging': false,
    'dev.repository': false,
    'data.sensitive': true,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true
  },
  instructor: {
    ...baseEducationalPermissions,
    'users.view': true,
    'content.create': true,
    'content.edit': true,
    'courses.create': true,
    'courses.edit': true,
    'data.analytics': true
  },
  teachingAssistant: {
    ...baseEducationalPermissions,
    'users.view': true,
    'content.create': true,
    'content.edit': true,
    'data.analytics': true
  },
  student: {
    ...baseEducationalPermissions
  },
  mentee: {
    ...baseEducationalPermissions
  },
  seniorMentor: {
    ...baseEducationalPermissions,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.manage': true,
    'courses.create': true,
    'courses.edit': true,
    'data.analytics': true
  },
  mentor: {
    ...baseEducationalPermissions,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'courses.create': true,
    'courses.edit': true,
    'courses.manage': true,
    'data.analytics': true,
    'module.platformCore': true,
    'module.learningEngine': true,
    'module.communityHub': true,
    'module.internalTools': true,
    'finance.view': true,
    'marketing.analytics': true
  },
  juniorMentor: {
    ...baseEducationalPermissions,
    'users.view': true,
    'content.moderate': true,
    'content.create': true,
    'content.edit': true,
    'data.analytics': true
  },
  viewer: {
    ...baseEducationalPermissions,
    'module.learningEngine': false
  },
  subscriber: {
    ...baseEducationalPermissions,
    'module.learningEngine': true
  },
  user: {
    ...baseEducationalPermissions,
    'module.learningEngine': false
  },
  devOps: {
    'infrastructure.config': true,
    'infrastructure.deploy': true,
    'users.manage': false,
    'users.view': true,
    'content.moderate': false,
    'content.create': false,
    'content.edit': false,
    'courses.manage': false,
    'courses.create': false,
    'courses.edit': false,
    'finance.manage': false,
    'finance.view': false,
    'finance.transactions': false,
    'marketing.campaigns': false,
    'marketing.analytics': false,
    'dev.production': true,
    'dev.staging': true,
    'dev.repository': true,
    'data.sensitive': false,
    'data.analytics': true,
    'design.system': false,
    'design.prototype': false,
    'module.platformCore': true,
    'module.learningEngine': false,
    'module.communityHub': false,
    'module.internalTools': true
  }
};

// Accesos a módulos por rol
const defaultModuleAccess: Record<AdminRole, ModuleAccess> = {
  // Núcleo Ejecutivo
  founder: {
    'platform-core': {
      'identity-management': true,
      'payment-gateway': true,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': true,
      'financial-reports': true,
      'marketing-suite': true
    }
  },
  owner: {
    'platform-core': {
      'identity-management': true,
      'payment-gateway': true,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': true,
      'financial-reports': true,
      'marketing-suite': true
    }
  },
  
  // Equipo Técnico
  cto: {
    'platform-core': {
      'identity-management': true,
      'payment-gateway': false,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': true,
      'financial-reports': false,
      'marketing-suite': false
    }
  },
  seniorDev: {
    'platform-core': {
      'identity-management': false,
      'payment-gateway': false,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': false,
      'dev-ops-center': true,
      'financial-reports': false,
      'marketing-suite': false
    }
  },
  juniorDev: {
    'platform-core': {
      'identity-management': false,
      'payment-gateway': false,
      'content-delivery-network': false,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': false,
      'dev-ops-center': true,
      'financial-reports': false,
      'marketing-suite': false
    }
  },
  
  // Equipo de Moderación
  admin: {
    'platform-core': {
      'identity-management': true,
      'payment-gateway': true,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': true,
      'financial-reports': true,
      'marketing-suite': true
    }
  },
  moderator: {
    'platform-core': {
      'identity-management': true,
      'payment-gateway': true,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': false,
      'financial-reports': true,
      'marketing-suite': true
    }
  },
  helper: {
    'platform-core': {
      'identity-management': false,
      'payment-gateway': false,
      'content-delivery-network': false,
      'api-gateway': false
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': false,
      'dev-ops-center': false,
      'financial-reports': false,
      'marketing-suite': false
    }
  },
  
  // Departamentos Especializados
  marketing: {
    'platform-core': {
      'identity-management': false,
      'payment-gateway': false,
      'content-delivery-network': false,
      'api-gateway': false
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': false,
      'virtual-labs': false
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': false,
      'dev-ops-center': false,
      'financial-reports': false,
      'marketing-suite': true
    }
  },
  accounting: {
    'platform-core': {
      'identity-management': false,
      'payment-gateway': true,
      'content-delivery-network': false,
      'api-gateway': false
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': false,
      'certification-system': false,
      'virtual-labs': false
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': false,
      'event-manager': false,
      'collaboration-tools': false
    },
    'internal-tools': {
      'admin-dashboard': false,
      'dev-ops-center': false,
      'financial-reports': true,
      'marketing-suite': false
    }
  },
  designer: {
    'platform-core': {
      'identity-management': false,
      'payment-gateway': false,
      'content-delivery-network': false,
      'api-gateway': false
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': false,
      'virtual-labs': false
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': false,
      'dev-ops-center': false,
      'financial-reports': false,
      'marketing-suite': true
    }
  },
  
  // Roles Educativos
  professor: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    }
  },
  instructor: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    }
  },
  teachingAssistant: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': false,
      'virtual-labs': true
    }
  },
  student: {
    ...baseEducationalAccess
  },
  mentee: {
    ...baseEducationalAccess
  },
  seniorMentor: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    }
  },
  mentor: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': true,
      'progress-tracker': true,
      'certification-system': true,
      'virtual-labs': true
    },
    'community-hub': {
      'moderation-panel': true,
      'reputation-system': true,
      'event-manager': true,
      'collaboration-tools': true
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': false,
      'financial-reports': true,
      'marketing-suite': true
    }
  },
  juniorMentor: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': true,
      'certification-system': false,
      'virtual-labs': true
    }
  },
  viewer: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': false,
      'certification-system': false,
      'virtual-labs': false
    }
  },
  subscriber: {
    ...baseEducationalAccess
  },
  user: {
    ...baseEducationalAccess,
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': false,
      'certification-system': false,
      'virtual-labs': false
    }
  },
  devOps: {
    'platform-core': {
      'identity-management': true,
      'payment-gateway': false,
      'content-delivery-network': true,
      'api-gateway': true
    },
    'learning-engine': {
      'course-builder': false,
      'progress-tracker': false,
      'certification-system': false,
      'virtual-labs': false
    },
    'community-hub': {
      'moderation-panel': false,
      'reputation-system': false,
      'event-manager': false,
      'collaboration-tools': false
    },
    'internal-tools': {
      'admin-dashboard': true,
      'dev-ops-center': true,
      'financial-reports': false,
      'marketing-suite': false
    }
  }
};

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin debe ser usado dentro de un AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [role, setRole] = useState<AdminRole>('user');
  const [permissions, setPermissions] = useState<AdminPermissions>(defaultPermissions.user);
  const [moduleAccess, setModuleAccess] = useState<ModuleAccess>(defaultModuleAccess.user);

  useEffect(() => {
    if (user) {
      // Log para diagnóstico
      console.log('Usuario actual:', user);
      console.log('Rol del usuario:', user.role);
      console.log('Roles del usuario:', user.roles);

      // Usar el rol del usuario si está definido, de lo contrario asignar 'user'
      const userRole = (user.role || 'user') as AdminRole;
      const userRoles = user.roles || [userRole];

      // Lista completa de roles administrativos
      const adminRoles = [
        'founder', 
        'owner', 
        'admin', 
        'moderator', 
        'professor', 
        'seniorMentor',
        'mentor',
        'cto',
        'seniorDev',
        'accounting',
        'marketing'
      ];

      // Verificar si el usuario tiene roles administrativos
      const hasAdminRole = userRoles.some(r => adminRoles.includes(r));
      console.log('¿Tiene rol administrativo?:', hasAdminRole);

      // Si tiene roles administrativos, usar el rol más alto según la jerarquía
      const effectiveRole = hasAdminRole ? 
        userRoles.find(r => adminRoles.includes(r)) as AdminRole :
        userRole;

      console.log('Rol efectivo:', effectiveRole);
      console.log('Permisos asignados:', defaultPermissions[effectiveRole]);
      
      setRole(effectiveRole);
      setPermissions(defaultPermissions[effectiveRole]);
      setModuleAccess(defaultModuleAccess[effectiveRole]);
    } else {
      setRole('user');
      setPermissions(defaultPermissions.user);
      setModuleAccess(defaultModuleAccess.user);
    }
  }, [user]);

  // Log para verificar el rol y permisos
  useEffect(() => {
    console.log('AdminContext - Rol establecido:', role);
    console.log('AdminContext - Permisos establecidos:', permissions);
    console.log('AdminContext - Acceso a módulos:', moduleAccess);
  }, [role, permissions, moduleAccess]);

  // Verificar si un usuario tiene un permiso específico
  const checkPermission = (permission: keyof AdminPermissions) => {
    return permissions[permission];
  };

  // Verificar si un usuario tiene acceso a un submódulo específico
  const checkModuleAccess = (module: keyof ModuleAccess, submodule: string): boolean => {
    if (
      module in moduleAccess && 
      submodule in moduleAccess[module]
    ) {
      const modulePermissions = moduleAccess[module];
      return modulePermissions[submodule as keyof typeof modulePermissions] || false;
    }
    return false;
  };

  // Obtener el nivel de escalación según el rol
  const getEscalationLevel = () => {
    switch (role) {
      case 'founder':
        return 5;
      case 'owner':
      case 'cto':
        return 4;
      case 'seniorDev':
        return 3;
      case 'admin':
        return 2;
      case 'moderator':
      case 'helper':
        return 1;
      default:
        return 0;
    }
  };

  // Determinar si el usuario es parte del equipo administrativo
  const isAdmin = [
    'founder', 
    'owner', 
    'admin', 
    'moderator',
    'professor',
    'seniorMentor',
    'mentor',
    'cto',
    'seniorDev'
  ].includes(role);
  
  // Determinar si el usuario es parte del equipo técnico
  const isTechnical = ['cto', 'seniorDev', 'juniorDev', 'devOps'].includes(role);
  
  // Determinar si el usuario es parte del núcleo ejecutivo
  const isExecutive = ['founder', 'owner', 'cto'].includes(role);

  return (
    <AdminContext.Provider 
      value={{ 
        role, 
        permissions, 
        moduleAccess,
        isAdmin,
        isTechnical,
        isExecutive,
        checkPermission, 
        checkModuleAccess,
        getEscalationLevel
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext; 