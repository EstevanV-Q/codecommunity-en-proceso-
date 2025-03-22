import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Button,
  IconButton,
  Alert,
  Tabs,
  Tab,
  Chip,
  Avatar,
  LinearProgress,
  Stack,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Checkbox,
} from '@mui/material';
import {
  People as PeopleIcon,
  School as SchoolIcon,
  Forum as ForumIcon,
  Code as CodeIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  MonetizationOn as MonetizationOnIcon,
  Notifications as NotificationsIcon,
  Flag as FlagIcon,
  MoreVert as MoreVertIcon,
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  Security as SecurityIcon,
  SupervisorAccount as SupervisorAccountIcon,
  Build as BuildIcon,
  Category as CategoryIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  MenuBook as MenuBookIcon,
  Edit as EditIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  History as HistoryIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import type { AdminRole } from '../../types/roles';
import { colors } from '../../theme/tokens';
import { roleColors } from '../../constants/roleColors';
import ResourceManager from './ResourceManager';
import { MockUser, mockUsers } from '../../mocks/users';
import StatsPanel from '../common/StatsPanel';
import { useAuth } from '../../context/AuthContext';

// Panel de control dependiente del rol
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
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Función auxiliar para calcular índice de pestañas
const getTabIndex = (...conditions: any[]): number => {
  const { role, permissions } = useAdmin();
  console.log('Rol actual en Dashboard:', role);
  console.log('Permisos actuales:', permissions);
  
  // Verificar permisos para cada pestaña
  const hasAdminAccess = ['founder', 'owner', 'admin', 'moderator', 'professor', 'seniorMentor'].includes(role);
  const hasTechnicalAccess = ['cto', 'seniorDev', 'juniorDev', 'devOps'].includes(role);
  const hasFinancialAccess = ['accounting', 'founder', 'owner'].includes(role);
  const hasOrganizationAccess = ['founder', 'owner', 'admin', 'professor'].includes(role);
  const hasContentAccess = ['founder', 'owner', 'admin', 'moderator', 'professor', 'seniorMentor'].includes(role);
  const hasUserManagementAccess = ['founder', 'owner', 'admin', 'moderator', 'professor', 'seniorMentor'].includes(role);
  const hasTutorManagementAccess = ['founder', 'owner', 'admin', 'professor', 'seniorMentor', 'mentor'].includes(role);

  let index = 1; // Empezamos en 1 porque el panel 0 es "General"
  for (let i = 0; i < conditions.length - 1; i++) {
    if (conditions[i]) index++;
  }
  
  // Log de diagnóstico para ver qué índice se está calculando
  console.log('getTabIndex - Condiciones:', conditions);
  console.log('getTabIndex - Índice calculado:', index);
  
  return index;
};

// Componentes de paneles - deben definirse antes de su uso en el JSX
const TechnicalPanel = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Panel Técnico
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader title="Estado del Servidor" />
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  El servidor está funcionando normalmente.
                </Typography>
                <Stack spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">CPU</Typography>
                    <Typography variant="body2">24%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={24} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Memoria</Typography>
                    <Typography variant="body2">42%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={42} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Almacenamiento</Typography>
                    <Typography variant="body2">68%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={68} />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader title="Seguridad" />
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  Últimos intentos de acceso:
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Acceso exitoso" 
                      secondary="usuario@example.com - 10:25 AM" 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SecurityIcon color="error" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Intento fallido" 
                      secondary="IP: 192.168.1.1 - 09:15 AM" 
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
);

const FinancialPanel = ({ stats }: { stats: DashboardStats }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Panel Financiero
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardHeader title="Ingresos Mensuales" />
              <CardContent>
                <Typography variant="h4" component="div" color="primary">
                  ${(stats.revenue/1000).toFixed(1)}k
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +12% respecto al mes anterior
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardHeader title="Tasa de Conversión" />
              <CardContent>
                <Typography variant="h4" component="div" color="secondary">
                  {stats.conversionRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +2.1% respecto al mes anterior
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardHeader title="Usuarios Premium" />
              <CardContent>
                <Typography variant="h4" component="div" color="text.primary">
                  {stats.premiumUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  +8 nuevos usuarios premium hoy
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AssessmentIcon />}
          component={RouterLink}
          to="/admin/finances/reports"
        >
          Ver Reportes Completos
        </Button>
      </Paper>
    </Grid>
  </Grid>
);

const OrganizationPanel = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Estructura Organizativa
        </Typography>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader title="Equipo de Administración" />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ana Martínez" secondary="Fundadora" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Carlos López" secondary="Administrador" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="María García" secondary="Moderadora" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardHeader title="Equipo Técnico" />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <BuildIcon />
                    </ListItemIcon>
                    <ListItemText primary="Juan Pérez" secondary="CTO" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Roberto Sánchez" secondary="Senior Developer" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CodeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Luisa Torres" secondary="Senior Developer" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<BusinessIcon />}
            component={RouterLink}
            to="/admin/organization/structure"
          >
            Ver Estructura Completa
          </Button>
        </Box>
      </Paper>
    </Grid>
  </Grid>
);

// Componente para el panel de gestión de contenido
const ContentManagementPanel = () => {
  const { role } = useAdmin();
  const canCreateCourses = ['founder', 'moderator', 'admin'].includes(role || '');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Administración de Contenido
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardHeader title="Cursos" />
                <CardContent>
                  <Typography variant="body2">
                    Gestiona el contenido educativo de la plataforma.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    component={RouterLink}
                    to="/admin/content/courses"
                  >
                    Ver Cursos
                  </Button>
                  {canCreateCourses && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mt: 2, ml: 1 }}
                      component={RouterLink}
                      to="/admin/content/courses/new"
                    >
                      Crear Curso
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardHeader title="Foro" />
                <CardContent>
                  <Typography variant="body2">
                    Modera y organiza las discusiones del foro.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    component={RouterLink}
                    to="/admin/content/forum"
                  >
                    Moderar Foro
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

