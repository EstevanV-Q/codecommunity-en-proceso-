import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import { NotificationProvider } from './context/NotificationContext';
import { AnnouncementProvider } from './context/AnnouncementContext';
import Layout from './components/layout/Layout';
import AppRoutes from './routes';
import { CssBaseline } from '@mui/material';

const App = () => {
  // Configuración de flags futuros usando localStorage
  // Estas líneas permiten habilitar los flags futuros sin cambiar el router
  React.useEffect(() => {
    // Habilitar los flags futuros de React Router v7
    window.localStorage.setItem('react-router-future-v7_startTransition', 'true');
    window.localStorage.setItem('react-router-future-v7_relativeSplatPath', 'true');
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />
        <AuthProvider>
          <NotificationProvider>
            <AdminProvider>
              <AnnouncementProvider>
                <Layout>
                  <AppRoutes />
                </Layout>
              </AnnouncementProvider>
            </AdminProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App; 