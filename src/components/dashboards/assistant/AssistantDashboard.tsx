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
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Event as EventIcon,
  Assessment as AssessmentIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AssistantDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    pendingTasks: 5,
    studentsHelped: 12,
    eventsManaged: 3,
    messages: 8,
  });

  const upcomingTasks = [
    { id: 1, title: 'Grade Assignments', dueDate: 'Today', priority: 'high' },
    { id: 2, title: 'Schedule Office Hours', dueDate: 'Tomorrow', priority: 'medium' },
    { id: 3, title: 'Update Course Materials', dueDate: 'Next Week', priority: 'low' },
  ];

  const studentRequests = [
    { id: 1, student: 'John Doe', request: 'Clarification on Assignment', status: 'pending' },
    { id: 2, student: 'Jane Smith', request: 'Extension Request', status: 'completed' },
    { id: 3, student: 'Mike Johnson', request: 'Meeting Request', status: 'in-progress' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Assistant Dashboard
      </Typography>

      {/* Metrics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(metrics).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </Typography>
                <Typography variant="h4">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Upcoming Tasks */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Tasks
            </Typography>
            <List>
              {upcomingTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <ListItem>
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            size="small"
                            label={task.dueDate}
                            color="primary"
                          />
                          <Chip
                            size="small"
                            label={task.priority}
                            color={
                              task.priority === 'high'
                                ? 'error'
                                : task.priority === 'medium'
                                ? 'warning'
                                : 'default'
                            }
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

        {/* Student Requests */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Student Requests
            </Typography>
            <List>
              {studentRequests.map((request) => (
                <React.Fragment key={request.id}>
                  <ListItem>
                    <ListItemText
                      primary={request.student}
                      secondary={
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                          <Typography variant="body2">{request.request}</Typography>
                          <Chip
                            size="small"
                            label={request.status}
                            color={
                              request.status === 'completed'
                                ? 'success'
                                : request.status === 'in-progress'
                                ? 'warning'
                                : 'default'
                            }
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
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AssignmentIcon />}
            onClick={() => navigate('/assistant/tasks')}
          >
            Manage Tasks
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GroupIcon />}
            onClick={() => navigate('/assistant/students')}
          >
            Student Support
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<EventIcon />}
            onClick={() => navigate('/assistant/calendar')}
          >
            Calendar
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ChatIcon />}
            onClick={() => navigate('/assistant/messages')}
          >
            Messages
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AssistantDashboard; 