// Componente para el panel de gestión de usuarios
const UserManagementPanel = () => {
  const { role } = useAdmin();
  const [selectedUser, setSelectedUser] = useState<MockUser | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [users, setUsers] = useState<MockUser[]>(mockUsers);
  const [formData, setFormData] = useState<Partial<MockUser>>({
    displayName: '',
    email: '',
    role: 'user',
    roles: ['user'],
    password: '',
    emailVerified: false
  });
  const [showHistory, setShowHistory] = useState<Record<string, boolean>>({});
  const [formModified, setFormModified] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Lista completa de roles disponibles
  const availableRoles: { category: string; roles: { value: AdminRole; label: string }[] }[] = [
    {
      category: 'Núcleo Ejecutivo',
      roles: [
        { value: 'founder', label: 'Fundador' },
        { value: 'owner', label: 'Propietario' }
      ]
    },
    {
      category: 'Equipo Técnico',
      roles: [
        { value: 'cto', label: 'Director Técnico (CTO)' },
        { value: 'seniorDev', label: 'Desarrollador Senior' },
        { value: 'juniorDev', label: 'Desarrollador Junior' },
        { value: 'devOps', label: 'DevOps' }
      ]
    },
    {
      category: 'Equipo de Moderación',
      roles: [
        { value: 'admin', label: 'Administrador' },
        { value: 'moderator', label: 'Moderador' },
        { value: 'helper', label: 'Ayudante' }
      ]
    },
    {
      category: 'Departamentos Especializados',
      roles: [
        { value: 'marketing', label: 'Marketing' },
        { value: 'accounting', label: 'Contabilidad' },
        { value: 'designer', label: 'Diseñador' }
      ]
    },
    {
      category: 'Roles Educativos',
      roles: [
        { value: 'professor', label: 'Profesor' },
        { value: 'instructor', label: 'Instructor' },
        { value: 'teachingAssistant', label: 'Asistente de Enseñanza' },
        { value: 'student', label: 'Estudiante' }
      ]
    },
    {
      category: 'Roles de Mentoría',
      roles: [
        { value: 'seniorMentor', label: 'Mentor Senior' },
        { value: 'mentor', label: 'Mentor' },
        { value: 'juniorMentor', label: 'Mentor Junior' },
        { value: 'mentee', label: 'Aprendiz' }
      ]
    },
    {
      category: 'Roles de Comunidad',
      roles: [
        { value: 'viewer', label: 'Visualizador' },
        { value: 'subscriber', label: 'Suscriptor' }
      ]
    }
  ];

  // Cualquier rol puede tener roles adicionales para mayor flexibilidad
  const canHaveAdditionalRoles = (_role: AdminRole) => {
    return true; // Todos los roles pueden tener roles adicionales
  };

  // Filtrar usuarios basado en el término de búsqueda
  const filteredUsers = users.filter(user => 
    user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Log para diagnóstico
  console.log('Usuarios filtrados:', filteredUsers);
  console.log('Rol actual:', role);

  // Nuevo estado para mostrar un mensaje cuando no hay resultados
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  // Efecto para actualizar el estado del mensaje vacío
  React.useEffect(() => {
    setShowEmptyMessage(filteredUsers.length === 0);
  }, [filteredUsers.length]);

  // Agregar este nuevo método para limpiar el estado del panel
  const resetDetailsAndHistory = () => {
    setExpandedUser(null);
    setShowHistory({});
  };

  // Modificar handleOpenDialog para resetear detalles y el historial cuando se abre un diálogo
  const handleOpenDialog = (user?: MockUser) => {
    resetDetailsAndHistory(); // Resetear detalles e historial
    
    if (user) {
      setSelectedUser(user);
      setFormData({
        displayName: user.displayName,
        email: user.email,
        role: user.role,
        roles: user.roles || [user.role],
        emailVerified: user.emailVerified
      });
    } else {
      setSelectedUser(null);
      setFormData({
        displayName: '',
        email: '',
        role: 'user',
        roles: ['user'],
        password: '',
        emailVerified: false
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // Si el formulario ha sido modificado, mostrar diálogo de confirmación
    if (formModified) {
      setConfirmDialogOpen(true);
      return;
    }
    
    // Si no hay cambios, cerrar directamente
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({
      displayName: '',
      email: '',
      role: 'user',
      roles: ['user'],
      password: '',
      emailVerified: false
    });
  };

  const handleMainRoleChange = (event: any) => {
    const newRole = event.target.value;
    const currentRoles = formData.roles || [];
    
    // Crear un nuevo array de roles que excluye el rol principal anterior
    // pero mantiene los roles adicionales y agrega el nuevo rol principal
    const updatedRoles = [newRole];
    
    // Mantener los roles adicionales anteriores
    currentRoles.forEach(role => {
      if (role !== formData.role && !updatedRoles.includes(role)) {
        updatedRoles.push(role);
      }
    });
    
    setFormData({
      ...formData,
      role: newRole,
      roles: updatedRoles
    });
  };

  const handleAdditionalRolesChange = (event: any) => {
    const {
      target: { value },
    } = event;
    
    // Asegurarse de que value sea siempre un array
    const selectedRoles = Array.isArray(value) ? value : [value];
    
    // Asegurarse de que el rol principal esté siempre incluido
    const updatedRoles = [formData.role!];
    
    // Añadir solo los roles adicionales que no son el rol principal
    selectedRoles.forEach(role => {
      if (role !== formData.role && !updatedRoles.includes(role)) {
        updatedRoles.push(role);
      }
    });
    
    setFormData({
      ...formData,
      roles: updatedRoles
    });
  };

  // Estado para manejar alertas
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  const handleSaveUser = () => {
    if (!formData.displayName || !formData.email || !formData.roles || formData.roles.length === 0) {
      return;
    }

    // Asegurarse de que los roles estén bien formados
    // El primer elemento es el rol principal, y los demás son roles adicionales
    const uniqueRoles = Array.from(new Set(formData.roles));
    
    const newUsers = [...users];
    
    if (selectedUser) {
      // Actualizar usuario existente
      const userIndex = newUsers.findIndex(user => user.id === selectedUser.id);
      if (userIndex !== -1) {
        newUsers[userIndex] = {
          ...newUsers[userIndex],
          displayName: formData.displayName!,
          email: formData.email!,
          role: uniqueRoles[0]!, // El primer rol es el principal
          roles: uniqueRoles,
          emailVerified: formData.emailVerified || false
        };
      }
    } else {
      // Crear nuevo usuario
      const newUser: MockUser = {
        id: (newUsers.length + 1).toString(),
        displayName: formData.displayName!,
        email: formData.email!,
        role: uniqueRoles[0]!, // El primer rol es el principal
        roles: uniqueRoles,
        password: formData.password || 'defaultPassword123!',
        emailVerified: formData.emailVerified || false
      };
      newUsers.push(newUser);
    }
    
    setUsers(newUsers);
    
    // Mostrar mensaje de éxito con información más completa
    const actionType = selectedUser ? 'actualizado' : 'creado';
    const rolesText = formData.roles && formData.roles.length > 1 
      ? `con ${formData.roles.length} roles asignados` 
      : `con rol de ${getRoleLabel(formData.role!)}`;
      
    setSuccessAlert(
      `Usuario ${formData.displayName} ${actionType} correctamente ${rolesText}`
    );
    
    // Limpiar el mensaje después de 3 segundos
    setTimeout(() => {
      setSuccessAlert(null);
    }, 5000); // Aumentado a 5 segundos para dar más tiempo de lectura
    
    handleCloseDialog();
  };

  // Mejorar el comportamiento del toggleUserDetails para ser más robusto
  const toggleUserDetails = (userId: string, event: React.MouseEvent) => {
    // Siempre detener la propagación y el comportamiento por defecto
    event.stopPropagation();
    event.preventDefault();
    
    // Abrir/cerrar de forma más explícita
    setExpandedUser(prevState => {
      if (prevState === userId) {
        // Si estamos cerrando, también cerrar el historial
        if (showHistory[userId]) {
          setShowHistory(prev => ({
            ...prev,
            [userId]: false
          }));
        }
        return null; // Cerrar
      } else {
        return userId; // Abrir
      }
    });
  };

  const toggleHistory = (userId: string, event: React.MouseEvent) => {
    // Detener propagación y comportamiento predeterminado
    event.stopPropagation();
    event.preventDefault();
    
    // Si vamos a mostrar el historial, asegurarse que los detalles estén abiertos
    if (!showHistory[userId] && expandedUser !== userId) {
      setExpandedUser(userId);
    }
    
    // Actualizar el estado del historial
    setShowHistory(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Función para obtener el nombre del rol
  const getRoleLabel = (roleValue: AdminRole) => {
    for (const category of availableRoles) {
      const role = category.roles.find(r => r.value === roleValue);
      if (role) return role.label;
    }
    return roleValue;
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              Gestión de Usuarios
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => handleOpenDialog()}
            >
              Nuevo Usuario
            </Button>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          {successAlert && (
            <Alert 
              severity="success" 
              sx={{ mb: 2 }}
              onClose={() => setSuccessAlert(null)}
            >
              {successAlert}
            </Alert>
          )}

          {filteredUsers.length === 0 && (
            <Alert 
              severity="info" 
              sx={{ mb: 2 }}
            >
              No se encontraron usuarios con esos criterios de búsqueda
            </Alert>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <React.Fragment key={user.id}>
                      <TableRow 
                        hover 
                        sx={{
                          bgcolor: expandedUser === user.id ? 'action.selected' : 'inherit',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: expandedUser === user.id ? 'action.selected' : 'action.hover',
                          },
                          transition: 'background-color 0.2s ease'
                        }}
                        onClick={(e) => {
                          e.preventDefault(); // Prevenir comportamiento por defecto
                          toggleUserDetails(user.id, e);
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 1 }}>{user.displayName[0]}</Avatar>
                            {user.displayName}
                          </Box>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(user.roles || [user.role]).map((role, index) => (
                              <Chip 
                                key={role}
                                label={getRoleLabel(role)} 
                                size="small"
                                sx={{ 
                                  bgcolor: roleColors[role], 
                                  color: 'white',
                                  fontWeight: index === 0 ? 'bold' : 'normal' // El primer rol (principal) en negrita
                                }}
                              />
                            ))}
                            {(user.roles || [user.role]).length > 2 && (
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  display: 'flex', 
                                  alignItems: 'center',
                                  color: 'text.secondary',
                                  ml: 0.5
                                }}
                              >
                                (+{(user.roles || [user.role]).length - 2} más)
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDialog(user);
                            }}
                            sx={{ mr: 1 }}
                            aria-label="Editar usuario"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.preventDefault(); // Prevenir comportamiento por defecto
                              e.stopPropagation();
                              toggleUserDetails(user.id, e);
                            }}
                            sx={{ mr: 1 }}
                            aria-label={expandedUser === user.id ? "Ocultar detalles" : "Mostrar detalles"}
                          >
                            {expandedUser === user.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => toggleHistory(user.id, e)}
                            color={showHistory[user.id] ? "primary" : "default"}
                            aria-label={showHistory[user.id] ? "Ocultar historial" : "Mostrar historial"}
                          >
                            <HistoryIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {expandedUser === user.id && (
                        <TableRow onClick={(e) => e.stopPropagation()}>
                          <TableCell colSpan={4} onClick={(e) => e.stopPropagation()}>
                            <Paper 
                              elevation={0} 
                              variant="outlined" 
                              sx={{ 
                                p: 2, 
                                bgcolor: 'background.default', 
                                borderColor: 'divider',
                                transition: 'all 0.3s ease',
                                boxShadow: 1,
                                '&:hover': {
                                  boxShadow: 2,
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="subtitle2" color="primary">
                                  Detalles del Usuario
                                </Typography>
                                <Button 
                                  variant="contained"
                                  color="primary"
                                  size="small" 
                                  endIcon={<KeyboardArrowUpIcon />}
                                  onClick={(e) => {
                                    e.preventDefault(); // Prevenir comportamiento por defecto
                                    e.stopPropagation();
                                    toggleUserDetails(user.id, e);
                                  }}
                                  aria-label="Cerrar detalles"
                                >
                                  Cerrar
                                </Button>
                              </Box>
                              <Divider sx={{ mb: 2 }} />
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2">
                                    <strong>ID:</strong> {user.id}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Email Verificado:</strong> {user.emailVerified ? 'Sí' : 'No'}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2">
                                    <strong>Rol Principal:</strong> {getRoleLabel(user.role)}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Último Acceso:</strong> {new Date().toLocaleDateString()}
                                  </Typography>
                                </Grid>
                                {user.roles && user.roles.length > 1 && (
                                  <Grid item xs={12}>
                                    <Typography variant="body2">
                                      <strong>Todos los Roles:</strong>
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                                      {user.roles.map((role) => (
                                        <Chip 
                                          key={role}
                                          label={getRoleLabel(role)} 
                                          size="small"
                                          sx={{ bgcolor: roleColors[role], color: 'white' }}
                                        />
                                      ))}
                                    </Box>
                                  </Grid>
                                )}
                                {showHistory[user.id] && (
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="primary" sx={{ mt: 2, mb: 1 }}>
                                      Historial de Actividad
                                    </Typography>
                                    <List dense>
                                      <ListItem>
                                        <ListItemText
                                          primary="Último inicio de sesión"
                                          secondary="Hace 2 horas"
                                        />
                                      </ListItem>
                                      <ListItem>
                                        <ListItemText
                                          primary="Última actualización de perfil"
                                          secondary="Hace 3 días"
                                        />
                                      </ListItem>
                                      <ListItem>
                                        <ListItemText
                                          primary="Último cambio de rol"
                                          secondary="Hace 1 semana"
                                        />
                                      </ListItem>
                                    </List>
                                  </Grid>
                                )}
                              </Grid>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {showEmptyMessage ? 'No hay usuarios coincidentes' : 'Cargando...'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? `Editar Usuario: ${selectedUser.displayName}` : 'Nuevo Usuario'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              value={formData.displayName}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  displayName: e.target.value
                });
                // Marcar el formulario como modificado
                setFormModified(true);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value
                });
                setFormModified(true);
              }}
              error={formData.email !== '' && !formData.email?.includes('@')}
              helperText={formData.email !== '' && !formData.email?.includes('@') ? 'Ingrese un email válido' : ''}
              sx={{ mb: 2 }}
            />
            {!selectedUser && (
              <TextField
                fullWidth
                label="Contraseña"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                sx={{ mb: 2 }}
              />
            )}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Rol Principal</InputLabel>
              <Select
                value={formData.role}
                onChange={handleMainRoleChange}
                label="Rol Principal"
                renderValue={(selected) => (
                  <Chip
                    label={getRoleLabel(selected)}
                    size="small"
                    sx={{ 
                      bgcolor: roleColors[selected],
                      color: 'white'
                    }}
                  />
                )}
              >
                {availableRoles.map((category) => [
                  <ListSubheader key={category.category} sx={{ bgcolor: 'background.paper' }}>
                    {category.category}
                  </ListSubheader>,
                  ...category.roles.map((role) => (
                    <MenuItem 
                      key={role.value} 
                      value={role.value}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}
                    >
                      <Chip
                        label={role.label}
                        size="small"
                        sx={{ 
                          bgcolor: roleColors[role.value],
                          color: 'white',
                          mr: 1
                        }}
                      />
                      <Typography variant="body2">{role.label}</Typography>
                    </MenuItem>
                  ))
                ])}
              </Select>
            </FormControl>

            {canHaveAdditionalRoles(formData.role!) && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Roles Adicionales</InputLabel>
                <Select
                  multiple
                  value={formData.roles?.filter(role => role !== formData.role) || []}
                  onChange={handleAdditionalRolesChange}
                  label="Roles Adicionales"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={getRoleLabel(value)}
                          size="small"
                          onDelete={() => {
                            const newRoles = (formData.roles || []).filter(role => role !== value);
                            setFormData({
                              ...formData,
                              roles: newRoles
                            });
                          }}
                          sx={{ 
                            bgcolor: roleColors[value],
                            color: 'white'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 400
                      }
                    }
                  }}
                >
                  {availableRoles.map((category) => [
                    <ListSubheader key={category.category} sx={{ bgcolor: 'background.paper' }}>
                      {category.category}
                    </ListSubheader>,
                    ...category.roles
                      .filter(role => role.value !== formData.role)
                      .map((role) => (
                        <MenuItem 
                          key={role.value} 
                          value={role.value}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <Checkbox 
                            checked={(formData.roles || []).indexOf(role.value) > -1}
                            sx={{
                              color: roleColors[role.value],
                              '&.Mui-checked': {
                                color: roleColors[role.value],
                              },
                            }}
                          />
                          <Chip
                            label={role.label}
                            size="small"
                            sx={{ 
                              bgcolor: roleColors[role.value],
                              color: 'white',
                              mr: 1
                            }}
                          />
                          <Typography variant="body2">{role.label}</Typography>
                        </MenuItem>
                      ))
                  ])}
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSaveUser}
            disabled={!formData.displayName || !formData.email || !formData.roles || formData.roles.length === 0}
          >
            {selectedUser ? 'Guardar Cambios' : 'Crear Usuario'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de confirmación para cambios sin guardar */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ¿Descartar cambios?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Hay cambios sin guardar. ¿Estás seguro que deseas cerrar sin guardar?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setConfirmDialogOpen(false)} 
            color="primary"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => {
              setConfirmDialogOpen(false);
              setOpenDialog(false);
              setSelectedUser(null);
              setFormData({
                displayName: '',
                email: '',
                role: 'user',
                roles: ['user'],
                password: '',
                emailVerified: false
              });
              setFormModified(false);
            }} 
            color="error" 
            variant="contained"
            autoFocus
          >
            Descartar cambios
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

