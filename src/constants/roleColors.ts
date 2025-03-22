import { colors } from '../theme/tokens';
import type { AdminRole } from '../types/roles';

export const roleColors: Record<AdminRole, string> = {
  // Núcleo Ejecutivo
  founder: colors.primary[700],
  owner: colors.primary[600],
  
  // Equipo Técnico
  cto: colors.primary[500],
  seniorDev: colors.primary[400],
  juniorDev: colors.primary[300],
  devOps: colors.primary[400],
  
  // Equipo de Moderación
  admin: colors.secondary[700],
  moderator: colors.secondary[600],
  helper: colors.secondary[500],
  
  // Departamentos Especializados
  marketing: colors.accent[600],
  accounting: colors.accent[500],
  designer: colors.accent[400],
  
  // Roles Educativos
  professor: colors.success[700],
  instructor: colors.success[600],
  teachingAssistant: colors.success[500],
  student: colors.success[400],
  mentee: colors.success[300],
  seniorMentor: colors.success[600],
  mentor: colors.success[500],
  juniorMentor: colors.success[400],
  
  // Roles de Comunidad
  viewer: colors.neutral[400],
  subscriber: colors.neutral[500],
  
  // Usuario regular
  user: colors.neutral[300]
} as const;