import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  EmojiEvents,
  School,
  Timer,
  Grade,
  Forum,
} from '@mui/icons-material';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  icon: React.ReactNode;
  unlocked: boolean;
}

const AchievementsPanel: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Estudiante Dedicado',
      description: 'Completa 5 cursos',
      progress: 3,
      maxProgress: 5,
      icon: <School color="primary" />,
      unlocked: false,
    },
    {
      id: '2',
      title: 'Participante Activo',
      description: 'Participa en 10 discusiones',
      progress: 10,
      maxProgress: 10,
      icon: <Forum color="primary" />,
      unlocked: true,
    },
    {
      id: '3',
      title: 'Aprendiz Veloz',
      description: 'Completa un curso en menos de una semana',
      progress: 1,
      maxProgress: 1,
      icon: <Timer color="primary" />,
      unlocked: true,
    },
    {
      id: '4',
      title: 'Experto en Desarrollo',
      description: 'Obtén una calificación perfecta en un curso',
      progress: 0,
      maxProgress: 1,
      icon: <Grade color="primary" />,
      unlocked: false,
    },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Logros
      </Typography>
      <Grid container spacing={2}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                opacity: achievement.unlocked ? 1 : 0.7,
                transition: 'opacity 0.3s',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Badge
                  badgeContent={achievement.unlocked ? <EmojiEvents color="primary" /> : null}
                >
                  {achievement.icon}
                </Badge>
                <Typography variant="subtitle1" sx={{ ml: 1 }}>
                  {achievement.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {achievement.description}
              </Typography>
              <Tooltip title={`${achievement.progress}/${achievement.maxProgress}`}>
                <LinearProgress
                  variant="determinate"
                  value={(achievement.progress / achievement.maxProgress) * 100}
                  sx={{ mt: 1 }}
                />
              </Tooltip>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AchievementsPanel;
