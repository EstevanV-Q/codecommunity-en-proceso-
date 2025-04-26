import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Speed as SpeedIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  NetworkCheck as NetworkIcon,
} from '@mui/icons-material';
import { SystemMetrics } from '../../../types/dashboard';

// Mock data - En producción esto vendría de una API real
const mockMetrics: SystemMetrics = {
  cpu: {
    usage: 45,
    temperature: 65
  },
  memory: {
    total: 32,
    used: 16,
    free: 16
  },
  disk: {
    total: 512,
    used: 384,
    free: 128
  },
  network: {
    upload: 25,
    download: 18,
    latency: 45
  }
};

interface MetricCardProps {
  title: string;
  value: number;
  total?: number;
  unit?: string;
  icon: React.ReactNode;
}

const MetricCard = ({ title, value, total, unit, icon }: MetricCardProps) => {
  const percentage = total ? (value / total) * 100 : value;
  const color = percentage > 80 ? 'error' : percentage > 60 ? 'warning' : 'primary';

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percentage}
          color={color}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            {value.toFixed(1)} {unit}
          </Typography>
          {total && (
            <Typography variant="body2" color="textSecondary">
              {total} {unit}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

function SystemMonitoring() {
  const [metrics, setMetrics] = useState<SystemMetrics>(mockMetrics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshMetrics = async () => {
    setLoading(true);
    try {
      // En producción, aquí iría la llamada a la API real
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMetrics({
        ...mockMetrics,
        cpu: {
          ...mockMetrics.cpu,
          usage: Math.random() * 100
        }
      });
      setError(null);
    } catch (err) {
      setError('Error al cargar las métricas del sistema');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshMetrics();
    const interval = setInterval(refreshMetrics, 30000); // Actualizar cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">System Monitoring</Typography>
        <IconButton onClick={refreshMetrics} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="CPU Usage"
            value={metrics.cpu.usage}
            unit="%"
            icon={<SpeedIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Memory"
            value={metrics.memory.used}
            total={metrics.memory.total}
            unit="GB"
            icon={<MemoryIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Disk"
            value={metrics.disk.used}
            total={metrics.disk.total}
            unit="GB"
            icon={<StorageIcon color="primary" />}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <MetricCard
            title="Network Latency"
            value={metrics.network.latency}
            unit="ms"
            icon={<NetworkIcon color="primary" />}
          />
        </Grid>
      </Grid>

      {loading && (
        <LinearProgress sx={{ mt: 3 }} />
      )}
    </Box>
  );
}

export default SystemMonitoring; 