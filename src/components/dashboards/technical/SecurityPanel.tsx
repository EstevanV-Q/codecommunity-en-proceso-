import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  BugReport as BugIcon,
} from '@mui/icons-material';
import { SecurityAlert } from '../../../types/dashboard';

// Mock data
const mockAlerts: SecurityAlert[] = [
  {
    id: '1',
    severity: 'critical',
    title: 'SQL Injection Vulnerability',
    description: 'Critical SQL Injection vulnerability in login endpoint',
    status: 'open',
    timestamp: new Date().toISOString(),
    affectedComponent: '/api/auth/login',
    type: 'vulnerability',
    affected: '/api/auth/login',
    discovered: new Date().toISOString(),
  },
  {
    id: '2',
    severity: 'high',
    title: 'Outdated Package',
    description: 'Outdated package with known vulnerabilities',
    status: 'in-progress',
    timestamp: new Date().toISOString(),
    affectedComponent: 'node_modules/example-package',
    type: 'dependency',
    affected: 'node_modules/example-package',
    discovered: new Date().toISOString(),
  },
  // ... más alertas mock
];

const SecurityPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(mockAlerts);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    // Simular escaneo
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const handleResolve = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved' as const }
        : alert
    ));
  };

  const getSeverityColor = (severity: SecurityAlert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: SecurityAlert['status']) => {
    switch (status) {
      case 'resolved':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'open':
        return 'error';
      default:
        return 'default';
    }
  };

  const alertsByStatus = {
    open: alerts.filter(a => a.status === 'open'),
    inProgress: alerts.filter(a => a.status === 'in-progress'),
    resolved: alerts.filter(a => a.status === 'resolved')
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Security Overview</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<SecurityIcon />}
            onClick={handleScan}
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Run Security Scan
          </Button>
          <IconButton disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon color="error" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Critical/High
                </Typography>
              </Box>
              <Typography variant="h3">
                {alerts.filter(a => ['critical', 'high'].includes(a.severity)).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BugIcon color="warning" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Open Issues
                </Typography>
              </Box>
              <Typography variant="h3">
                {alertsByStatus.open.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Resolved
                </Typography>
              </Box>
              <Typography variant="h3">
                {alertsByStatus.resolved.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Alerts Table */}
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Severity</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Affected</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Discovered</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <Chip
                        label={alert.severity}
                        color={getSeverityColor(alert.severity)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{alert.type}</TableCell>
                    <TableCell>{alert.description}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                        {alert.affected}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={alert.status}
                        color={getStatusColor(alert.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(alert.discovered).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {alert.status !== 'resolved' && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handleResolve(alert.id)}
                        >
                          Resolve
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default SecurityPanel; 