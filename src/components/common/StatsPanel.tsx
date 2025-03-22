import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Tooltip,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface StatItem {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
  tooltip?: string;
}

interface StatsPanelProps {
  stats: StatItem[];
  loading?: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, loading = false }) => {
  const theme = useTheme();

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUpIcon color="success" />;
    if (change < 0) return <TrendingDownIcon color="error" />;
    return <TrendingFlatIcon color="action" />;
  };

  const formatChange = (change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change}%`;
  };

  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              position: 'relative',
              overflow: 'visible',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    backgroundColor: `${stat.color}15`,
                    borderRadius: '50%',
                    p: 1,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ mt: 0.5 }}>
                    {stat.value}
                  </Typography>
                </Box>
                {stat.tooltip && (
                  <Tooltip title={stat.tooltip}>
                    <IconButton size="small">
                      <InfoIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getTrendIcon(stat.change)}
                <Typography
                  variant="body2"
                  color={stat.change > 0 ? 'success.main' : stat.change < 0 ? 'error.main' : 'text.secondary'}
                >
                  {formatChange(stat.change)}
                </Typography>
              </Box>

              {loading && (
                <LinearProgress
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    borderRadius: 0,
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsPanel; 