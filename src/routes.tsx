import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useAdmin } from './context/AdminContext';
import { CircularProgress, Box } from '@mui/material';
import CreateButton from './components/common/CreateButton';

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
  CreateThread,
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
  ContentManagement,
  Analytics,
  OrganizationStructure,
  CourseManagement,
  TutorManagement
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
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth/login" replace />;
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
        
        {/* Rutas de comunidad */}
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/community/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        
        {/* Rutas de anuncios */}
        <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />

        {/* Rutas protegidas */}
        <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/user/profile/setup" element={<ProtectedRoute><ProfileSetup /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute><Editor /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path="/courses/:courseId" element={<ProtectedRoute><Course /></ProtectedRoute>} />
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
        <Route path="/admin/content" element={<AdminRoute><ContentManagement /></AdminRoute>} />
        <Route path="/admin/analytics" element={<AdminRoute><Analytics /></AdminRoute>} />
        <Route path="/admin/payments" element={<AdminRoute><PaymentManagement /></AdminRoute>} />
        <Route path="/admin/resources" element={<AdminRoute><ResourcesManagement /></AdminRoute>} />
        <Route path="/admin/resources/:resourceId" element={<AdminRoute><ResourceContentPage /></AdminRoute>} />
        <Route path="/admin/announcements" element={<AdminRoute><AnnouncementsList /></AdminRoute>} />
        <Route path="/admin/announcements/new" element={<AdminRoute><AnnouncementForm /></AdminRoute>} />
        <Route path="/admin/announcements/:id" element={<AdminRoute><AnnouncementForm /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute><CourseManagement /></AdminRoute>} />
        <Route path="/admin/courses/new" element={<AdminRoute><CourseManagement mode="create" /></AdminRoute>} />
        <Route path="/admin/tutors" element={<AdminRoute><TutorManagement /></AdminRoute>} />
        <Route path="/admin/mentors" element={<AdminRoute><Mentors /></AdminRoute>} />

        {/* Ruta para el salón de clases en vivo */}
        <Route path="/live-classroom/:courseId" element={<ProtectedRoute><LiveClassroom /></ProtectedRoute>} />

        {/* Rutas del foro */}
        <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/forum/thread/:id" element={<ProtectedRoute><ForumThread /></ProtectedRoute>} />
        <Route path="/forum/new" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />

        {/* Ruta por defecto - Redirige a la raíz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes; 