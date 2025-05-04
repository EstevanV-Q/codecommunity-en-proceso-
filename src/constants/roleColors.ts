import { colors } from './colors';
import type { AdminRole } from '../types/roles';

export const roleColors: Record<AdminRole, string> = {
  // Núcleo Ejecutivo
  founder: colors.primary[700],
  owner: colors.primary[600],
  
  // Equipo Técnico
  cto: colors.primary[500],
  seniorDev: colors.primary[400],
  juniorDev: colors.primary[300],
  devOps: colors.primary[200],
  
  // Equipo de Moderación
  admin: colors.secondary[700],
  moderator: colors.secondary[600],
  helper: colors.secondary[500],
  
  // Departamentos Especializados
  marketing: colors.accent[700],
  accounting: colors.accent[600],
  designer: colors.accent[500],
  support: colors.accent[400],
  supportll: colors.accent[300],
  supportManager: colors.accent[200],
  
  // Roles Educativos
  professor: colors.success[700],
  instructor: colors.success[600],
  teachingAssistant: colors.success[500],
  student: colors.success[400],
  mentee: colors.success[300],
  seniorMentor: colors.success[200],
  mentor: colors.success[100],
  juniorMentor: colors.success[50],
  
  // Roles de Comunidad
  viewer: colors.grey[700],
  subscriber: colors.grey[600],
  
  // Usuario regular
  user: colors.grey[500]
} as const;