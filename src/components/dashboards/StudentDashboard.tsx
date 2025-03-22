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
  LinearProgress,
  Paper,
  Chip,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  Timeline as TimelineIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface StudentDashboardProps {
  metrics: {
    coursesInProgress: number;
    completedCourses: number;
    totalPoints: number;
    currentStreak: number;
    achievements: number;
    nextCertification: string;
    courseProgress: Array<{
      name: string;
      progress: number;
      nextLesson: string;
    }>;
    recentAchievements: Array<{
      name: string;
      date: string;
      type: 'course' | 'project' | 'contribution';
    }>;
  };
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ metrics }) => {
  return (
    <Grid container spacing={3}>
      {/* Quick Stats */}
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SchoolIcon color="primary" />
            <Typography variant="h6" sx={{ ml: 1 }}>Active Courses</Typography>
          </Box>
          <Typography variant="h3">{metrics.coursesInProgress}</Typography>
          <Typography variant="body2" color="text.secondary">
            {metrics.completedCourses} courses completed
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <StarIcon color="primary" />
            <Typography variant="h6" sx={{ ml: 1 }}>Total Points</Typography>
          </Box>
          <Typography variant="h3">{metrics.totalPoints}</Typography>
          <Typography variant="body2" color="text.secondary">
            {metrics.currentStreak} day streak
          </Typography>
        </Paper>
      </Grid>

      {/* Course Progress */}
      <Grid item xs={12} md={8}>
        <Card>
          <CardHeader title="Your Progress" />
          <CardContent>
            <List>
              {metrics.courseProgress.map((course, index) => (
                <ListItem key={index}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body1">{course.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={course.progress} 
                      sx={{ height: 8, borderRadius: 5 }} 
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      Next: {course.nextLesson}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Recent Achievements */}
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title="Recent Achievements" 
            action={
              <Chip 
                icon={<TrophyIcon />} 
                label={`${metrics.achievements} total`} 
                color="primary" 
              />
            }
          />
          <CardContent>
            <List>
              {metrics.recentAchievements.map((achievement, index) => (
                <ListItem key={index}>
                  <Box>
                    <Typography variant="body1">{achievement.name}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {achievement.date}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StudentDashboard;