import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  DateRange as DateIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { Assignment, AssignmentSubmission } from '../../../types/dashboard';

// Mock data
const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Final Project',
    description: 'Build a full-stack web application',
    dueDate: '2024-05-15',
    courseId: '1',
    totalPoints: 100,
    status: 'published',
    type: 'file',
    submissions: [],
    totalStudents: 25,
  },
  {
    id: '2',
    title: 'Midterm Quiz',
    description: 'Online quiz covering chapters 1-5',
    dueDate: '2024-03-30',
    courseId: '1',
    totalPoints: 50,
    status: 'closed',
    type: 'quiz',
    submissions: [],
    totalStudents: 25,
  },
  // ... más asignaciones mock
];

const mockSubmissions: AssignmentSubmission[] = [
  {
    id: '1',
    assignmentId: '1',
    studentId: '1',
    studentName: 'John Doe',
    submissionDate: '2024-03-15T14:30:00Z',
    status: 'submitted',
    grade: null,
    feedback: '',
  },
  // ... más submissions mock
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const AssignmentManager: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(mockSubmissions);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({
    status: 'all',
    course: 'all',
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    totalPoints: 0,
    submissionType: 'file' as 'file' | 'text' | 'quiz',
    courseId: '',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpenDialog = (assignment?: Assignment) => {
    if (assignment) {
      setSelectedAssignment(assignment);
      setFormData({
        title: assignment.title,
        description: assignment.description,
        dueDate: assignment.dueDate,
        totalPoints: assignment.totalPoints,
        submissionType: assignment.type,
        courseId: assignment.courseId,
      });
    } else {
      setSelectedAssignment(null);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        totalPoints: 0,
        submissionType: 'file',
        courseId: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAssignment(null);
  };

  const handleSubmit = () => {
    if (selectedAssignment) {
      setAssignments(assignments.map(assignment =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              title: formData.title,
              description: formData.description,
              dueDate: formData.dueDate,
              totalPoints: formData.totalPoints,
              type: formData.submissionType,
              courseId: formData.courseId,
            }
          : assignment
      ));
    } else {
      const newAssignment: Assignment = {
        id: String(Date.now()),
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        courseId: formData.courseId,
        totalPoints: formData.totalPoints,
        status: 'published',
        type: formData.submissionType,
        submissions: [],
        totalStudents: 25,
      };
      setAssignments([...assignments, newAssignment]);
    }
    handleCloseDialog();
  };

  const handleDelete = async (assignmentId: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAssignments(assignments.filter(a => a.id !== assignmentId));
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'primary';
      case 'closed':
        return 'success';
      case 'draft':
        return 'default';
      default:
        return 'default';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filters.status !== 'all' && assignment.status !== filters.status) return false;
    if (filters.course !== 'all' && assignment.courseId !== filters.course) return false;
    return true;
  });

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Assignments" />
          <Tab label="Submissions" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Assignments</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            New Assignment
          </Button>
        </Box>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                label="Status"
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Course</InputLabel>
              <Select
                value={filters.course}
                label="Course"
                onChange={(e) => setFilters({ ...filters, course: e.target.value })}
              >
                <MenuItem value="all">All Courses</MenuItem>
                <MenuItem value="1">Web Development</MenuItem>
                <MenuItem value="2">React Programming</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {filteredAssignments.map((assignment) => (
            <Grid item xs={12} md={6} lg={4} key={assignment.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>
                      {assignment.title}
                    </Typography>
                    <Chip
                      label={assignment.status}
                      color={getStatusColor(assignment.status)}
                      size="small"
                    />
                  </Box>

                  <Typography color="textSecondary" gutterBottom>
                    {assignment.description}
                  </Typography>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<DateIcon />}
                      label={`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`}
                      size="small"
                    />
                    <Chip
                      icon={<GroupIcon />}
                      label={`${assignment.submissions.length}/${assignment.totalStudents} Submitted`}
                      size="small"
                    />
                    <Chip
                      icon={<AssignmentIcon />}
                      label={`${assignment.totalPoints} Points`}
                      size="small"
                    />
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleOpenDialog(assignment)}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDelete(assignment.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5">Submissions</Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Assignment</TableCell>
                <TableCell>Submission Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>
                    {assignments.find(a => a.id === submission.assignmentId)?.title}
                  </TableCell>
                  <TableCell>
                    {new Date(submission.submissionDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={submission.status}
                      color={submission.status === 'submitted' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {submission.grade ?? 'Not graded'}
                  </TableCell>
                  <TableCell>
                    <Button size="small">
                      Grade
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Dialog for creating/editing assignments */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedAssignment ? 'Edit Assignment' : 'New Assignment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Due Date"
              type="date"
              fullWidth
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Total Points"
              type="number"
              fullWidth
              value={formData.totalPoints}
              onChange={(e) => setFormData({ ...formData, totalPoints: Number(e.target.value) })}
            />
            <FormControl fullWidth>
              <InputLabel>Submission Type</InputLabel>
              <Select
                value={formData.submissionType}
                label="Submission Type"
                onChange={(e) => setFormData({ ...formData, submissionType: e.target.value as 'file' | 'text' | 'quiz' })}
              >
                <MenuItem value="file">File Upload</MenuItem>
                <MenuItem value="text">Text Entry</MenuItem>
                <MenuItem value="quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedAssignment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress sx={{ mt: 3 }} />}
    </Box>
  );
};

export default AssignmentManager; 