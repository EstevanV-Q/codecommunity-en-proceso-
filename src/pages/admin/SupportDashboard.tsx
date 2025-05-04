import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Rating,
  LinearProgress,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Badge,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Switch,
  Slider,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  Person as PersonIcon,
  Star as StarIcon,
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  MoreVert as MoreVertIcon,
  Chat as ChatIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
  Timer as TimerIcon,
  Settings as SettingsIcon,
  BarChart as BarChartIcon,
  Assessment as AssessmentIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  createdBy: string;
  rating?: number;
  feedback?: string;
  lastMessageAt?: string;
}

interface TimeLog {
  id: string;
  userId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  totalHours?: number;
}

interface SupportAgent {
  id: string;
  name: string;
  role: 'supportll' | 'support' | 'supportManager';
  ticketsResolved: number;
  averageRating: number;
  timeLogs: TimeLog[];
  currentTickets: number;
  responseTime: number;
  isActive: boolean;
  email?: string;
}

interface DashboardStats {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  averageResolutionTime: number;
  criticalTickets: number;
  averageRating: number;
}

interface SystemSettings {
  autoAssign: boolean;
  notificationThreshold: number;
  responseTimeLimit: number;
  criticalPriorityResponseTime: number;
  enableEmailNotifications: boolean;
  enableSMSNotifications: boolean;
}

interface AgentPerformance {
  agentId: string;
  name: string;
  ticketsResolved: number;
  averageResponseTime: number;
  averageResolutionTime: number;
  customerSatisfaction: number;
  currentWorkload: number;
  availability: number;
}

interface AgentFormData {
  id?: string;
  name: string;
  email: string;
  role: 'supportll' | 'support' | 'supportManager';
  isActive: boolean;
}

