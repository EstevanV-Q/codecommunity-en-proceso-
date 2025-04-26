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
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as FlatIcon,
  Assessment as AssessmentIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { Student } from '../../../types/dashboard';

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    progress: {
      courseProgress: 75,
      assignmentsCompleted: 8,
      totalAssignments: 12,
      averageGrade: 85,
      lastActivity: '2024-03-15T14:30:00Z',
      trend: 'up',
    },
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    progress: {
      courseProgress: 60,
      assignmentsCompleted: 6,
      totalAssignments: 12,
      averageGrade: 72,
      lastActivity: '2024-03-14T10:15:00Z',
      trend: 'stable',
    },
  },
  // ... más estudiantes mock
];

const StudentProgress: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    progress: 'all',
    search: '',
  });
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUpIcon color="success" />;
      case 'down':
        return <TrendingDownIcon color="error" />;
      default:
        return <FlatIcon color="action" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'success';
    if (progress >= 50) return 'warning';
    return 'error';
  };

  const handleOpenDetails = (student: Student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter(student => {
    if (filters.progress !== 'all') {
      const progress = parseInt(filters.progress);
      if (student.progress.courseProgress < progress || student.progress.courseProgress >= progress + 25) {
        return false;
      }
    }
    if (filters.search && !student.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Student Progress</Typography>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Progress</InputLabel>
            <Select
              value={filters.progress}
              label="Progress"
              onChange={(e) => setFilters({ ...filters, progress: e.target.value })}
            >
              <MenuItem value="all">All Progress</MenuItem>
              <MenuItem value="0">0-25%</MenuItem>
              <MenuItem value="25">25-50%</MenuItem>
              <MenuItem value="50">50-75%</MenuItem>
              <MenuItem value="75">75-100%</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Search Student"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            sx={{ flexGrow: 1 }}
          />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Assignments</TableCell>
              <TableCell>Average Grade</TableCell>
              <TableCell>Last Activity</TableCell>
              <TableCell>Trend</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">{student.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {student.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={student.progress.courseProgress}
                      color={getProgressColor(student.progress.courseProgress)}
                      sx={{ width: 100 }}
                    />
                    <Typography variant="body2">
                      {student.progress.courseProgress}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {`${student.progress.assignmentsCompleted}/${student.progress.totalAssignments}`}
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${student.progress.averageGrade}%`}
                    color={student.progress.averageGrade >= 70 ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {new Date(student.progress.lastActivity).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {getTrendIcon(student.progress.trend)}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDetails(student)}
                    sx={{ mr: 1 }}
                  >
                    <AssessmentIcon />
                  </IconButton>
                  <IconButton size="small">
                    <MessageIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Student Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Student Details - {selectedStudent?.name}
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ pt: 2 }}>
              {/* Aquí iría un componente más detallado con gráficos de progreso,
                  historial de asignaciones, etc. */}
              <Typography variant="h6" gutterBottom>
                Progress Overview
              </Typography>
              <Grid container spacing={2}>
                {/* Detalles adicionales del estudiante */}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default StudentProgress; 