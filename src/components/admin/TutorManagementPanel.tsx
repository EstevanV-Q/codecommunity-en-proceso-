import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { MockUser, mockUsers } from '../../mocks/users';
import type { AdminRole } from '../../types/roles';

const TutorManagementPanel = () => {
  const [tutors, setTutors] = useState<MockUser[]>(
    mockUsers.filter(user => 
      (user.roles || []).some(role => 
        ['seniorMentor', 'mentor', 'juniorMentor'].includes(role)
      )
    )
  );
  const [selectedTutor, setSelectedTutor] = useState<MockUser | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<Partial<MockUser>>({
    displayName: '',
    email: '',
    role: 'mentor' as AdminRole,
    roles: ['mentor'],
    specialization: '',
    availability: '',
    rating: 0,
    students: []
  });

  const mentorRoles: { value: AdminRole; label: string }[] = [
    { value: 'seniorMentor', label: 'Mentor Senior' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'juniorMentor', label: 'Mentor Junior' },
  ];

  const handleOpenDialog = (tutor?: MockUser) => {
    if (tutor) {
      setSelectedTutor(tutor);
      setFormData({
        displayName: tutor.displayName,
        email: tutor.email,
        role: tutor.role as AdminRole,
        roles: tutor.roles || [tutor.role],
        specialization: tutor.specialization || '',
        availability: tutor.availability || '',
        rating: tutor.rating || 0,
        students: tutor.students || []
      });
    } else {
      setSelectedTutor(null);
      setFormData({
        displayName: '',
        email: '',
        role: 'mentor' as AdminRole,
        roles: ['mentor'],
        specialization: '',
        availability: '',
        rating: 0,
        students: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTutor(null);
    setFormData({
      displayName: '',
      email: '',
      role: 'mentor' as AdminRole,
      roles: ['mentor'],
      specialization: '',
      availability: '',
      rating: 0,
      students: []
    });
  };

  const handleSaveTutor = () => {
    if (!formData.displayName || !formData.email) return;

    const newTutors = [...tutors];
    
    if (selectedTutor) {
      // Actualizar tutor existente
      const tutorIndex = newTutors.findIndex(t => t.id === selectedTutor.id);
      if (tutorIndex !== -1) {
        newTutors[tutorIndex] = {
          ...newTutors[tutorIndex],
          displayName: formData.displayName!,
          email: formData.email!,
          role: formData.role!,
          roles: formData.roles,
          specialization: formData.specialization,
          availability: formData.availability,
          rating: formData.rating,
          students: formData.students
        };
      }
    } else {
      // Crear nuevo tutor
      const newTutor: MockUser = {
        id: (newTutors.length + 1).toString(),
        displayName: formData.displayName!,
        email: formData.email!,
        role: formData.role!,
        roles: formData.roles,
        password: 'defaultPassword123!',
        emailVerified: true,
        specialization: formData.specialization,
        availability: formData.availability,
        rating: formData.rating,
        students: formData.students
      };
      newTutors.push(newTutor);
    }
    
    setTutors(newTutors);
    handleCloseDialog();
  };

  const filteredTutors = tutors.filter(tutor => 
    tutor.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar tutores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Tutor
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tutor</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Nivel</TableCell>
              <TableCell>Especialización</TableCell>
              <TableCell>Valoración</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ mr: 1 }}>{tutor.displayName[0]}</Avatar>
                    {tutor.displayName}
                  </Box>
                </TableCell>
                <TableCell>{tutor.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={tutor.role} 
                    size="small"
                    color="primary"
                  />
                </TableCell>
                <TableCell>{tutor.specialization || 'No especificado'}</TableCell>
                <TableCell>{tutor.rating ? `${tutor.rating}/5` : 'Sin valoraciones'}</TableCell>
                <TableCell>
                  <IconButton 
                    size="small" 
                    onClick={() => handleOpenDialog(tutor)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedTutor ? `Editar Tutor: ${selectedTutor.displayName}` : 'Nuevo Tutor'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  value={formData.displayName}
                  onChange={(e) => setFormData({
                    ...formData,
                    displayName: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Nivel de Mentor</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={(e) => setFormData({
                      ...formData,
                      role: e.target.value as AdminRole
                    })}
                    label="Nivel de Mentor"
                  >
                    {mentorRoles.map((role) => (
                      <MenuItem key={role.value} value={role.value}>
                        {role.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Especialización"
                  value={formData.specialization}
                  onChange={(e) => setFormData({
                    ...formData,
                    specialization: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Disponibilidad"
                  value={formData.availability}
                  onChange={(e) => setFormData({
                    ...formData,
                    availability: e.target.value
                  })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valoración (0-5)"
                  value={formData.rating}
                  onChange={(e) => setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value)
                  })}
                  InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSaveTutor}
          >
            {selectedTutor ? 'Guardar Cambios' : 'Crear Tutor'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TutorManagementPanel; 