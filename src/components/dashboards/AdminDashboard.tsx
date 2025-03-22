import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  PeopleOutline as PeopleIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Assignment as AssignmentIcon,
  SupervisorAccount as MentorIcon,
  Announcement as AnnouncementIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface AdminMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

interface AdminDashboardProps {
  metrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    totalCourses: number;
    activeCourses: number;
    totalRevenue: number;
    pendingReports: number;
    systemHealth: number;
  };
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ metrics }) => {
  const quickStats = [
    {
      title: 'Total Users',
      value: metrics.totalUsers,
      icon: PeopleIcon,
      color: 'primary.main',
    },
    {
      title: 'Active Courses',
      value: metrics.activeCourses,
      icon: SchoolIcon,
      color: 'success.main',
    },
    {
      title: 'Pending Reports',
      value: metrics.pendingReports,
      icon: WarningIcon,
      color: 'warning.main',
    },
    {
      title: 'System Health',
      value: `${metrics.systemHealth}%`,
      icon: AssessmentIcon,
      color: 'info.main',
    },
  ];

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Quick Stats */}
        {quickStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: `${stat.color}`,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <stat.icon sx={{ color: 'white' }} />
                </Box>
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4">{stat.value}</Typography>
            </Paper>
          </Grid>
        ))}

        {/* System Alerts */}
        <Grid item xs={12}>
          {metrics.pendingReports > 0 && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {metrics.pendingReports} reports require your attention
            </Alert>
          )}
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Quick Actions" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AnnouncementIcon />}
                    component={RouterLink}
                    to="/admin/announcements"
                  >
                    New Announcement
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AssignmentIcon />}
                    component={RouterLink}
                    to="/admin/courses/new"
                  >
                    Create Course
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="System Health" />
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Overall System Performance
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={metrics.systemHealth}
                  sx={{ height: 10, borderRadius: 5, mt: 1 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Active Users: {metrics.activeUsers} / {metrics.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;