import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    coursesEnrolled: 4,
    assignmentsDue: 3,
    averageGrade: 85,
    attendance: 95,
  });

  const upcomingAssignments = [
    { id: 1, title: 'Math Homework', course: 'Mathematics', dueDate: 'Tomorrow', status: 'pending' },
    { id: 2, title: 'Science Project', course: 'Science', dueDate: 'Next Week', status: 'in-progress' },
    { id: 3, title: 'History Essay', course: 'History', dueDate: 'Today', status: 'completed' },
  ];

  const courseProgress = [
    { name: 'Mathematics', progress: 75, grade: 90 },
    { name: 'Science', progress: 60, grade: 85 },
    { name: 'History', progress: 85, grade: 88 },
    { name: 'English', progress: 70, grade: 92 },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>

      {/* Student Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(metrics).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </Typography>
                <Typography variant="h4">{value}{key === 'averageGrade' || key === 'attendance' ? '%' : ''}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Course Progress */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Course Progress
            </Typography>
            <List>
              {courseProgress.map((course) => (
                <React.Fragment key={course.name}>
                  <ListItem>
                    <ListItemText
                      primary={course.name}
                      secondary={
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                              Progress
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Grade: {course.grade}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={course.progress}
                            color={course.progress > 80 ? 'success' : course.progress > 60 ? 'warning' : 'error'}
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Assignments */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Assignments
            </Typography>
            <List>
              {upcomingAssignments.map((assignment) => (
                <React.Fragment key={assignment.id}>
                  <ListItem>
                    <ListItemText
                      primary={assignment.title}
                      secondary={
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                          <Typography variant="body2">{assignment.course}</Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip
                              size="small"
                              label={assignment.dueDate}
                              color="primary"
                            />
                            <Chip
                              size="small"
                              label={assignment.status}
                              color={
                                assignment.status === 'completed'
                                  ? 'success'
                                  : assignment.status === 'in-progress'
                                  ? 'warning'
                                  : 'default'
                              }
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AssignmentIcon />}
            onClick={() => navigate('/student/assignments')}
          >
            Assignments
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SchoolIcon />}
            onClick={() => navigate('/student/courses')}
          >
            Courses
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EventIcon />}
            onClick={() => navigate('/student/schedule')}
          >
            Schedule
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ChatIcon />}
            onClick={() => navigate('/student/messages')}
          >
            Messages
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboard; 