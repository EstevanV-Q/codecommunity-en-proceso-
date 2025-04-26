import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  School as SchoolIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  Book as BookIcon,
  VideoLibrary as VideoIcon,
  LiveTv as LiveIcon,
} from '@mui/icons-material';

import CourseManagement from './CourseManagement';
import StudentProgress from './StudentProgress';
import AssignmentManager from './AssignmentManager';
import GradeBook from './GradeBook';
import MaterialLibrary from './MaterialLibrary';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`teacher-tabpanel-${index}`}
      aria-labelledby={`teacher-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Panel del Profesor
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SchoolIcon />} label="Mis Cursos" />
          <Tab icon={<PeopleIcon />} label="Estudiantes" />
          <Tab icon={<AssignmentIcon />} label="Asignaciones" />
          <Tab icon={<AssessmentIcon />} label="Calificaciones" />
          <Tab icon={<BookIcon />} label="Materiales" />
          <Tab icon={<VideoIcon />} label="Videos Grabados" />
          <Tab icon={<LiveIcon />} label="Clases en Vivo" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <CourseManagement />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <StudentProgress />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <AssignmentManager />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <GradeBook />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <MaterialLibrary />
        </TabPanel>
        <TabPanel value={activeTab} index={5}>
          <CourseManagement courseType="recorded" />
        </TabPanel>
        <TabPanel value={activeTab} index={6}>
          <CourseManagement courseType="live" />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default TeacherDashboard; 