// Componente para gestión de tutores
const TutorManagementPanel = () => {
  const [tutors, setTutors] = useState<MockUser[]>(
    // Filtrar usuarios que tienen roles de mentoría
    mockUsers.filter(user => 
      (user.roles || []).some(role => 
        ['seniorMentor', 'mentor', 'juniorMentor'].includes(role)
      )
    )
  );
  const [selectedTutor, setSelectedTutor] = useState<MockUser | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTutor, setExpandedTutor] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<MockUser>>({
    displayName: '',
    email: '',
    role: 'mentor',
    roles: ['mentor'],
    specialization: '',
    availability: '',
    rating: 0,
    students: []
  });
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Filtrar tutores basado en el término de búsqueda
  const filteredTutors = tutors.filter(tutor => 
    tutor.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mentorRoles = [
    { value: 'seniorMentor', label: 'Mentor Senior' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'juniorMentor', label: 'Mentor Junior' },
  ];

  const specializationAreas = [
    'Desarrollo Web Frontend',
    'Desarrollo Backend',
    'Bases de Datos',
    'Diseño UI/UX',
    'Desarrollo Móvil',
    'Inteligencia Artificial',
    'DevOps',
    'Seguridad Informática',
    'Blockchain',
    'Arquitectura de Software'
  ];

  const handleOpenDialog = (tutor?: MockUser) => {
    if (tutor) {
      setSelectedTutor(tutor);
      setFormData({
        displayName: tutor.displayName,
        email: tutor.email,
        role: tutor.role,
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
        role: 'mentor',
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
      role: 'mentor',
      roles: ['mentor'],
      specialization: '',
      availability: '',
      rating: 0,
      students: []
    });
  };

  const handleSaveTutor = () => {
    if (!formData.displayName || !formData.email) return;

    // Asegurarse de que los roles de mentoría estén incluidos
    const mentorRoleValues = mentorRoles.map(r => r.value);
    const hasMentorRole = (formData.roles || []).some(role => 
      mentorRoleValues.includes(role as any)
    );

    if (!hasMentorRole) {
      // Si no tiene un rol de mentor, añadimos 'mentor' por defecto
      formData.roles = [...(formData.roles || []), 'mentor'];
      formData.role = 'mentor';
    }

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
    setSuccessAlert(
      `Tutor ${formData.displayName} ${selectedTutor ? 'actualizado' : 'creado'} correctamente`
    );
    
    setTimeout(() => {
      setSuccessAlert(null);
    }, 3000);
    
    handleCloseDialog();
  };

  const toggleTutorDetails = (tutorId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setExpandedTutor(prevState => (prevState === tutorId ? null : tutorId));
  };

  const getMentorRoleLabel = (roleValue: string) => {
    const role = mentorRoles.find(r => r.value === roleValue);
    return role ? role.label : roleValue;
  };

  const handleNivelMentorChange = (e: any) => {
    const newRole = e.target.value;
    // Actualizar el rol principal y asegurarse de que esté en el array de roles
    const updatedRoles = [...(formData.roles || [])];
    const mentorRoleValues = mentorRoles.map(r => r.value);
    
    // Eliminar todos los roles de mentor actuales
    const filteredRoles = updatedRoles.filter(
      role => !mentorRoleValues.includes(role as any)
    );
    
    // Añadir el nuevo rol de mentor (con tipado adecuado para evitar el error)
    filteredRoles.push(newRole as any);
    
    setFormData({
      ...formData,
      role: newRole,
      roles: filteredRoles
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              Gestión de Tutores
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonIcon />}
              onClick={() => handleOpenDialog()}
              data-testid="new-tutor-button"
              sx={{ 
                py: 1.2,
                fontWeight: 'bold',
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4
                }
              }}
            >
              Nuevo Tutor
            </Button>
          </Box>

          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar tutores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
          />

          {successAlert && (
            <Alert 
              severity="success" 
              sx={{ mb: 2 }}
              onClose={() => setSuccessAlert(null)}
            >
              {successAlert}
            </Alert>
          )}

          {filteredTutors.length === 0 && (
            <Alert 
              severity="info" 
              sx={{ mb: 2 }}
            >
              No se encontraron tutores con esos criterios de búsqueda
            </Alert>
          )}

          <TableContainer>
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
                {filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor) => (
                    <React.Fragment key={tutor.id}>
                      <TableRow 
                        hover 
                        sx={{
                          bgcolor: expandedTutor === tutor.id ? 'action.selected' : 'inherit',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: expandedTutor === tutor.id ? 'action.selected' : 'action.hover',
                          }
                        }}
                        onClick={(e) => toggleTutorDetails(tutor.id, e)}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ mr: 1 }}>{tutor.displayName[0]}</Avatar>
                            {tutor.displayName}
                          </Box>
                        </TableCell>
                        <TableCell>{tutor.email}</TableCell>
                        <TableCell>
                          <Chip 
                            label={getMentorRoleLabel(tutor.role)} 
                            size="small"
                            sx={{ 
                              bgcolor: roleColors[tutor.role], 
                              color: 'white' 
                            }}
                          />
                        </TableCell>
                        <TableCell>{tutor.specialization || 'No especificado'}</TableCell>
                        <TableCell>
                          {tutor.rating ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="body2" sx={{ mr: 1 }}>
                                {tutor.rating.toFixed(1)}
                              </Typography>
                              <StarIcon sx={{ color: 'gold', fontSize: 16 }} />
                            </Box>
                          ) : (
                            'Sin valoraciones'
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            size="small" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDialog(tutor);
                            }}
                            sx={{ mr: 1 }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => toggleTutorDetails(tutor.id, e)}
                          >
                            {expandedTutor === tutor.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      {expandedTutor === tutor.id && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Paper 
                              elevation={0} 
                              variant="outlined" 
                              sx={{ p: 2, bgcolor: 'background.default' }}
                            >
                              <Typography variant="subtitle2" color="primary" gutterBottom>
                                Detalles del Tutor
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2">
                                    <strong>Nivel:</strong> {getMentorRoleLabel(tutor.role)}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Especialización:</strong> {tutor.specialization || 'No especificado'}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Disponibilidad:</strong> {tutor.availability || 'No especificado'}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography variant="body2">
                                    <strong>Valoración:</strong> {tutor.rating ? `${tutor.rating.toFixed(1)}/5` : 'Sin valoraciones'}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Estudiantes asignados:</strong> {tutor.students ? tutor.students.length : 0}
                                  </Typography>
                                </Grid>
                                {tutor.students && tutor.students.length > 0 && (
                                  <Grid item xs={12}>
                                    <Typography variant="subtitle2" gutterBottom>
                                      Estudiantes
                                    </Typography>
                                    <List dense>
                                      {tutor.students.map((student: any, index: number) => (
                                        <ListItem key={index}>
                                          <ListItemText 
                                            primary={student.name} 
                                            secondary={student.email} 
                                          />
                                        </ListItem>
                                      ))}
                                    </List>
                                  </Grid>
                                )}
                              </Grid>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay tutores disponibles
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

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
                  sx={{ mb: 2 }}
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
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Nivel de Mentor</InputLabel>
                  <Select
                    value={formData.role}
                    onChange={handleNivelMentorChange}
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
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Especialización</InputLabel>
                  <Select
                    value={formData.specialization || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      specialization: e.target.value
                    })}
                    label="Especialización"
                  >
                    {specializationAreas.map((area) => (
                      <MenuItem key={area} value={area}>
                        {area}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Disponibilidad"
                  placeholder="Ej: Lunes a Viernes, 15:00 - 19:00"
                  value={formData.availability || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    availability: e.target.value
                  })}
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Valoración (0-5)"
                  InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                  value={formData.rating || 0}
                  onChange={(e) => setFormData({
                    ...formData,
                    rating: parseFloat(e.target.value)
                  })}
                  sx={{ mb: 2 }}
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
    </Grid>
  );
};

