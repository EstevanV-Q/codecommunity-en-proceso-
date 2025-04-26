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
  Group as GroupIcon,
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SeniorDevDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [developmentMetrics, setDevelopmentMetrics] = useState({
    codeReview: 12,
    pullRequests: 5,
    bugsFixed: 8,
    mentoringSessions: 3,
  });

  const teamMetrics = [
    { name: 'Code Quality', progress: 85, status: 'improving' },
    { name: 'Test Coverage', progress: 75, status: 'stable' },
    { name: 'CI/CD Success', progress: 95, status: 'excellent' },
    { name: 'Documentation', progress: 70, status: 'needs-work' },
  ];

  const codeReviews = [
    { id: 1, title: 'API Refactoring', status: 'pending', priority: 'high' },
    { id: 2, title: 'Performance Optimization', status: 'in-progress', priority: 'medium' },
    { id: 3, title: 'Security Update', status: 'completed', priority: 'critical' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Senior Developer Dashboard
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

      {/* Team Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Team Development Metrics
            </Typography>
            <List>
              {teamMetrics.map((metric) => (
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

        {/* Code Reviews */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Code Reviews
            </Typography>
            <List>
              {codeReviews.map((review) => (
                <React.Fragment key={review.id}>
                  <ListItem>
                    <ListItemText
                      primary={review.title}
                      secondary={
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip
                            size="small"
                            label={review.status}
                            color={
                              review.status === 'completed'
                                ? 'success'
                                : review.status === 'in-progress'
                                ? 'warning'
                                : 'default'
                            }
                          />
                          <Chip
                            size="small"
                            label={review.priority}
                            color={
                              review.priority === 'critical'
                                ? 'error'
                                : review.priority === 'high'
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
            onClick={() => navigate('/senior-dev/code-review')}
          >
            Code Review
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GroupIcon />}
            onClick={() => navigate('/senior-dev/mentoring')}
          >
            Mentoring
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AssessmentIcon />}
            onClick={() => navigate('/senior-dev/performance')}
          >
            Performance
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<BugReportIcon />}
            onClick={() => navigate('/senior-dev/bugs')}
          >
            Bug Tracking
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeniorDevDashboard; 