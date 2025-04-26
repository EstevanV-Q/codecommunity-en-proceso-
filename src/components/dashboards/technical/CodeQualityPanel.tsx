import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Chip,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  BugReport as BugIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Timer as TimerIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { CodeMetrics } from '../../../types/dashboard';

// Mock data
const mockMetrics: CodeMetrics = {
  coverage: 85,
  qualityGate: 'passed',
  bugs: 12,
  vulnerabilities: 3,
  codeSmells: 45,
  technicalDebt: 3.5,
  duplications: 4.2,
  maintainability: 'A'
};

const CodeQualityPanel: React.FC = () => {
  const [metrics, setMetrics] = useState<CodeMetrics>(mockMetrics);
  const [loading, setLoading] = useState(false);

  const refreshMetrics = async () => {
    setLoading(true);
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const getQualityColor = (value: number, threshold: number) => {
    if (value > threshold) return 'error';
    if (value > threshold / 2) return 'warning';
    return 'success';
  };

  const MetricCard: React.FC<{
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: string;
  }> = ({ title, value, icon, color }) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {icon}
          <Typography variant="subtitle2" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Code Quality</Typography>
        <IconButton onClick={refreshMetrics} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Coverage Metric */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Code Coverage
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={metrics.coverage}
                size={120}
                thickness={4}
                color={metrics.coverage > 80 ? 'success' : 'warning'}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" component="div">
                  {`${Math.round(metrics.coverage)}%`}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Quality Gate */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Quality Gate
            </Typography>
            <Chip
              label={metrics.qualityGate.toUpperCase()}
              color={metrics.qualityGate === 'passed' ? 'success' : 'error'}
              sx={{ fontSize: '1.2rem', py: 3, px: 6 }}
            />
          </Paper>
        </Grid>

        {/* Metrics Cards */}
        <Grid item xs={12} md={3}>
          <MetricCard
            title="Bugs"
            value={metrics.bugs}
            icon={<BugIcon color="error" />}
            color={getQualityColor(metrics.bugs, 20)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard
            title="Vulnerabilities"
            value={metrics.vulnerabilities}
            icon={<SecurityIcon color="warning" />}
            color={getQualityColor(metrics.vulnerabilities, 5)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard
            title="Code Smells"
            value={metrics.codeSmells}
            icon={<CodeIcon color="info" />}
            color={getQualityColor(metrics.codeSmells, 50)}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricCard
            title="Technical Debt"
            value={metrics.technicalDebt}
            icon={<TimerIcon color="secondary" />}
          />
        </Grid>
      </Grid>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default CodeQualityPanel; 