interface DashboardStats {
  users: number;
  newUsersToday: number;
  courses: number;
  forumPosts: number;
  pendingReports: number;
  revenue: number;
  conversionRate: number;
  premiumUsers: number;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const { role, permissions } = useAdmin();
  
  // Logs para diagnóstico
  console.log('Usuario actual:', user);
  console.log('Rol actual:', role);
  console.log('Permisos:', permissions);
  
  // Verificar permisos para diferentes tipos de datos
  const showFinancialData = true; // Siempre visible
  const showTechnicalData = true; // Siempre visible
  const showUserManagement = true; // Siempre visible
  const showContentManagement = true; // Siempre visible
  const showTutorManagement = true; // Siempre visible
  
  console.log('Permisos de visualización:', {
    showFinancialData,
    showTechnicalData,
    showUserManagement,
    showContentManagement,
    showTutorManagement
  });

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const stats: DashboardStats = {
    users: 1234,
    newUsersToday: 25,
    courses: 45,
    forumPosts: 789,
    pendingReports: 3,
    revenue: 12345,
    conversionRate: 8.5,
    premiumUsers: 312
  };

  const statsCards = [
    {
      title: 'Total de Usuarios',
      value: stats.users.toLocaleString(),
      change: 12.5,
      icon: <PeopleIcon />,
      color: '#1976d2',
      tooltip: 'Número total de usuarios registrados en la plataforma',
    },
    {
      title: 'Cursos Activos',
      value: stats.courses.toString(),
      change: 8.2,
      icon: <SchoolIcon />,
      color: '#2e7d32',
      tooltip: 'Cursos actualmente disponibles y en desarrollo',
    },
    {
      title: 'Ingresos Mensuales',
      value: `$${stats.revenue.toLocaleString()}`,
      change: -3.1,
      icon: <MonetizationOnIcon />,
      color: '#ed6c02',
      tooltip: 'Ingresos totales del mes actual',
    },
    {
      title: 'Tasa de Completado',
      value: `${stats.conversionRate}%`,
      change: 5.4,
      icon: <AssessmentIcon />,
      color: '#9c27b0',
      tooltip: 'Porcentaje de estudiantes que completan sus cursos',
    },
  ];

