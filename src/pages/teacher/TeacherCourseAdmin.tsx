import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CourseManagement from './CourseManagement';
import CourseContentManagement from './CourseContentManagement';
import StudentManagement from './StudentManagement';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`course-admin-tabpanel-${index}`}
      aria-labelledby={`course-admin-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TeacherCourseAdmin: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        // TODO: Implementar llamada a la API para verificar permisos
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del curso');
        console.error(err);
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Administración del Curso
      </Typography>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Información General" />
          <Tab label="Contenido" />
          <Tab label="Estudiantes" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <CourseManagement />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <CourseContentManagement />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <StudentManagement />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default TeacherCourseAdmin; 