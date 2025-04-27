import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Cloud as CloudIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import SystemMonitoring from './SystemMonitoring';
import DeploymentPanel from './DeploymentPanel';
import CodeQualityPanel from './CodeQualityPanel';
import SecurityPanel from './SecurityPanel';
import LogViewer from './LogViewer';
import ActionsPanel from './panels/ActionsPanel'; // Update the import path to match the correct location
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TechnicalDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Technical Dashboard
        </Typography>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SpeedIcon />} label="System Monitoring" />
          <Tab icon={<CloudIcon />} label="Deployments" />
          <Tab icon={<CodeIcon />} label="Code Quality" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<AssessmentIcon />} label="Logs" />
          <Tab icon={<BuildCircleIcon />} label="Actions" />
        </Tabs>

        <TabPanel value={activeTab} index={0}>
          <SystemMonitoring />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <DeploymentPanel />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <CodeQualityPanel />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <SecurityPanel />
        </TabPanel>
        <TabPanel value={activeTab} index={4}>
          <LogViewer />
        </TabPanel>
        <TabPanel value={activeTab} index={5}>
          <ActionsPanel />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default TechnicalDashboard;