  // Datos para gráficos y métricas
  const recentUsers = [
    { id: 'u1', name: 'Carlos Mendez', email: 'carlos@example.com', role: 'user', joinDate: '2023-03-01' },
    { id: 'u2', name: 'Ana García', email: 'ana@example.com', role: 'user', joinDate: '2023-03-02' },
    { id: 'u3', name: 'Juan López', email: 'juan@example.com', role: 'moderator', joinDate: '2023-03-03' },
  ];

  const pendingReports = [
    { id: 'r1', title: 'Contenido inapropiado', severity: 'alta', reportedBy: 'usuario123', date: '2023-03-01' },
    { id: 'r2', title: 'Spam en foro', severity: 'media', reportedBy: 'usuario456', date: '2023-03-02' },
  ];

  const platformMetrics = [
    { metric: 'Usuarios Nuevos', value: '+25', change: '+15%', trend: 'up' },
    { metric: 'Tasa de Conversión', value: '8.5%', change: '+2.1%', trend: 'up' },
    { metric: 'Ingresos Mensuales', value: '$25.6k', change: '+12%', trend: 'up' },
    { metric: 'Tiempo Promedio', value: '45m', change: '-5%', trend: 'down' },
  ];

  const getRoleLabel = () => {
    switch(role) {
      case 'founder':
      case 'owner':
        return 'Ejecutivo';
      case 'cto':
      case 'seniorDev':
      case 'juniorDev':
        return 'Técnico';
      case 'admin':
      case 'moderator':
      case 'helper':
        return 'Administración';
      case 'marketing':
      case 'accounting':
      case 'designer':
        return 'Departamento';
      default:
        return 'Usuario';
    }
  };

