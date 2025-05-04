import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAdmin } from './context/AdminContext';
import { CircularProgress, Box } from '@mui/material';
import CreateButton from './components/common/CreateButton';
import { LearningRole } from './types/roles';
import ProtectedRouteComponent from './components/ProtectedRoute';

// Importaciones de páginas
import {
  // Auth Pages
  Login,
  Register,
  ForgotPassword,
  ProfileSetup,
  
  // Main Pages
  Home,
  Dashboard,
  
  // Community Pages
  Community,
  Forum,
  ForumThread,
  CreatePost,
  
  // Learning Pages
  Courses,
  Course,
  CourseDetail,
  Projects,
  Project,
  ProjectDetail,
  Editor,
  LiveClassroom,
  
  // User Pages
  Profile,
  Settings,
  Bookmarks,
  Notifications,
  
  // Info Pages
  About,
  Contact,
  Help,
  Privacy,
  Terms,
  Maintenance,
  
  // Error Pages
  Error,
  NotFound,
  
  // Admin Pages
  AdminDashboard,
  UserManagement,
  ContentManagement as AdminContentManagement,
  Analytics,
  OrganizationStructure,
  CourseManagement as AdminCourseManagement,
  TutorManagement,
  SupportDashboard
} from './pages';

// Importar las nuevas páginas de recursos
import FAQ from './pages/info/FAQ';
import Tutorials from './pages/info/Tutorials';
import Documentation from './pages/info/Documentation';
import CommunityGuidelines from './pages/info/CommunityGuidelines';
import ResourcesManagement from './pages/admin/ResourcesManagement';
import ResourceContentPage from './pages/admin/ResourceContentPage';
import AnnouncementForm from './pages/admin/AnnouncementForm';
import AnnouncementsList from './pages/admin/AnnouncementsList';
import Announcements from './pages/announcements/Announcements';
import PaymentManagement from './pages/admin/PaymentManagement';
import MakePayment from './pages/payments/MakePayment';
import Cart from './pages/payments/carts';
import Mentors from './pages/admin/MentorManagement';
import Donations from './pages/payments/Donations';
import MentorCoursesDashboard from './components/mentor/MentorCoursesDashboard';
import { MentorCourseForm, MentorCourseDetail } from './pages/mentor';
import Monitoring from 'components/dashboards/technical/TechnicalDashboard';
import FounderDashboard from './components/dashboards/founder/FounderDashboard';
import TeacherDashboard from './components/dashboards/teacher/TeacherDashboard';
import TeacherCourseManagement from './components/dashboards/teacher/CourseManagement';
import TeacherCourseAdmin from './components/dashboards/teacher/TeacherCourseAdmin';
import CourseContentManagement from './components/dashboards/teacher/CourseContentManagement';
import StudentProgress from './components/dashboards/teacher/StudentProgress';
import AssignmentManager from './components/dashboards/teacher/AssignmentManager';
import GradeBook from './components/dashboards/teacher/GradeBook';
import MaterialLibrary from './components/dashboards/teacher/MaterialLibrary';
import CommunicationHub from './components/dashboards/teacher/CommunicationHub';
import CalendarView from './components/dashboards/teacher/CalendarView';
import ContentManagement from './pages/teacher/ContentManagement';
import JobListings from './pages/jobs/JobListings';
import JobManagement from './pages/admin/JobManagement';
import CommunityAdminPanel from './components/admin/CommunityAdminPanel';
import Earnings from './pages/teacher/Earnings';
import StudentDashboard from './components/dashboards/student/StudentDashboard';
import StudyGroup from './components/community/StudyGroup';
import StudyGroupsList from './components/community/StudyGroupsList';
import StudyGroupsAdmin from './pages/admin/StudyGroupsAdmin';
import TicketDetail from './pages/tickets/TicketDetail';

const LoadingScreen = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <CircularProgress />
  </Box>
);

// Componente para redireccionar a login o dashboard según autenticación
const AuthRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirigir según el rol del usuario
  switch (user?.role) {
    case 'student':
      return <Navigate to="/student/dashboard" replace />;
    case 'professor':
    case 'instructor':
    case 'teachingAssistant':
      return <Navigate to="/teacher/dashboard" replace />;
    case 'mentor':
    case 'seniorMentor':
    case 'juniorMentor':
      return <Navigate to="/mentor/courses" replace />;
    case 'founder':
    case 'owner':
    case 'cto':
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'support':
    case 'supportll':
    case 'supportManager':
      return <Navigate to="/support/dashboard" replace />;
    default:
      return <Navigate to="/dashboard" replace />;
  }
};

// Componente para rutas protegidas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return (
    <>
      {children}
      <CreateButton />
    </>
  );
};

// Componente para rutas de administración
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { isAdmin } = useAdmin();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Nuevo componente para restringir rutas por rol para el dashboard de profesor
const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar si el usuario tiene rol de profesor
  if (!['professor', 'instructor', 'teachingAssistant'].includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// Nuevo componente para restringir rutas por rol
const RestrictedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath: string;
}> = ({ children, allowedRoles, fallbackPath }) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};

