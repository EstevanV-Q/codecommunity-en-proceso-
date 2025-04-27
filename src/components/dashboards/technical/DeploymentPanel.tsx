import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  PlayArrow as DeployIcon,
  History as HistoryIcon,
  CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import { DeploymentInfo } from '../../../types/dashboard';

// Mock data
const mockDeployments: DeploymentInfo[] = [
  {
    id: '1',
    version: 'v1.2.3',
    environment: 'production',
    status: 'success',
    timestamp: new Date().toISOString(),
    commitHash: 'abc123def456',
    author: 'John Doe',
    changes: ['Feature: New dashboard', 'Fix: Login issue']
  },
  {
    id: '2',
    version: 'v1.2.2',
    environment: 'staging',
    status: 'in-progress',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    commitHash: 'xyz789uvw123',
    author: 'Jane Smith',
    changes: ['Update: Dependencies', 'Feature: User profiles']
  }
];

const DeploymentPanel: React.FC = () => {
  const [deployments, setDeployments] = useState<DeploymentInfo[]>(mockDeployments);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<'development' | 'staging' | 'production'>('development');
  const [version, setVersion] = useState('');

  const handleDeploy = () => {
    const newDeployment: DeploymentInfo = {
      id: Date.now().toString(),
      version,
      environment: selectedEnvironment,
      status: 'in-progress',
      timestamp: new Date().toISOString(),
      commitHash: Math.random().toString(36).substring(2, 10),
      author: 'Current User',
      changes: ['Pending...']
    };

    setDeployments([newDeployment, ...deployments]);
    setOpenDialog(false);
  };

  const getStatusColor = (status: DeploymentInfo['status']) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'in-progress':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getEnvironmentColor = (env: DeploymentInfo['environment']) => {
    switch (env) {
      case 'production':
        return 'error';
      case 'staging':
        return 'warning';
      case 'development':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Deployments</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            onClick={() => setOpenDialog(true)}
            sx={{ mr: 1 }}
          >
            New Deployment
          </Button>
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Version</TableCell>
              <TableCell>Environment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Changes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell>
                  <Box>
                    <Typography variant="body2">{deployment.version}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {deployment.commitHash.substring(0, 7)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={deployment.environment}
                    color={getEnvironmentColor(deployment.environment)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={deployment.status}
                    color={getStatusColor(deployment.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{deployment.author}</TableCell>
                <TableCell>
                  {new Date(deployment.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  {deployment.changes.map((change, index) => (
                    <Typography key={index} variant="caption" display="block">
                      • {change}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>
                  <IconButton size="small">
                    <HistoryIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>New Deployment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Environment</InputLabel>
          <Select
            value={selectedEnvironment}
            label="Environment"
            onChange={(e) => setSelectedEnvironment(e.target.value as any)}
          >
            <MenuItem value="development">Development</MenuItem>
            <MenuItem value="staging">Staging</MenuItem>
            <MenuItem value="production">Production</MenuItem>
          </Select>
        </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
        variant="contained"
        onClick={handleDeploy}
        disabled={!version}
        startIcon={<DeployIcon />}
          >
        Deploy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeploymentPanel; 