  // Agregamos logs para diagnóstico
  console.log('Rol actual del usuario:', role);
  console.log('Permisos de visualización:', {
    showFinancialData,
    showTechnicalData,
    showUserManagement,
    showContentManagement,
    showTutorManagement
  });

  const roleColors: Record<AdminRole, string> = {
    // Núcleo Ejecutivo
    founder: colors.primary[700],
    owner: colors.primary[600],
    
    // Equipo Técnico
    cto: colors.primary[500],
    seniorDev: colors.primary[400],
    juniorDev: colors.primary[300],
    devOps: colors.primary[400],
    
    // Equipo de Moderación
    admin: colors.secondary[700],
    moderator: colors.secondary[600],
    helper: colors.secondary[500],
    
    // Departamentos Especializados
    marketing: colors.accent[600],
    accounting: colors.accent[500],
    designer: colors.accent[400],
    
    // Roles Educativos
    professor: colors.success[700],
    instructor: colors.success[600],
    teachingAssistant: colors.success[500],
    student: colors.success[400],
    mentee: colors.success[300],
    seniorMentor: colors.success[600],
    mentor: colors.success[500],
    juniorMentor: colors.success[400],
    
    // Roles de Comunidad
    viewer: colors.neutral[400],
    subscriber: colors.neutral[500],
    
    // Usuario regular
    user: colors.neutral[300]
  } as const;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Encabezado del Dashboard */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DashboardIcon sx={{ mr: 1, color: roleColors[role || 'user'] }} />
                <Typography component="h1" variant="h5">
                  Panel de Administración
                </Typography>
                <Chip 
                  label={getRoleLabel()} 
                  size="small" 
                  sx={{ ml: 2, bgcolor: roleColors[role || 'user'], color: 'white' }} 
                />
              </Box>
              <Box>
                <Button 
                  startIcon={<NotificationsIcon />} 
                  component={RouterLink} 
                  to="/admin/notifications"
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                >
                  Alertas {stats.pendingReports > 0 && `(${stats.pendingReports})`}
                </Button>
                <Button 
                  startIcon={<SettingsIcon />} 
                  component={RouterLink} 
                  to="/admin/settings"
                  variant="outlined"
                  size="small"
                >
                  Configuración
                </Button>
              </Box>
            </Box>
            
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="admin dashboard tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab 
                icon={<DashboardIcon />} 
                label="General" 
                iconPosition="start" 
              />
              <Tab 
                icon={<PeopleIcon />} 
                label="Usuarios" 
                iconPosition="start" 
              />
              <Tab 
                icon={<SchoolIcon />} 
                label="Tutores" 
                iconPosition="start"
                sx={{
                  fontWeight: 'bold',
                  color: 'secondary.main',
                  '&.Mui-selected': {
                    color: 'secondary.dark',
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'secondary.main',
                  }
                }}
              />
              <Tab icon={<DescriptionIcon />} label="Contenido" iconPosition="start" />
              <Tab icon={<MenuBookIcon />} label="Recursos" iconPosition="start" />
              <Tab icon={<ForumIcon />} label="Foros" iconPosition="start" />
              <Tab icon={<CategoryIcon />} label="Categorías" iconPosition="start" />
              <Tab icon={<EmailIcon />} label="Comunicaciones" iconPosition="start" />
              <Tab icon={<BuildIcon />} label="Técnico" iconPosition="start" />
              <Tab icon={<SecurityIcon />} label="Seguridad" iconPosition="start" />
              <Tab icon={<MonetizationOnIcon />} label="Finanzas" iconPosition="start" />
              <Tab icon={<BusinessIcon />} label="Organización" iconPosition="start" />
            </Tabs>
          </Paper>
        </Grid>

