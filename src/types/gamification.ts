export {};

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  category: 'courses' | 'participation' | 'performance' | 'social';
  points: number;
  icon: string;
  unlockedAt?: Date;
}

export interface Level {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}

export interface UserProgress {
  userId: string;
  totalPoints: number;
  currentLevel: number;
  achievements: Achievement[];
  recentActivity: ActivityLog[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: 'course_completion' | 'achievement_unlocked' | 'level_up' | 'participation';
  description: string;
  points: number;
  timestamp: Date;
}

export interface GamificationRules {
  pointsPerCourse: number;
  pointsPerParticipation: number;
  pointsPerPerfectScore: number;
  levelThresholds: number[];
}

export const DEFAULT_GAMIFICATION_RULES: GamificationRules = {
  pointsPerCourse: 100,
  pointsPerParticipation: 10,
  pointsPerPerfectScore: 50,
  levelThresholds: [0, 100, 250, 500, 1000, 2000, 5000],
};
