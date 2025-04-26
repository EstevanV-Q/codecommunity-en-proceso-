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
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { MockUser, mockUsers, MentorPermissions } from '../../mocks/users';
import type { AdminRole } from '../../types/roles';

const mentorPermissions: Array<{
  id: keyof MentorPermissions;
  label: string;
  description: string;
  category: string;
}> = [
  {
    id: 'courses.create',
    label: 'Crear Cursos',
    description: 'Permite crear nuevos cursos',
    category: 'Cursos'
  },
  {
    id: 'courses.edit',
    label: 'Editar Cursos',
    description: 'Permite modificar cursos existentes',
    category: 'Cursos'
  },
  {
    id: 'courses.manage',
    label: 'Gestionar Cursos',
    description: 'Permite gestionar todos los aspectos de los cursos',
    category: 'Cursos'
  },
  {
    id: 'content.create',
    label: 'Crear Contenido',
    description: 'Permite crear contenido educativo',
    category: 'Contenido'
  },
  {
    id: 'content.edit',
    label: 'Editar Contenido',
    description: 'Permite modificar contenido',
    category: 'Contenido'
  },
  {
    id: 'content.moderate',
    label: 'Moderar Contenido',
    description: 'Permite moderar contenido de otros',
    category: 'Contenido'
  }
];

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
  const [showPermissions, setShowPermissions] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('mentor');
  const [rolePermissions, setRolePermissions] = useState<MentorPermissions>({});
  const [formData, setFormData] = useState<Partial<MockUser>>({
    displayName: '',
    email: '',
    role: 'mentor' as AdminRole,
    roles: ['mentor'],
    specialization: '',
    availability: '',
    rating: 0,
    students: [],
    permissions: {}
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
        students: tutor.students || [],
        permissions: tutor.permissions || {}
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
        students: [],
        permissions: {}
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
      students: [],
      permissions: {}
    });
  };

  const handlePermissionChange = (permissionId: keyof MentorPermissions) => {
    setRolePermissions(prev => ({
      ...prev,
      [permissionId]: !prev[permissionId]
    }));
  };

  const handleSaveTutor = () => {
    if (!formData.displayName || !formData.email) return;

    const newTutors = [...tutors];
    
    if (selectedTutor) {
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
          students: formData.students,
          permissions: rolePermissions
        };
      }
    } else {
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
        students: formData.students,
        permissions: rolePermissions
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

  const RolePermissionsPanel = () => {
    const categories = Array.from(new Set(mentorPermissions.map(p => p.category)));
    
    return (
      <Dialog
        open={showPermissions}
        onClose={() => setShowPermissions(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Permisos de {mentorRoles.find(r => r.value === selectedRole)?.label}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            {categories.map(category => (
              <Box key={category} sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>{category}</Typography>
                <Grid container spacing={2}>
                  {mentorPermissions
                    .filter(permission => permission.category === category)
                    .map(permission => (
                      <Grid item xs={12} sm={6} key={permission.id}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={rolePermissions[permission.id] || false}
                              onChange={() => handlePermissionChange(permission.id as keyof MentorPermissions)}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body1">{permission.label}</Typography>
                              <Typography variant="caption" color="textSecondary">
                                {permission.description}
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPermissions(false)}>Cancelar</Button>
          <Button onClick={handleSaveTutor} variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

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
                  <IconButton
                    onClick={() => {
                      setSelectedRole(tutor.role);
                      setRolePermissions(tutor.permissions || {});
                      setShowPermissions(true);
                    }}
                  >
                    <SecurityIcon />
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

      <RolePermissionsPanel />
    </Box>
  );
};

export default TutorManagementPanel; 