        {/* Panel General */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Tarjetas de estadísticas */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Usuarios Totales
                </Typography>
                <Typography component="p" variant="h4">
                  {stats.users.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUpIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    +{stats.newUsersToday} hoy
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Cursos
                </Typography>
                <Typography component="p" variant="h4">
                  {stats.courses}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contenido educativo
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Publicaciones en Foro
                </Typography>
                <Typography component="p" variant="h4">
                  {stats.forumPosts.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Discusiones en la comunidad
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 140,
                }}
              >
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Alertas
                </Typography>
                <Typography component="p" variant="h4">
                  {stats.pendingReports}
                </Typography>
                <Typography color={stats.pendingReports > 0 ? "error" : "text.secondary"} variant="body2">
                  {stats.pendingReports > 0 ? 'Requieren atención' : 'No hay alertas pendientes'}
                </Typography>
              </Paper>
            </Grid>

            {/* Sección de métricas de plataforma */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Métricas de Plataforma
                </Typography>
                <Grid container spacing={3}>
                  {statsCards.map((metric, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {metric.title}
                        </Typography>
                        <Typography variant="h5" component="div">
                          {metric.value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {metric.change > 0 ? (
                            <TrendingUpIcon color="success" fontSize="small" sx={{ mr: 0.5 }} />
                          ) : (
                            <TrendingUpIcon color="error" fontSize="small" sx={{ mr: 0.5, transform: 'rotate(180deg)' }} />
                          )}
                          <Typography 
                            variant="body2" 
                            color={metric.change > 0 ? "success.main" : "error.main"}
                          >
                            {metric.change > 0 ? '+' : ''}{metric.change}%
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Usuarios recientes */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Usuarios Recientes
                </Typography>
                <List>
                  {recentUsers.map((user) => (
                    <React.Fragment key={user.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemIcon>
                          <Avatar>{user.name.charAt(0)}</Avatar>
                        </ListItemIcon>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {user.email}
                              </Typography>
                              {` — Registrado el ${user.joinDate}`}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
                <Button 
                  component={RouterLink} 
                  to="/admin/users" 
                  color="primary" 
                  sx={{ mt: 1 }}
                >
                  Ver todos los usuarios
                </Button>
              </Paper>
            </Grid>

            {/* Reportes pendientes */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                  Reportes Pendientes
                </Typography>
                {pendingReports.length > 0 ? (
                  <List>
                    {pendingReports.map((report) => (
                      <React.Fragment key={report.id}>
                        <ListItem alignItems="flex-start">
                          <ListItemIcon>
                            <FlagIcon color={report.severity === 'alta' ? 'error' : 'warning'} />
                          </ListItemIcon>
                          <ListItemText
                            primary={report.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  Reportado por: {report.reportedBy}
                                </Typography>
                                {` — ${report.date}`}
                              </React.Fragment>
                            }
                          />
                          <Button size="small" color="primary">
                            Revisar
                          </Button>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    ))}
                  </List>
                ) : (
                  <Alert severity="success">No hay reportes pendientes</Alert>
                )}
                <Button 
                  component={RouterLink} 
                  to="/admin/reports" 
                  color="primary" 
                  sx={{ mt: 1 }}
                >
                  Ver todos los reportes
                </Button>
              </Paper>
            </Grid>

            {/* Acciones de Administración */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 3
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography component="h2" variant="h6" color="primary" fontWeight="medium">
                    Acciones de Administración
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  {/* Primera fila con 3 tarjetas más importantes */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderColor: 'secondary.main', 
                        borderWidth: 2,
                        boxShadow: 3,
                        position: 'relative',
                        overflow: 'visible',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: -8,
                          left: 16,
                          right: 16,
                          height: 8,
                          backgroundColor: 'secondary.main',
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                        }
                      }}
                    >
                      <CardHeader 
                        avatar={<SchoolIcon sx={{ color: 'secondary.main' }} />}
                        title="Gestión de Tutores" 
                        sx={{ 
                          pb: 0,
                          '& .MuiCardHeader-title': {
                            color: 'secondary.main',
                            fontWeight: 'bold',
                            fontSize: '1.1rem'
                          }
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          Administra tutores, asigna estudiantes y gestiona niveles de mentoría.
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<SchoolIcon />}
                          component={RouterLink}
                          to="/admin/tutors"
                          fullWidth
                          sx={{ 
                            py: 1.2,
                            fontWeight: 'bold',
                            boxShadow: 2,
                            '&:hover': {
                              boxShadow: 4
                            }
                          }}
                        >
                          Gestionar Tutores
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 2
                        }
                      }}
                    >
                      <CardHeader 
                        avatar={<PeopleIcon color="primary" />}
                        title="Gestión de Usuarios" 
                        sx={{ 
                          pb: 0,
                          '& .MuiCardHeader-title': {
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          Administra usuarios, asigna roles y gestiona permisos de acceso.
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<PeopleIcon />}
                          component={RouterLink}
                          to="/admin/users"
                          fullWidth
                        >
                          Gestionar Usuarios
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={4}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 2
                        }
                      }}
                    >
                      <CardHeader 
                        avatar={<DescriptionIcon color="primary" />}
                        title="Gestión de Cursos" 
                        sx={{ 
                          pb: 0,
                          '& .MuiCardHeader-title': {
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          Administra cursos, artículos y recursos educativos del sistema.
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<DescriptionIcon />}
                          component={RouterLink}
                          to="/admin/courses"
                          fullWidth
                        >
                          Gestionar Cursos
                        </Button>
                      </Box>
                    </Card>
                  </Grid>

                  {/* Segunda fila con 2 tarjetas */}
                  <Grid item xs={12} sm={6} md={6}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 2
                        }
                      }}
                    >
                      <CardHeader 
                        avatar={<MonetizationOnIcon color="primary" />}
                        title="Gestión de Pagos" 
                        sx={{ 
                          pb: 0,
                          '& .MuiCardHeader-title': {
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          Administra transacciones, facturación y pagos de los usuarios de la plataforma.
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<MonetizationOnIcon />}
                          component={RouterLink}
                          to="/admin/payments"
                          fullWidth
                        >
                          Gestionar Pagos
                        </Button>
                      </Box>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 2
                        }
                      }}
                    >
                      <CardHeader 
                        avatar={<AssessmentIcon color="primary" />}
                        title="Analítica" 
                        sx={{ 
                          pb: 0,
                          '& .MuiCardHeader-title': {
                            fontWeight: 'medium',
                            fontSize: '1.1rem'
                          }
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          Visualiza estadísticas detalladas y reportes de rendimiento del sistema.
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AssessmentIcon />}
                          component={RouterLink}
                          to="/admin/analytics"
                          fullWidth
                        >
                          Ver Analítica
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Acceso directo a Gestión de Tutores */}
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 3, 
                  bgcolor: 'secondary.light', 
                  display: 'flex', 
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '8px',
                    bgcolor: 'secondary.main'
                  }}
                />
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Box>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        color="secondary.dark" 
                        fontWeight="bold" 
                        gutterBottom
                      >
                        Sistema de Gestión de Tutores
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Plataforma completa para administrar tutores académicos, incluyendo asignación de estudiantes, 
                        niveles de mentoría, especializaciones y horarios de disponibilidad.
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          size="large"
                          startIcon={<SchoolIcon />}
                          onClick={() => setTabValue(2)}
                          sx={{ 
                            px: 3, 
                            py: 1.2, 
                            fontWeight: 'bold', 
                            boxShadow: 3,
                            '&:hover': { boxShadow: 5 }
                          }}
                        >
                          Ir a Gestión de Tutores
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          startIcon={<PersonIcon />}
                          onClick={() => {
                            // Primero cambiar a la pestaña de tutores
                            setTabValue(2);
                            // Esperar un momento y luego simular clic en "Nuevo Tutor"
                            setTimeout(() => {
                              const tutorBtn = document.querySelector('[data-testid="new-tutor-button"]');
                              if (tutorBtn) {
                                (tutorBtn as HTMLElement).click();
                              }
                            }, 100);
                          }}
                        >
                          Añadir Nuevo Tutor
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                    <Box 
                      sx={{ 
                        display: 'inline-flex', 
                        p: 3, 
                        borderRadius: '50%', 
                        bgcolor: 'white',
                        boxShadow: 3,
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 80, color: 'secondary.main' }} />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Otros paneles */}
        <TabPanel value={tabValue} index={1}>
          <UserManagementPanel />
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          <TutorManagementPanel />
        </TabPanel>
        
        <TabPanel value={tabValue} index={3}>
          <ContentManagementPanel />
        </TabPanel>
        
        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Gestión de Recursos
          </Typography>
          <Typography variant="body2" paragraph>
            Administra los recursos adicionales disponibles para los usuarios, como tutoriales, documentación y guías.
          </Typography>
          <ResourceManager />
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Gestión de Foros
            </Typography>
            <Typography variant="body2" paragraph>
              Administra las discusiones, moderación y configuración de los foros de la plataforma.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ForumIcon />}
              component={RouterLink}
              to="/admin/forums"
              sx={{ mt: 2 }}
            >
              Ir a Gestión de Foros
            </Button>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Gestión de Categorías
            </Typography>
            <Typography variant="body2" paragraph>
              Organiza y gestiona las categorías de contenido, cursos y recursos.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CategoryIcon />}
              component={RouterLink}
              to="/admin/categories"
              sx={{ mt: 2 }}
            >
              Ir a Gestión de Categorías
            </Button>
          </Paper>
        </TabPanel>

        <TabPanel value={tabValue} index={7}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Gestión de Comunicaciones
            </Typography>
            <Typography variant="body2" paragraph>
              Administra las notificaciones, correos y comunicaciones con los usuarios.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EmailIcon />}
              component={RouterLink}
              to="/admin/communications"
              sx={{ mt: 2 }}
            >
              Ir a Gestión de Comunicaciones
            </Button>
          </Paper>
        </TabPanel>
        
        <TabPanel value={tabValue} index={8}>
          <TechnicalPanel />
        </TabPanel>

        <TabPanel value={tabValue} index={9}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Gestión de Seguridad
            </Typography>
            <Typography variant="body2" paragraph>
              Configura y monitorea la seguridad de la plataforma, incluyendo autenticación, autorización y auditoría.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SecurityIcon />}
              component={RouterLink}
              to="/admin/security"
              sx={{ mt: 2 }}
            >
              Ir a Gestión de Seguridad
            </Button>
          </Paper>
        </TabPanel>
        
        <TabPanel value={tabValue} index={10}>
          <FinancialPanel stats={stats} />
        </TabPanel>
        
        <TabPanel value={tabValue} index={11}>
          <OrganizationPanel />
        </TabPanel>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;