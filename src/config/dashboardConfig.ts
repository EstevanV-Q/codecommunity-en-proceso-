import { AdminRole, DashboardConfig, DashboardFeature } from '../types/dashboard';
import SystemMonitoring from '../components/dashboards/technical/SystemMonitoring';
import CourseManagement from '../components/dashboards/teacher/CourseManagement';
import AdminDashboard from '../components/dashboards/admin/AdminDashboard';
import FounderDashboard from '../components/dashboards/founder/FounderDashboard';
import CTODashboard from '../components/dashboards/cto/CTODashboard';
import SeniorDevDashboard from '../components/dashboards/seniorDev/SeniorDevDashboard';
import DevDashboard from '../components/dashboards/dev/DevDashboard';
import AssistantDashboard from '../components/dashboards/assistant/AssistantDashboard';
import StudentDashboard from '../components/dashboards/student/StudentDashboard';
import TeacherDashboard from '../components/dashboards/teacher/TeacherDashboard';

const technicalFeatures: DashboardFeature[] = [
  {
    id: 'system-monitoring',
    title: 'System Monitoring',
    description: 'Monitor system performance and health',
    icon: 'monitoring',
    enabled: true,
  },
  {
    id: 'code-review',
    title: 'Code Review',
    description: 'Review and manage code changes',
    icon: 'code',
    enabled: true,
  },
  {
    id: 'security',
    title: 'Security',
    description: 'Manage security settings and alerts',
    icon: 'security',
    enabled: true,
  },
];

const teacherFeatures: DashboardFeature[] = [
  {
    id: 'course-management',
    title: 'Course Management',
    description: 'Manage courses and assignments',
    icon: 'courses',
    enabled: true,
  },
  {
    id: 'student-progress',
    title: 'Student Progress',
    description: 'Track student performance',
    icon: 'progress',
    enabled: true,
  },
  {
    id: 'calendar',
    title: 'Calendar',
    description: 'Manage schedules and events',
    icon: 'calendar',
    enabled: true,
  },
];

const studentFeatures: DashboardFeature[] = [
  {
    id: 'assignments',
    title: 'Assignments',
    description: 'View and submit assignments',
    icon: 'assignment',
    enabled: true,
  },
  {
    id: 'courses',
    title: 'Courses',
    description: 'View enrolled courses',
    icon: 'school',
    enabled: true,
  },
  {
    id: 'grades',
    title: 'Grades',
    description: 'View grades and progress',
    icon: 'assessment',
    enabled: true,
  },
];

export const DASHBOARD_CONFIGS: Record<AdminRole, DashboardConfig> = {
  technical: {
    id: 'technical',
    title: 'Technical Dashboard',
    component: SystemMonitoring,
    role: 'technical',
    features: technicalFeatures,
  },
  teacher: {
    id: 'teacher',
    title: 'Teacher Dashboard',
    component: TeacherDashboard,
    role: 'teacher',
    features: teacherFeatures,
  },
  admin: {
    id: 'admin',
    title: 'Admin Dashboard',
    component: AdminDashboard,
    role: 'admin',
    features: [...technicalFeatures, ...teacherFeatures],
  },
  founder: {
    id: 'founder',
    title: 'Founder Dashboard',
    component: FounderDashboard,
    role: 'founder',
    features: [...technicalFeatures, ...teacherFeatures],
  },
  owner: {
    id: 'owner',
    title: 'Owner Dashboard',
    component: FounderDashboard,
    role: 'owner',
    features: [...technicalFeatures, ...teacherFeatures],
  },
  cto: {
    id: 'cto',
    title: 'CTO Dashboard',
    component: CTODashboard,
    role: 'cto',
    features: technicalFeatures,
  },
  seniorDev: {
    id: 'seniorDev',
    title: 'Senior Developer Dashboard',
    component: SeniorDevDashboard,
    role: 'seniorDev',
    features: technicalFeatures,
  },
  dev: {
    id: 'dev',
    title: 'Developer Dashboard',
    component: DevDashboard,
    role: 'dev',
    features: technicalFeatures,
  },
  assistant: {
    id: 'assistant',
    title: 'Assistant Dashboard',
    component: AssistantDashboard,
    role: 'assistant',
    features: teacherFeatures,
  },
  student: {
    id: 'student',
    title: 'Student Dashboard',
    component: StudentDashboard,
    role: 'student',
    features: studentFeatures,
  },
}; 