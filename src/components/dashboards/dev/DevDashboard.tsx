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
  Code as CodeIcon,
  BugReport as BugReportIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Build as BuildIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DevDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [developmentMetrics, setDevelopmentMetrics] = useState({
    tasksCompleted: 8,
    pullRequests: 3,
    codeReviews: 5,
    bugsFixed: 4,
  });

  const currentTasks = [
    { id: 1, title: 'Implement User Authentication', status: 'in-progress', priority: 'high' },
    { id: 2, title: 'Fix API Response Time', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Update Documentation', status: 'completed', priority: 'low' },
  ];

  const codeQuality = [
    { name: 'Test Coverage', progress: 75, status: 'improving' },
    { name: 'Code Style', progress: 90, status: 'excellent' },
    { name: 'Documentation', progress: 60, status: 'needs-work' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Developer Dashboard
      </Typography>

      {/* Development Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(developmentMetrics).map(([key, value]) => (
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

      {/* Current Tasks */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Tasks
            </Typography>
            <List>
              {currentTasks.map((task) => (
                <React.Fragment key={task.id}>
                  <ListItem>
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            size="small"
                            label={task.status}
                            color={
                              task.status === 'completed'
                                ? 'success'
                                : task.status === 'in-progress'
                                ? 'warning'
                                : 'default'
                            }
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

        {/* Code Quality */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Code Quality
            </Typography>
            <List>
              {codeQuality.map((metric) => (
                <React.Fragment key={metric.name}>
                  <ListItem>
                    <ListItemText
                      primary={metric.name}
                      secondary={
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={metric.progress}
                            color={metric.progress > 90 ? 'success' : metric.progress > 70 ? 'warning' : 'error'}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                              {metric.progress}%
                            </Typography>
                            <Chip
                              size="small"
                              label={metric.status}
                              color={
                                metric.status === 'excellent'
                                  ? 'success'
                                  : metric.status === 'improving'
                                  ? 'warning'
                                  : 'error'
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
            startIcon={<CodeIcon />}
            onClick={() => navigate('/dev/tasks')}
          >
            My Tasks
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<BugReportIcon />}
            onClick={() => navigate('/dev/bugs')}
          >
            Bug Tracking
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<BuildIcon />}
            onClick={() => navigate('/dev/builds')}
          >
            Build Status
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={() => navigate('/dev/performance')}
          >
            Performance
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DevDashboard; 