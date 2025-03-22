import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Chip,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Datos de ejemplo - En una aplicación real, estos vendrían de una API
const statsData = {
  users: {
    total: 1250,
    active: 850,
    new: 125,
  },
  courses: {
    total: 45,
    active: 38,
    students: 2500,
  },
  projects: {
    total: 120,
    active: 85,
    collaborators: 450,
  },
};

const recentUsers = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    role: 'student',
    joinDate: '2024-03-20',
  },
  {
    id: 2,
    name: 'Laura Martínez',
    email: 'laura@example.com',
    role: 'instructor',
    joinDate: '2024-03-19',
  },
  {
    id: 3,
    name: 'Miguel Torres',
    email: 'miguel@example.com',
    role: 'student',
    joinDate: '2024-03-18',
  },
];

const recentCourses = [
  {
    id: 1,
    title: 'React Avanzado',
    instructor: 'Ana García',
    students: 125,
    progress: 75,
  },
  {
    id: 2,
    title: 'Node.js y Express',
    instructor: 'Carlos Rodríguez',
    students: 98,
    progress: 60,
  },
  {
    id: 3,
    title: 'TypeScript Esencial',
    instructor: 'Laura Martínez',
    students: 156,
    progress: 90,
  },
];

const recentProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    leader: 'Miguel Torres',
    collaborators: 4,
    status: 'active',
  },
  {
    id: 2,
    title: 'Task Management App',
    leader: 'Ana García',
    collaborators: 3,
    status: 'completed',
  },
  {
    id: 3,
    title: 'Social Media Dashboard',
    leader: 'Carlos Rodríguez',
    collaborators: 5,
    status: 'active',
  },
];

const Admin = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">Usuarios</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {statsData.users.total}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Activos: {statsData.users.active}
                </Typography>
                <Typography variant="body2" color="success.main">
                  +{statsData.users.new} nuevos
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ fontSize: 40, color: 'secondary.main', mr: 2 }} />
                <Typography variant="h6">Cursos</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {statsData.courses.total}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Activos: {statsData.courses.active}
                </Typography>
                <Typography variant="body2" color="info.main">
                  {statsData.courses.students} estudiantes
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CodeIcon sx={{ fontSize: 40, color: 'success.main', mr: 2 }} />
                <Typography variant="h6">Proyectos</Typography>
              </Box>
              <Typography variant="h4" gutterBottom>
                {statsData.projects.total}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Activos: {statsData.projects.active}
                </Typography>
                <Typography variant="body2" color="info.main">
                  {statsData.projects.collaborators} colaboradores
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contenido Principal */}
      <Grid container spacing={3}>
        {/* Usuarios Recientes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Usuarios Recientes</Typography>
              <Button startIcon={<AddIcon />}>
                Nuevo Usuario
              </Button>
            </Box>
            <List>
              {recentUsers.map((user, index) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemText
                      primary={user.name}
                      secondary={
                        <>
                          {user.email}
                          <Chip
                            label={user.role}
                            size="small"
                            color={user.role === 'instructor' ? 'primary' : 'default'}
                            sx={{ ml: 1 }}
                          />
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < recentUsers.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Cursos Recientes */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Cursos Recientes</Typography>
              <Button startIcon={<AddIcon />}>
                Nuevo Curso
              </Button>
            </Box>
            <List>
              {recentCourses.map((course, index) => (
                <React.Fragment key={course.id}>
                  <ListItem>
                    <ListItemText
                      primary={course.title}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            Instructor: {course.instructor}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <Box sx={{ flexGrow: 1, mr: 2 }}>
                              <LinearProgress
                                variant="determinate"
                                value={course.progress}
                                sx={{ height: 6, borderRadius: 3 }}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {course.progress}%
                            </Typography>
                          </Box>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < recentCourses.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Proyectos Recientes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Proyectos Recientes</Typography>
              <Button startIcon={<AddIcon />}>
                Nuevo Proyecto
              </Button>
            </Box>
            <List>
              {recentProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <ListItem>
                    <ListItemText
                      primary={project.title}
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            Líder: {project.leader}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Chip
                              label={`${project.collaborators} colaboradores`}
                              size="small"
                              sx={{ mr: 1 }}
                            />
                            <Chip
                              label={project.status}
                              size="small"
                              color={project.status === 'active' ? 'primary' : 'success'}
                            />
                          </Box>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="edit" sx={{ mr: 1 }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < recentProjects.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin; 