// Componente para rutas de soporte
const SupportRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar si el usuario tiene rol de soporte
  if (!['support', 'supportll', 'supportManager'].includes(user?.role || '')) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Ruta raíz - Redirige según autenticación */}
        <Route path="/" element={<AuthRedirect />} />

        {/* Rutas públicas */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/community-guidelines" element={<CommunityGuidelines />} />

        {/* Rutas principales */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/teacher/dashboard" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
        <Route path="/support/dashboard" element={<SupportRoute><SupportDashboard /></SupportRoute>} />
        
        {/* Rutas de comunidad */}
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/community/groups" element={<ProtectedRoute><StudyGroupsList /></ProtectedRoute>} />
        <Route path="/community/groups/:groupId" element={<ProtectedRoute><StudyGroup /></ProtectedRoute>} />
        <Route path="/community/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/community/thread/:id" element={<ProtectedRoute><ForumThread /></ProtectedRoute>} />
        
        {/* Rutas de anuncios */}
        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />

        {/* Rutas de ofertas de trabajo */}
        <Route path="/jobs" element={<ProtectedRoute><JobListings /></ProtectedRoute>} />

        {/* Rutas protegidas */}
        <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        {/* <Route path="/user/profile/setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} /> */}
        <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
        <Route path="/projects/:projectId" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
        <Route path="/projects/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><MakePayment /></ProtectedRoute>} />
        <Route path="/donation" element={<ProtectedRoute><Donations/></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />

        {/* Rutas de administración */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/organization" element={<AdminRoute><OrganizationStructure /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><UserManagement /></AdminRoute>} />
        <Route path="/admin/content" element={<AdminRoute><AdminContentManagement /></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
        <Route path="/admin/payments" element={<AdminRoute><PaymentManagement /></AdminRoute>} />
        <Route path="/admin/resources" element={<AdminRoute><ResourcesManagement /></AdminRoute>} />
        <Route path="/admin/community" element={<AdminRoute><CommunityAdminPanel /></AdminRoute>} />
        <Route path="/admin/community/groups" element={<AdminRoute><StudyGroupsAdmin /></AdminRoute>} />
        <Route path="/admin/resources/:resourceId" element={<AdminRoute><ResourceContentPage /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><AnnouncementsList /></AdminRoute>} />
        <Route path="/admin/announcements/new" element={<AdminRoute><AnnouncementForm /></AdminRoute>} />
        <Route path="/admin/announcements/:id" element={<AdminRoute><AnnouncementForm /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute><AdminCourseManagement /></AdminRoute>} />
        <Route path="/admin/courses/new" element={<AdminRoute><AdminCourseManagement mode="create" /></AdminRoute>} />
        <Route path="/admin/tutors" element={<AdminRoute><TutorManagement /></AdminRoute>} />
        <Route path="/admin/mentors" element={<AdminRoute><Mentors /></AdminRoute>} />
        <Route path="/admin/monitoring" element={<AdminRoute><Monitoring /></AdminRoute>} />
        <Route path="/admin/Founder" element={<AdminRoute><FounderDashboard /></AdminRoute>} />
        <Route path="/admin/jobs" element={<AdminRoute><JobManagement /></AdminRoute>} />
        <Route path="/admin/support" element={<SupportRoute><SupportDashboard /></SupportRoute>} />

        {/* Rutas para el dashboard de estudiante */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute>
              <RestrictedRoute allowedRoles={['student' as LearningRole]} fallbackPath="/dashboard">
                <StudentDashboard />
              </RestrictedRoute>
            </ProtectedRoute>
          } 
        />

        {/* Rutas para el dashboard de profesor */}
        <Route path="/teacher" element={<TeacherRoute><TeacherDashboard /></TeacherRoute>} />
        <Route path="/teacher/courses" element={<TeacherRoute><TeacherCourseManagement /></TeacherRoute>} />
        <Route path="/teacher/courses/:courseId" element={<TeacherRoute><TeacherCourseAdmin /></TeacherRoute>} />
        <Route path="/teacher/courses/:courseId/content" element={<TeacherRoute><CourseContentManagement course={null} /></TeacherRoute>} />
        <Route path="/teacher/students" element={<TeacherRoute><StudentProgress /></TeacherRoute>} />
        <Route path="/teacher/assignments" element={<TeacherRoute><AssignmentManager /></TeacherRoute>} />
        <Route path="/teacher/grades" element={<TeacherRoute><GradeBook /></TeacherRoute>} />
        <Route path="/teacher/materials" element={<TeacherRoute><MaterialLibrary /></TeacherRoute>} />
        <Route path="/teacher/communication" element={<TeacherRoute><CommunicationHub /></TeacherRoute>} />
        <Route path="/teacher/calendar" element={<TeacherRoute><CalendarView /></TeacherRoute>} />
        <Route path="/teacher/content" element={<TeacherRoute><ContentManagement /></TeacherRoute>} />
        <Route path="/teacher/earnings" element={<TeacherRoute><Earnings /></TeacherRoute>} />

        {/* Ruta para el salón de clases en vivo */}
        <Route path="/live-classroom/:courseId" element={<ProtectedRoute><LiveClassroom /></ProtectedRoute>} />

        {/* Rutas del foro */}
        <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/forum/thread/:id" element={<ProtectedRoute><ForumThread /></ProtectedRoute>} />
        <Route path="/forum/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />

        {/* Rutas específicas para mentores */}
        <Route 
          path="/mentor/courses" 
          element={
            <ProtectedRoute>
              <MentorCoursesDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mentor/courses/new" 
          element={
            <ProtectedRoute>
              <MentorCourseForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/mentor/courses/:courseId" 
          element={
            <ProtectedRoute>
              <MentorCourseDetail />
            </ProtectedRoute>
          } 
        />

        {/* Remover acceso a /help para mentores */}
        <Route 
          path="/help" 
          element={
            <RestrictedRoute 
              allowedRoles={['admin', 'founder', 'owner', 'cto']}
              fallbackPath="/dashboard"
            >
              <Help />
            </RestrictedRoute>
          } 
        />

        {/* Ruta para detalle de ticket */}
        <Route path="/tickets/:ticketId" element={<TicketDetail />} />

        {/* Ruta por defecto - Redirige a la raíz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 