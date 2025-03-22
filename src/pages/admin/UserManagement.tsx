import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Box,
  Chip,
  Alert,
  Snackbar,
  TablePagination,
  Tooltip,
  Grid,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  lastLogin?: string;
  preferences: {
    interests: string[];
    learningGoals: string[];
    preferredLanguages: string[];
  };
  progress: {
    coursesCompleted: number;
    mentoringSessions: number;
    certificatesEarned: number;
    totalLearningHours: number;
  };
}

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
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Simulación de carga de datos
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          role: 'student',
          status: 'active',
          createdAt: '2024-01-15T10:00:00',
          lastLogin: '2024-03-20T15:30:00',
          preferences: {
            interests: ['Web Development', 'Mobile Apps', 'AI/ML'],
            learningGoals: ['Become Full Stack Developer', 'Learn React Native'],
            preferredLanguages: ['JavaScript', 'Python']
          },
          progress: {
            coursesCompleted: 5,
            mentoringSessions: 12,
            certificatesEarned: 2,
            totalLearningHours: 48
          }
        }
      ];
      setUsers(mockUsers);
    } catch (err) {
      setError('Error al cargar los usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      if (users.some(u => u.email === formData.email)) {
        setSnackbar({ open: true, message: 'El correo electrónico ya está registrado', severity: 'error' });
        return;
      }

      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name || '',
        email: formData.email || '',
        role: formData.role || 'student',
        status: formData.status || 'active',
        createdAt: new Date().toISOString(),
        preferences: {
          interests: [],
          learningGoals: [],
          preferredLanguages: []
        },
        progress: {
          coursesCompleted: 0,
          mentoringSessions: 0,
          certificatesEarned: 0,
          totalLearningHours: 0
        }
      };

      setUsers([...users, newUser]);
      setSnackbar({ open: true, message: 'Usuario creado correctamente', severity: 'success' });
      handleCloseDialog();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al crear el usuario', severity: 'error' });
      console.error(err);
    }
  };

  const handleUpdateUser = async () => {
    try {
      if (!selectedUser) return;

      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user
      );

      setUsers(updatedUsers);
      setSnackbar({ open: true, message: 'Usuario actualizado correctamente', severity: 'success' });
      handleCloseDialog();
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al actualizar el usuario', severity: 'error' });
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setUsers(users.filter(user => user.id !== userId));
      setSnackbar({ open: true, message: 'Usuario eliminado correctamente', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Error al eliminar el usuario', severity: 'error' });
      console.error(err);
    }
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData(user);
    } else {
      setSelectedUser(null);
      setFormData({});
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({});
  };

  const renderUserForm = () => (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>
        {selectedUser ? 'Editar Usuario' : 'Nuevo Usuario'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Rol</InputLabel>
              <Select
                value={formData.role || 'student'}
                label="Rol"
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'student' | 'admin' })}
              >
                <MenuItem value="student">Estudiante</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={formData.status || 'active'}
                label="Estado"
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'banned' })}
              >
                <MenuItem value="active">Activo</MenuItem>
                <MenuItem value="inactive">Inactivo</MenuItem>
                <MenuItem value="banned">Bloqueado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={selectedUser ? handleUpdateUser : handleCreateUser}
        >
          {selectedUser ? 'Guardar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderUserDetails = (user: User) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Información Personal
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={user.email}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Fecha de registro"
                  secondary={new Date(user.createdAt).toLocaleDateString()}
                />
              </ListItem>
              {user.lastLogin && (
                <ListItem>
                  <ListItemText
                    primary="Último acceso"
                    secondary={new Date(user.lastLogin).toLocaleString()}
                  />
                </ListItem>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Progreso de Aprendizaje
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Cursos completados"
                  secondary={user.progress.coursesCompleted}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Sesiones de mentoría"
                  secondary={user.progress.mentoringSessions}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Certificados obtenidos"
                  secondary={user.progress.certificatesEarned}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Horas totales de aprendizaje"
                  secondary={`${user.progress.totalLearningHours} horas`}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Preferencias
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Intereses
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.preferences.interests.map((interest) => (
                  <Chip key={interest} label={interest} />
                ))}
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Objetivos de aprendizaje
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.preferences.learningGoals.map((goal) => (
                  <Chip key={goal} label={goal} />
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Lenguajes preferidos
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {user.preferences.preferredLanguages.map((lang) => (
                  <Chip key={lang} label={lang} variant="outlined" />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Gestión de Usuarios
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nuevo Usuario
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Progreso</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                      <Box>
                        <Typography variant="subtitle2">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={user.role === 'admin' ? <PersonIcon /> : <SchoolIcon />}
                      label={user.role === 'admin' ? 'Administrador' : 'Estudiante'}
                      color={user.role === 'admin' ? 'error' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">
                        {user.progress.coursesCompleted} cursos completados
                      </Typography>
                      <Typography variant="body2">
                        {user.progress.mentoringSessions} sesiones de mentoría
                      </Typography>
                      <Typography variant="body2">
                        {user.progress.certificatesEarned} certificados
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={user.status === 'active' ? <CheckCircleIcon /> : <BlockIcon />}
                      label={
                        user.status === 'active' ? 'Activo' :
                        user.status === 'inactive' ? 'Inactivo' :
                        'Bloqueado'
                      }
                      color={
                        user.status === 'active' ? 'success' :
                        user.status === 'inactive' ? 'warning' :
                        'error'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver detalles">
                      <IconButton
                        size="small"
                        onClick={() => setSelectedUser(user)}
                      >
                        <HistoryIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Filas por página"
        />
      </TableContainer>

      {selectedUser && renderUserDetails(selectedUser)}
      {renderUserForm()}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagement; 