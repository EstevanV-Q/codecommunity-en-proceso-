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
  Security as SecurityIcon,
  Cloud as CloudIcon,
  BugReport as BugReportIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CTODashboard: React.FC = () => {
  const navigate = useNavigate();
  const [systemMetrics, setSystemMetrics] = useState({
    uptime: '99.99%',
    responseTime: '120ms',
    errorRate: '0.01%',
    activeUsers: 2500,
  });

  const techStack = [
    { name: 'Frontend', progress: 90, status: 'stable' },
    { name: 'Backend', progress: 85, status: 'stable' },
    { name: 'Database', progress: 95, status: 'stable' },
    { name: 'DevOps', progress: 80, status: 'improving' },
  ];

  const criticalIssues = [
    { id: 1, title: 'API Response Time', severity: 'high', status: 'in-progress' },
    { id: 2, title: 'Database Optimization', severity: 'medium', status: 'planned' },
    { id: 3, title: 'Security Patch', severity: 'critical', status: 'completed' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        CTO Dashboard
      </Typography>

      {/* System Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {Object.entries(systemMetrics).map(([key, value]) => (
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

      {/* Tech Stack Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Tech Stack Health
            </Typography>
            <List>
              {techStack.map((tech) => (
                <React.Fragment key={tech.name}>
                  <ListItem>
                    <ListItemText
                      primary={tech.name}
                      secondary={
                        <Box sx={{ width: '100%', mt: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={tech.progress}
                            color={tech.progress > 90 ? 'success' : tech.progress > 70 ? 'warning' : 'error'}
                          />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="body2" color="textSecondary">
                              {tech.progress}%
                            </Typography>
                            <Chip
                              size="small"
                              label={tech.status}
                              color={
                                tech.status === 'stable'
                                  ? 'success'
                                  : tech.status === 'improving'
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

        {/* Critical Issues */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Critical Issues
            </Typography>
            <List>
              {criticalIssues.map((issue) => (
                <React.Fragment key={issue.id}>
                  <ListItem>
                    <ListItemText
                      primary={issue.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            size="small"
                            label={issue.severity}
                            color={
                              issue.severity === 'critical'
                                ? 'error'
                                : issue.severity === 'high'
                                ? 'warning'
                                : 'default'
                            }
                          />
                          <Chip
                            size="small"
                            label={issue.status}
                            color={
                              issue.status === 'completed'
                                ? 'success'
                                : issue.status === 'in-progress'
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
            startIcon={<CodeIcon />}
            onClick={() => navigate('/cto/code-review')}
          >
            Code Review
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SecurityIcon />}
            onClick={() => navigate('/cto/security')}
          >
            Security
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<CloudIcon />}
            onClick={() => navigate('/cto/infrastructure')}
          >
            Infrastructure
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<TimelineIcon />}
            onClick={() => navigate('/cto/performance')}
          >
            Performance
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CTODashboard; 