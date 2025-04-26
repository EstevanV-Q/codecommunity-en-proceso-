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
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

interface GradeEntry {
  studentId: string;
  studentName: string;
  email: string;
  assignments: {
    [key: string]: {
      grade: number | null;
      feedback: string;
      submitted: boolean;
      dueDate: string;
    };
  };
  totalGrade: number;
}

interface AssignmentHeader {
  id: string;
  title: string;
  maxPoints: number;
  weight: number;
}

// Mock data
const mockAssignments: AssignmentHeader[] = [
  { id: 'a1', title: 'Assignment 1', maxPoints: 100, weight: 0.2 },
  { id: 'a2', title: 'Midterm', maxPoints: 100, weight: 0.3 },
  { id: 'a3', title: 'Project', maxPoints: 100, weight: 0.3 },
  { id: 'a4', title: 'Final', maxPoints: 100, weight: 0.2 },
];

const mockGrades: GradeEntry[] = [
  {
    studentId: '1',
    studentName: 'John Doe',
    email: 'john@example.com',
    assignments: {
      a1: { grade: 85, feedback: 'Good work', submitted: true, dueDate: '2024-02-15' },
      a2: { grade: 78, feedback: 'Room for improvement', submitted: true, dueDate: '2024-03-01' },
      a3: { grade: 92, feedback: 'Excellent project', submitted: true, dueDate: '2024-04-15' },
      a4: { grade: null, feedback: '', submitted: false, dueDate: '2024-05-15' },
    },
    totalGrade: 85,
  },
  // ... más estudiantes mock
];

