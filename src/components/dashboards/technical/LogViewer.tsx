import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { LogEntry } from '../../../types/dashboard';

// Mock data
const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: new Date().toISOString(),
    level: 'error',
    service: 'auth-service',
    message: 'Failed login attempt',
    metadata: { userId: '123', ip: '192.168.1.1' }
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 5000).toISOString(),
    level: 'info',
    service: 'user-service',
    message: 'User profile updated',
    metadata: { userId: '456', changes: ['email'] }
  },
  // ... más logs mock
];

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    level: 'all',
    service: 'all',
    search: '',
  });

  const refreshLogs = async () => {
    setLoading(true);
    // Simular carga de logs
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleExport = () => {
    const exportData = JSON.stringify(logs, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error':
        return 'error';
      case 'warn':
        return 'warning';
      case 'info':
        return 'info';
      case 'debug':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filters.level !== 'all' && log.level !== filters.level) return false;
    if (filters.service !== 'all' && log.service !== filters.service) return false;
    if (filters.search && !log.message.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });

  const services = Array.from(new Set(logs.map(log => log.service)));

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">System Logs</Typography>
        <Box>
          <IconButton onClick={refreshLogs} disabled={loading} sx={{ mr: 1 }}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={handleExport} disabled={loading}>
            <DownloadIcon />
          </IconButton>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Level</InputLabel>
            <Select
              value={filters.level}
              label="Level"
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            >
              <MenuItem value="all">All Levels</MenuItem>
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="info">Info</MenuItem>
              <MenuItem value="debug">Debug</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Service</InputLabel>
            <Select
              value={filters.service}
              label="Service"
              onChange={(e) => setFilters({ ...filters, service: e.target.value })}
            >
              <MenuItem value="all">All Services</MenuItem>
              {services.map(service => (
                <MenuItem key={service} value={service}>{service}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Search"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Metadata</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(log.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={log.level}
                    size="small"
                    color={getLevelColor(log.level)}
                  />
                </TableCell>
                <TableCell>{log.service}</TableCell>
                <TableCell>{log.message}</TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {JSON.stringify(log.metadata)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default LogViewer; 