const SupportDashboard: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([]);
  const [agents, setAgents] = useState<SupportAgent[]>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
  });
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    averageResolutionTime: 0,
    criticalTickets: 0,
    averageRating: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketDetailOpen, setTicketDetailOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    autoAssign: true,
    notificationThreshold: 30,
    responseTimeLimit: 60,
    criticalPriorityResponseTime: 15,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
  });
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance[]>([]);
  const [showManagerSection, setShowManagerSection] = useState(false);
  const [agentDialogOpen, setAgentDialogOpen] = useState(false);
  const [agentFormData, setAgentFormData] = useState<AgentFormData>({
    name: '',
    email: '',
    role: 'support',
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // TODO: Implementar llamadas a la API
    const mockTickets: Ticket[] = [
      {
        id: '1',
        title: 'Error en el login',
        description: 'Los usuarios no pueden iniciar sesión',
        status: 'open',
        priority: 'high',
        createdAt: '2024-03-20T10:00:00',
        updatedAt: '2024-03-20T10:00:00',
        createdBy: 'user1',
        lastMessageAt: '2024-03-20T10:30:00',
      },
      {
        id: '2',
        title: 'Problema con el pago',
        description: 'El sistema de pago no procesa las tarjetas',
        status: 'in_progress',
        priority: 'critical',
        createdAt: '2024-03-20T09:00:00',
        updatedAt: '2024-03-20T09:30:00',
        assignedTo: user?.id,
        createdBy: 'user2',
        lastMessageAt: '2024-03-20T09:45:00',
      },
    ];

    const mockTimeLogs: TimeLog[] = [
      {
        id: '1',
        userId: user?.id || '',
        date: '2024-03-20',
        checkIn: '09:00',
        checkOut: '17:00',
        totalHours: 8,
      },
    ];

    const mockAgents: SupportAgent[] = [
      {
        id: '1',
        name: 'Agente 1',
        role: 'support',
        ticketsResolved: 15,
        averageRating: 4.5,
        timeLogs: mockTimeLogs,
        currentTickets: 3,
        responseTime: 15,
        isActive: true,
      },
      {
        id: '2',
        name: 'Agente 2',
        role: 'supportll',
        ticketsResolved: 10,
        averageRating: 4.2,
        timeLogs: mockTimeLogs,
        currentTickets: 2,
        responseTime: 20,
        isActive: true,
      },
    ];

    setTickets(mockTickets);
    setTimeLogs(mockTimeLogs);
    setAgents(mockAgents);

    // Calcular estadísticas
    const totalTickets = mockTickets.length;
    const openTickets = mockTickets.filter(t => t.status === 'open').length;
    const resolvedTickets = mockTickets.filter(t => t.status === 'resolved').length;
    const criticalTickets = mockTickets.filter(t => t.priority === 'critical').length;
    const averageRating = mockAgents.reduce((acc, agent) => acc + agent.averageRating, 0) / mockAgents.length;

    setStats({
      totalTickets,
      openTickets,
      resolvedTickets,
      averageResolutionTime: 120, // minutos
      criticalTickets,
      averageRating,
    });

    // Mock data for agent performance
    const mockAgentPerformance: AgentPerformance[] = [
      {
        agentId: '1',
        name: 'Agente 1',
        ticketsResolved: 15,
        averageResponseTime: 12,
        averageResolutionTime: 45,
        customerSatisfaction: 4.5,
        currentWorkload: 3,
        availability: 90,
      },
      {
        agentId: '2',
        name: 'Agente 2',
        ticketsResolved: 10,
        averageResponseTime: 18,
        averageResolutionTime: 60,
        customerSatisfaction: 4.2,
        currentWorkload: 2,
        availability: 85,
      },
    ];

    setAgentPerformance(mockAgentPerformance);
  }, [user]);

  useEffect(() => {
    // Cargar datos del localStorage al inicio
    const savedSettings = localStorage.getItem('supportSystemSettings');
    const savedAgents = localStorage.getItem('supportAgents');
    const savedTickets = localStorage.getItem('supportTickets');

    if (savedSettings) {
      setSystemSettings(JSON.parse(savedSettings));
    }
    if (savedAgents) {
      setAgents(JSON.parse(savedAgents));
    }
    if (savedTickets) {
      setTickets(JSON.parse(savedTickets));
    }
  }, []);

  useEffect(() => {
    // Guardar cambios en localStorage
    localStorage.setItem('supportSystemSettings', JSON.stringify(systemSettings));
    localStorage.setItem('supportAgents', JSON.stringify(agents));
    localStorage.setItem('supportTickets', JSON.stringify(tickets));
  }, [systemSettings, agents, tickets]);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    setCheckInTime(timeString);
    // TODO: Implementar llamada a la API para registrar entrada
  };

  const handleCheckOut = () => {
    if (!checkInTime) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour12: false });
    // TODO: Implementar llamada a la API para registrar salida
    setCheckInTime(null);
  };

  const handleCreateTicket = () => {
    if (!newTicket.title.trim() || !newTicket.description.trim()) return;

    const ticket: Ticket = {
      id: String(Date.now()),
      ...newTicket,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user?.id || '',
      lastMessageAt: new Date().toISOString(),
    };

    setTickets(prev => [...prev, ticket]);
    setNewTicketOpen(false);
    setNewTicket({
      title: '',
      description: '',
      priority: 'medium',
    });
  };

  const handleAssignTicket = (ticketId: string) => {
    if (!selectedAgent) return;
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, assignedTo: selectedAgent, status: 'in_progress' }
        : ticket
    ));
    setAssignDialogOpen(false);
  };

  const handleChangeStatus = (ticketId: string, newStatus: Ticket['status']) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setTicketDetailOpen(true);
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSettingsChange = (setting: keyof SystemSettings, value: any) => {
    setSystemSettings(prev => {
      const newSettings = { ...prev, [setting]: value };
      return newSettings;
    });
  };

  const handleAgentStatusChange = (agentId: string, isActive: boolean) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, isActive } : agent
    ));
  };

  // Nueva función para exportar a CSV usando solo JS nativo
  const exportToCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const replacer = (key: string, value: any) => value === null ? '' : value;
    const header = Object.keys(data[0]);
    const csv = [
      header.join(','),
      ...data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    ].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reemplazar handleExportData para usar exportToCSV
  const handleExportData = (type: 'tickets' | 'agents' | 'performance') => {
    let data: any[] = [];
    let fileName = '';

    switch (type) {
      case 'tickets':
        data = tickets.map(ticket => ({
          ID: ticket.id,
          Título: ticket.title,
          Descripción: ticket.description,
          Estado: ticket.status,
          Prioridad: ticket.priority,
          'Fecha de Creación': new Date(ticket.createdAt).toLocaleString(),
          'Última Actualización': new Date(ticket.updatedAt).toLocaleString(),
          'Asignado a': ticket.assignedTo || 'Sin asignar',
          'Creado por': ticket.createdBy,
        }));
        fileName = 'tickets';
        break;
      case 'agents':
        data = agents.map(agent => ({
          ID: agent.id,
          Nombre: agent.name,
          Rol: agent.role,
          'Tickets Resueltos': agent.ticketsResolved,
          'Calificación Promedio': agent.averageRating,
          'Tickets Actuales': agent.currentTickets,
          'Tiempo de Respuesta': agent.responseTime,
          Estado: agent.isActive ? 'Activo' : 'Inactivo',
        }));
        fileName = 'agentes';
        break;
      case 'performance':
        data = agentPerformance.map(agent => ({
          ID: agent.agentId,
          Nombre: agent.name,
          'Tickets Resueltos': agent.ticketsResolved,
          'Tiempo Respuesta Promedio': `${agent.averageResponseTime} min`,
          'Tiempo Resolución Promedio': `${agent.averageResolutionTime} min`,
          'Satisfacción del Cliente': agent.customerSatisfaction,
          'Carga Actual': `${agent.currentWorkload}/5`,
          Disponibilidad: `${agent.availability}%`,
        }));
        fileName = 'rendimiento';
        break;
    }
    exportToCSV(data, fileName);
  };

  const calculateAgentPerformance = () => {
    const performance = agents.map(agent => {
      const agentTickets = tickets.filter(t => t.assignedTo === agent.id);
      const resolvedTickets = agentTickets.filter(t => t.status === 'resolved');
      const responseTimes = resolvedTickets.map(t => {
        const created = new Date(t.createdAt);
        const updated = new Date(t.updatedAt);
        return (updated.getTime() - created.getTime()) / (1000 * 60); // minutos
      });
      const avgResponseTime = responseTimes.length > 0 
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
        : 0;

      return {
        agentId: agent.id,
        name: agent.name,
        ticketsResolved: resolvedTickets.length,
        averageResponseTime: Math.round(avgResponseTime),
        averageResolutionTime: Math.round(avgResponseTime * 1.5),
        customerSatisfaction: agent.averageRating,
        currentWorkload: agentTickets.filter(t => t.status !== 'resolved').length,
        availability: agent.isActive ? 90 : 0,
      };
    });

    setAgentPerformance(performance);
  };

  useEffect(() => {
    calculateAgentPerformance();
  }, [agents, tickets]);

  const handleAgentSubmit = () => {
    if (!agentFormData.name || !agentFormData.email) return;

    if (isEditing && agentFormData.id) {
      setAgents(prev => prev.map(agent => 
        agent.id === agentFormData.id 
          ? { 
              ...agent, 
              name: agentFormData.name,
              email: agentFormData.email,
              role: agentFormData.role,
              isActive: agentFormData.isActive
            } 
          : agent
      ));
    } else {
      const newAgent: SupportAgent = {
        id: String(Date.now()),
        name: agentFormData.name,
        role: agentFormData.role,
        ticketsResolved: 0,
        averageRating: 0,
        timeLogs: [],
        currentTickets: 0,
        responseTime: 0,
        isActive: agentFormData.isActive,
      };
      setAgents(prev => [...prev, newAgent]);
    }

    setAgentDialogOpen(false);
    setAgentFormData({
      name: '',
      email: '',
      role: 'support',
      isActive: true,
    });
    setIsEditing(false);
  };

  const handleEditAgent = (agent: SupportAgent) => {
    setAgentFormData({
      id: agent.id,
      name: agent.name,
      email: agent.email || '',
      role: agent.role,
      isActive: agent.isActive,
    });
    setIsEditing(true);
    setAgentDialogOpen(true);
  };

  const handleDeleteAgent = (agentId: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este agente?')) {
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
    }
  };

  const isManager = user?.roles?.includes('supportManager');

  return (
    <Box sx={{ p: 3 }}>
      {/* Header con estadísticas */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)',
          }
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Dashboard de Soporte
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {isManager ? 'Gestión de tickets y agentes de soporte' : 'Gestión de tickets de soporte'}
            </Typography>
          </Box>
          <Box display="flex" gap={2}>
            {!checkInTime ? (
              <Button
                variant="contained"
                startIcon={<AccessTimeIcon />}
                onClick={handleCheckIn}
                sx={{
                  background: 'white',
                  color: theme.palette.primary.main,
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.9),
                  }
                }}
              >
                Registrar Entrada
              </Button>
            ) : (
              <Button
                variant="contained"
                startIcon={<AccessTimeIcon />}
                onClick={handleCheckOut}
                sx={{
                  background: 'white',
                  color: theme.palette.error.main,
                  '&:hover': {
                    background: alpha(theme.palette.common.white, 0.9),
                  }
                }}
              >
                Registrar Salida
              </Button>
            )}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setNewTicketOpen(true)}
              sx={{
                background: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  background: alpha(theme.palette.common.white, 0.9),
                }
              }}
            >
              Nuevo Ticket
            </Button>
          </Box>
        </Box>

        {/* Estadísticas */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.common.white, 0.1) }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{stats.totalTickets}</Typography>
              <Typography variant="body2">Total Tickets</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.common.white, 0.1) }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.error.main }}>
                {stats.openTickets}
              </Typography>
              <Typography variant="body2">Tickets Abiertos</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.common.white, 0.1) }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.success.main }}>
                {stats.resolvedTickets}
              </Typography>
              <Typography variant="body2">Tickets Resueltos</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', bgcolor: alpha(theme.palette.common.white, 0.1) }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.warning.main }}>
                {stats.criticalTickets}
              </Typography>
              <Typography variant="body2">Tickets Críticos</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Filtros y búsqueda */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Buscar tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Estado</InputLabel>
              <Select
                value={statusFilter}
                label="Estado"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="open">Abierto</MenuItem>
                <MenuItem value="in_progress">En Progreso</MenuItem>
                <MenuItem value="resolved">Resuelto</MenuItem>
                <MenuItem value="closed">Cerrado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Prioridad</InputLabel>
              <Select
                value={priorityFilter}
                label="Prioridad"
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <MenuItem value="all">Todas</MenuItem>
                <MenuItem value="low">Baja</MenuItem>
                <MenuItem value="medium">Media</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
                <MenuItem value="critical">Crítica</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setPriorityFilter('all');
              }}
            >
              Limpiar Filtros
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs para diferentes secciones */}
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="Tickets" icon={<AssignmentIcon />} />
        {isManager && <Tab label="Gestión" icon={<SettingsIcon />} />}
        {isManager && <Tab label="Reportes" icon={<AssessmentIcon />} />}
        <Tab label="Registro de Horas" icon={<AccessTimeIcon />} />
      </Tabs>

      {/* Sección de Tickets (existente) */}
      {selectedTab === 0 && (
        <>
          {/* Tabla de tickets */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Título</TableCell>
                  <TableCell>Prioridad</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Asignado a</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {ticket.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {ticket.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.priority}
                        color={
                          ticket.priority === 'critical' ? 'error' :
                          ticket.priority === 'high' ? 'warning' :
                          ticket.priority === 'medium' ? 'info' : 'success'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={ticket.status}
                        color={
                          ticket.status === 'open' ? 'error' :
                          ticket.status === 'in_progress' ? 'warning' :
                          ticket.status === 'resolved' ? 'success' : 'default'
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {ticket.assignedTo ? (
                        <Chip
                          avatar={<Avatar>{ticket.assignedTo.charAt(0)}</Avatar>}
                          label={ticket.assignedTo}
                        />
                      ) : (
                        <Chip label="Sin asignar" variant="outlined" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleViewTicket(ticket)}>
                        <ChatIcon />
                      </IconButton>
                      {!ticket.assignedTo && (
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setAssignDialogOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      {ticket.assignedTo === user?.id && (
                        <IconButton
                          color="success"
                          onClick={() => handleChangeStatus(ticket.id, 'resolved')}
                        >
                          <CheckIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Sección de Gestión (solo para managers) */}
      {selectedTab === 1 && isManager && (
        <Grid container spacing={3}>
          {/* Configuración del Sistema */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Configuración del Sistema"
                avatar={<SettingsIcon />}
              />
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Asignación Automática"
                      secondary="Asignar tickets automáticamente a agentes disponibles"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={systemSettings.autoAssign}
                        onChange={(e) => handleSettingsChange('autoAssign', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Notificaciones por Email"
                      secondary="Enviar notificaciones por correo electrónico"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={systemSettings.enableEmailNotifications}
                        onChange={(e) => handleSettingsChange('enableEmailNotifications', e.target.checked)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Tiempo de Respuesta Máximo"
                      secondary={`${systemSettings.responseTimeLimit} minutos`}
                    />
                    <ListItemSecondaryAction sx={{ width: 200 }}>
                      <Slider
                        value={systemSettings.responseTimeLimit}
                        onChange={(_, value) => handleSettingsChange('responseTimeLimit', value)}
                        min={15}
                        max={120}
                        step={15}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Gestión de Agentes */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Gestión de Agentes"
                avatar={<GroupIcon />}
                action={
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => {
                      setAgentDialogOpen(true);
                      setIsEditing(false);
                    }}
                  >
                    Agregar Agente
                  </Button>
                }
              />
              <CardContent>
                <List>
                  {agents.map((agent) => (
                    <React.Fragment key={agent.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{agent.name.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={agent.name}
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {agent.role}
                              </Typography>
                              <br />
                              <Typography variant="body2" component="span" color="text.secondary">
                                Tickets resueltos: {agent.ticketsResolved}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" onClick={() => handleEditAgent(agent)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" onClick={() => handleDeleteAgent(agent.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Rendimiento de Agentes */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Rendimiento de Agentes"
                avatar={<TrendingUpIcon />}
                action={
                  <Button
                    startIcon={<DownloadIcon />}
                    onClick={() => handleExportData('performance')}
                  >
                    Exportar
                  </Button>
                }
              />
              <CardContent>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Agente</TableCell>
                        <TableCell align="center">Tickets Resueltos</TableCell>
                        <TableCell align="center">Tiempo Respuesta Promedio</TableCell>
                        <TableCell align="center">Tiempo Resolución Promedio</TableCell>
                        <TableCell align="center">Satisfacción del Cliente</TableCell>
                        <TableCell align="center">Carga Actual</TableCell>
                        <TableCell align="center">Disponibilidad</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {agentPerformance.map((agent) => (
                        <TableRow key={agent.agentId}>
                          <TableCell>{agent.name}</TableCell>
                          <TableCell align="center">{agent.ticketsResolved}</TableCell>
                          <TableCell align="center">{agent.averageResponseTime} min</TableCell>
                          <TableCell align="center">{agent.averageResolutionTime} min</TableCell>
                          <TableCell align="center">
                            <Rating value={agent.customerSatisfaction} readOnly precision={0.1} />
                          </TableCell>
                          <TableCell align="center">
                            <LinearProgress
                              variant="determinate"
                              value={(agent.currentWorkload / 5) * 100}
                              color={agent.currentWorkload > 3 ? 'error' : 'primary'}
                            />
                            {agent.currentWorkload}/5
                          </TableCell>
                          <TableCell align="center">
                            <LinearProgress
                              variant="determinate"
                              value={agent.availability}
                              color={agent.availability < 80 ? 'error' : 'success'}
                            />
                            {agent.availability}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Sección de Reportes (solo para managers) */}
      {selectedTab === 2 && isManager && (
        <Grid container spacing={3}>
          {/* Estadísticas Generales */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Estadísticas Generales"
                avatar={<BarChartIcon />}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                      Tickets por Día
                    </Typography>
                    <Typography variant="h4">24</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                      Tiempo Promedio de Resolución
                    </Typography>
                    <Typography variant="h4">45 min</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                      Satisfacción Promedio
                    </Typography>
                    <Typography variant="h4">4.3/5</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="text.secondary">
                      Tasa de Resolución
                    </Typography>
                    <Typography variant="h4">92%</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Exportación de Datos */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Exportación de Datos"
                avatar={<DownloadIcon />}
              />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleExportData('tickets')}
                    >
                      Exportar Tickets
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleExportData('agents')}
                    >
                      Exportar Datos de Agentes
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleExportData('performance')}
                    >
                      Exportar Reporte de Rendimiento
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Diálogo de asignación */}
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Asignar Ticket</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Asignar a</InputLabel>
            <Select
              value={selectedAgent}
              label="Asignar a"
              onChange={(e) => setSelectedAgent(e.target.value)}
            >
              {agents.map((agent) => (
                <MenuItem key={agent.id} value={agent.id}>
                  {agent.name} ({agent.role})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => selectedTicket && handleAssignTicket(selectedTicket.id)}
            disabled={!selectedAgent}
          >
            Asignar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de detalle de ticket */}
      <Dialog
        open={ticketDetailOpen}
        onClose={() => setTicketDetailOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Detalle del Ticket</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedTicket.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedTicket.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Estado</Typography>
                  <Chip
                    label={selectedTicket.status}
                    color={
                      selectedTicket.status === 'open' ? 'error' :
                      selectedTicket.status === 'in_progress' ? 'warning' :
                      selectedTicket.status === 'resolved' ? 'success' : 'default'
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Prioridad</Typography>
                  <Chip
                    label={selectedTicket.priority}
                    color={
                      selectedTicket.priority === 'critical' ? 'error' :
                      selectedTicket.priority === 'high' ? 'warning' :
                      selectedTicket.priority === 'medium' ? 'info' : 'success'
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Creado</Typography>
                  <Typography>
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Última actualización</Typography>
                  <Typography>
                    {new Date(selectedTicket.updatedAt).toLocaleString()}
                  </Typography>
                </Grid>
                {selectedTicket.assignedTo && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Asignado a</Typography>
                    <Chip
                      avatar={<Avatar>{selectedTicket.assignedTo.charAt(0)}</Avatar>}
                      label={selectedTicket.assignedTo}
                    />
                  </Grid>
                )}
                {selectedTicket.rating && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Calificación</Typography>
                    <Rating value={selectedTicket.rating} readOnly />
                  </Grid>
                )}
                {selectedTicket.feedback && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Feedback</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedTicket.feedback}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTicketDetailOpen(false)}>Cerrar</Button>
          {selectedTicket?.assignedTo === user?.id && selectedTicket && (
            <Button
              variant="contained"
              onClick={() => {
                handleChangeStatus(selectedTicket.id, 'resolved');
                setTicketDetailOpen(false);
              }}
            >
              Marcar como Resuelto
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Diálogo de nuevo ticket */}
      <Dialog
        open={newTicketOpen}
        onClose={() => setNewTicketOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Crear Nuevo Ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={newTicket.title}
            onChange={(e) => setNewTicket(prev => ({ ...prev, title: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newTicket.description}
            onChange={(e) => setNewTicket(prev => ({ ...prev, description: e.target.value }))}
          />
          <TextField
            margin="dense"
            label="Prioridad"
            select
            fullWidth
            value={newTicket.priority}
            onChange={(e) => setNewTicket(prev => ({ ...prev, priority: e.target.value as any }))}
            SelectProps={{
              native: true,
            }}
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
            <option value="critical">Crítica</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewTicketOpen(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleCreateTicket}
            disabled={!newTicket.title.trim() || !newTicket.description.trim()}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Agente */}
      <Dialog
        open={agentDialogOpen}
        onClose={() => {
          setAgentDialogOpen(false);
          setAgentFormData({
            name: '',
            email: '',
            role: 'support',
            isActive: true,
          });
          setIsEditing(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Editar Agente' : 'Agregar Nuevo Agente'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Nombre"
              value={agentFormData.name}
              onChange={(e) => setAgentFormData(prev => ({ ...prev, name: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={agentFormData.email}
              onChange={(e) => setAgentFormData(prev => ({ ...prev, email: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Rol</InputLabel>
              <Select
                value={agentFormData.role}
                label="Rol"
                onChange={(e) => setAgentFormData(prev => ({ ...prev, role: e.target.value as any }))}
              >
                <MenuItem value="support">Soporte</MenuItem>
                <MenuItem value="supportll">Soporte Nivel 2</MenuItem>
                <MenuItem value="supportManager">Gerente de Soporte</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={agentFormData.isActive}
                  onChange={(e) => setAgentFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
              }
              label="Activo"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAgentDialogOpen(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleAgentSubmit}
            disabled={!agentFormData.name || !agentFormData.email}
          >
            {isEditing ? 'Guardar Cambios' : 'Agregar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SupportDashboard; 