const GradeBook: React.FC = () => {
  const [grades, setGrades] = useState<GradeEntry[]>(mockGrades);
  const [assignments] = useState<AssignmentHeader[]>(mockAssignments);
  const [loading, setLoading] = useState(false);
  const [editingCell, setEditingCell] = useState<{ studentId: string; assignmentId: string } | null>(null);
  const [tempGrade, setTempGrade] = useState<string>('');
  const [openFeedback, setOpenFeedback] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<{ 
    studentId: string; 
    assignmentId: string; 
    feedback: string; 
  } | null>(null);
  const [filters, setFilters] = useState({
    assignment: 'all',
    gradeRange: 'all',
  });

  const handleEditStart = (studentId: string, assignmentId: string, currentGrade: number | null) => {
    setEditingCell({ studentId, assignmentId });
    setTempGrade(currentGrade?.toString() ?? '');
  };

  const handleEditCancel = () => {
    setEditingCell(null);
    setTempGrade('');
  };

  const handleEditSave = async (studentId: string, assignmentId: string) => {
    setLoading(true);
    // Simular guardado
    await new Promise(resolve => setTimeout(resolve, 500));

    const newGrade = tempGrade === '' ? null : Number(tempGrade);
    
    setGrades(grades.map(student => {
      if (student.studentId === studentId) {
        const newAssignments = {
          ...student.assignments,
          [assignmentId]: {
            ...student.assignments[assignmentId],
            grade: newGrade,
          },
        };
        
        // Recalcular total grade
        const totalGrade = calculateTotalGrade(newAssignments);
        
        return {
          ...student,
          assignments: newAssignments,
          totalGrade,
        };
      }
      return student;
    }));

    setEditingCell(null);
    setTempGrade('');
    setLoading(false);
  };

  const calculateTotalGrade = (studentAssignments: GradeEntry['assignments']) => {
    let totalWeight = 0;
    let weightedSum = 0;

    assignments.forEach(assignment => {
      const grade = studentAssignments[assignment.id]?.grade;
      if (grade !== null && grade !== undefined) {
        weightedSum += (grade * assignment.weight);
        totalWeight += assignment.weight;
      }
    });

    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  const handleOpenFeedback = (studentId: string, assignmentId: string, feedback: string) => {
    setSelectedFeedback({ studentId, assignmentId, feedback });
    setOpenFeedback(true);
  };

  const handleSaveFeedback = async () => {
    if (!selectedFeedback) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    setGrades(grades.map(student => {
      if (student.studentId === selectedFeedback.studentId) {
        return {
          ...student,
          assignments: {
            ...student.assignments,
            [selectedFeedback.assignmentId]: {
              ...student.assignments[selectedFeedback.assignmentId],
              feedback: selectedFeedback.feedback,
            },
          },
        };
      }
      return student;
    }));

    setOpenFeedback(false);
    setSelectedFeedback(null);
    setLoading(false);
  };

  const getGradeColor = (grade: number | null) => {
    if (grade === null) return 'default';
    if (grade >= 90) return 'success';
    if (grade >= 70) return 'warning';
    return 'error';
  };

  const filteredGrades = grades.filter(student => {
    if (filters.gradeRange !== 'all') {
      const [min, max] = filters.gradeRange.split('-').map(Number);
      if (student.totalGrade < min || student.totalGrade > max) return false;
    }
    return true;
  });

  const exportGrades = () => {
    // Implementar exportación a CSV
    console.log('Exporting grades...');
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Gradebook</Typography>
        <Box>
          <Button
            startIcon={<DownloadIcon />}
            onClick={exportGrades}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            startIcon={<UploadIcon />}
          >
            Import
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Grade Range</InputLabel>
            <Select
              value={filters.gradeRange}
              label="Grade Range"
              onChange={(e) => setFilters({ ...filters, gradeRange: e.target.value })}
            >
              <MenuItem value="all">All Grades</MenuItem>
              <MenuItem value="0-60">0-60</MenuItem>
              <MenuItem value="60-70">60-70</MenuItem>
              <MenuItem value="70-80">70-80</MenuItem>
              <MenuItem value="80-90">80-90</MenuItem>
              <MenuItem value="90-100">90-100</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              {assignments.map((assignment) => (
                <TableCell key={assignment.id} align="center">
                  <Tooltip title={`Weight: ${assignment.weight * 100}%`}>
                    <Box>
                      <Typography variant="subtitle2">{assignment.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        ({assignment.maxPoints} pts)
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>
              ))}
              <TableCell align="center">Total Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrades.map((student) => (
              <TableRow key={student.studentId}>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2">{student.studentName}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {student.email}
                    </Typography>
                  </Box>
                </TableCell>
                {assignments.map((assignment) => {
                  const gradeInfo = student.assignments[assignment.id];
                  const isEditing = editingCell?.studentId === student.studentId && 
                                  editingCell?.assignmentId === assignment.id;

                  return (
                    <TableCell key={assignment.id} align="center">
                      {isEditing ? (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <TextField
                            size="small"
                            value={tempGrade}
                            onChange={(e) => setTempGrade(e.target.value)}
                            type="number"
                            inputProps={{ min: 0, max: assignment.maxPoints }}
                            sx={{ width: 70 }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleEditSave(student.studentId, assignment.id)}
                          >
                            <SaveIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={handleEditCancel}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Chip
                              label={gradeInfo.grade ?? 'N/A'}
                              size="small"
                              color={getGradeColor(gradeInfo.grade)}
                            />
                            <IconButton
                              size="small"
                              onClick={() => handleEditStart(student.studentId, assignment.id, gradeInfo.grade)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          {gradeInfo.feedback && (
                            <IconButton
                              size="small"
                              onClick={() => handleOpenFeedback(student.studentId, assignment.id, gradeInfo.feedback)}
                            >
                              <AssessmentIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
                <TableCell align="center">
                  <Chip
                    label={`${student.totalGrade}%`}
                    color={getGradeColor(student.totalGrade)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Feedback Dialog */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={selectedFeedback?.feedback ?? ''}
            onChange={(e) => setSelectedFeedback(prev => prev ? { ...prev, feedback: e.target.value } : null)}
            placeholder="Enter feedback..."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFeedback(false)}>Cancel</Button>
          <Button onClick={handleSaveFeedback} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default GradeBook; 