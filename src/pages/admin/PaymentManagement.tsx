import React, { useState, useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
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
  Card,
  CardContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  AttachMoney as MoneyIcon,
  Receipt as ReceiptIcon,
  AccountBalance as BankIcon,
  CreditCard as CardIcon,
  LocalAtm as CashIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';

interface Payment {
  id: string;
  type: 'subscription' | 'mentorship' | 'course';
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  date: string;
  paymentMethod: 'credit_card' | 'paypal' | 'bank_transfer';
  description: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  details: {
    concept: string;
    period?: string;
    mentor?: {
      id: string;
      name: string;
      commission: number;
    };
    course?: {
      id: string;
      name: string;
      instructor: string;
    };
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
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PaymentManagement = () => {
  const navigate = useNavigate();
  const { checkPermission } = useAdmin();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      // Simulación de carga de datos
      const mockPayments: Payment[] = [
        {
          id: '1',
          type: 'subscription',
          amount: 29.99,
          currency: 'USD',
          status: 'completed',
          date: '2024-03-20T10:30:00',
          paymentMethod: 'credit_card',
          description: 'Suscripción mensual - Plan Premium',
          user: {
            id: '1',
            name: 'Juan Pérez',
            email: 'juan@example.com'
          },
          details: {
            concept: 'Suscripción Premium',
            period: 'Marzo 2024'
          }
        },
        {
          id: '2',
          type: 'mentorship',
          amount: 150.00,
          currency: 'USD',
          status: 'pending',
          date: '2024-03-21T15:00:00',
          paymentMethod: 'paypal',
          description: 'Sesión de mentoría - Desarrollo Frontend',
          user: {
            id: '2',
            name: 'María López',
            email: 'maria@example.com'
          },
          details: {
            concept: 'Mentoría Frontend',
            mentor: {
              id: '1',
              name: 'Ana García',
              commission: 80
            }
          }
        }
      ];
      setPayments(mockPayments);
    } catch (err) {
      setError('Error al cargar los pagos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon />;
      case 'pending':
        return <ScheduleIcon />;
      case 'failed':
        return <ErrorIcon />;
      case 'refunded':
        return <WarningIcon />;
      default:
        return <CheckCircleIcon />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CardIcon />;
      case 'paypal':
        return <MoneyIcon />;
      case 'bank_transfer':
        return <BankIcon />;
      default:
        return <CashIcon />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const renderPaymentDetails = () => {
    if (!selectedPayment) return null;

    return (
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <ReceiptIcon color="primary" />
            <Typography variant="h6">
              Detalles del Pago
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Información General
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="ID de Transacción"
                        secondary={selectedPayment.id}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Fecha"
                        secondary={new Date(selectedPayment.date).toLocaleString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Monto"
                        secondary={formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Estado"
                        secondary={
                          <Chip
                            icon={getStatusIcon(selectedPayment.status) || undefined}
                            label={selectedPayment.status}
                            color={getStatusColor(selectedPayment.status) as any}
                            size="small"
                          />
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Información del Usuario
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Nombre"
                        secondary={selectedPayment.user.name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary={selectedPayment.user.email}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Detalles del Servicio
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Tipo de Servicio"
                        secondary={selectedPayment.type}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Concepto"
                        secondary={selectedPayment.details.concept}
                      />
                    </ListItem>
                    {selectedPayment.details.period && (
                      <ListItem>
                        <ListItemText
                          primary="Período"
                          secondary={selectedPayment.details.period}
                        />
                      </ListItem>
                    )}
                    {selectedPayment.details.mentor && (
                      <>
                        <ListItem>
                          <ListItemText
                            primary="Mentor"
                            secondary={selectedPayment.details.mentor.name}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Comisión del Mentor"
                            secondary={`${selectedPayment.details.mentor.commission}%`}
                          />
                        </ListItem>
                      </>
                    )}
                    {selectedPayment.details.course && (
                      <>
                        <ListItem>
                          <ListItemText
                            primary="Curso"
                            secondary={selectedPayment.details.course.name}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary="Instructor"
                            secondary={selectedPayment.details.course.instructor}
                          />
                        </ListItem>
                      </>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => {
              // Implementar descarga de factura
            }}
          >
            Descargar Factura
          </Button>
          <Button onClick={() => setOpenDialog(false)}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleExportData = () => {
    try {
      const filteredPayments = filterPayments();
      const csvContent = generateCSV(filteredPayments);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `payments_export_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      setSnackbar({
        open: true,
        message: 'Datos exportados exitosamente',
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Error al exportar los datos',
        severity: 'error'
      });
    }
  };

  const generateCSV = (data: Payment[]) => {
    const headers = ['ID', 'Tipo', 'Monto', 'Moneda', 'Estado', 'Fecha', 'Método de Pago', 'Usuario', 'Email'];
    const rows = data.map(payment => [
      payment.id,
      payment.type,
      payment.amount,
      payment.currency,
      payment.status,
      payment.date,
      payment.paymentMethod,
      payment.user.name,
      payment.user.email
    ]);
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const filterPayments = () => {
    return payments.filter(payment => {
      const matchesSearch = 
        payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
      const matchesType = filterType === 'all' || payment.type === filterType;
      
      const paymentDate = new Date(payment.date);
      const matchesDateRange = 
        (!dateRange.start || paymentDate >= new Date(dateRange.start)) &&
        (!dateRange.end || paymentDate <= new Date(dateRange.end));

      return matchesSearch && matchesStatus && matchesType && matchesDateRange;
    });
  };

  const filteredPayments = filterPayments();

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Pagos
        </Typography>
        
        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            action={
              <Button color="inherit" size="small" onClick={() => navigate('/admin')}>
                Volver al Dashboard
              </Button>
            }
          >
            {error}
          </Alert>
        )}
        
        {!error && (
          <>
            {/* Filtros */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Buscar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      label="Estado"
                    >
                      <MenuItem value="all">Todos</MenuItem>
                      <MenuItem value="completed">Completados</MenuItem>
                      <MenuItem value="pending">Pendientes</MenuItem>
                      <MenuItem value="failed">Fallidos</MenuItem>
                      <MenuItem value="refunded">Reembolsados</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="date"
                    label="Fecha inicio"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type="date"
                    label="Fecha fin"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  startIcon={<DownloadIcon />}
                  variant="contained"
                  onClick={handleExportData}
                  sx={{ ml: 1 }}
                >
                  Exportar
                </Button>
              </Box>
            </Paper>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                Total Recaudado (Mes Actual)
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Total Recaudado (Mes Actual)
                      </Typography>
                      <Typography variant="h4">
                        $4,586.00
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={75}
                        sx={{ mt: 2 }}
                        color="success"
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Pagos Pendientes
                      </Typography>
                      <Typography variant="h4">
                        $950.00
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={30}
                        sx={{ mt: 2 }}
                        color="warning"
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        Comisiones a Pagar
                      </Typography>
                      <Typography variant="h4">
                        $1,245.00
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={45}
                        sx={{ mt: 2 }}
                        color="info"
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            <Paper sx={{ mb: 3, p: 2 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={filterType}
                    label="Tipo"
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="subscription">Suscripciones</MenuItem>
                    <MenuItem value="mentorship">Mentorías</MenuItem>
                    <MenuItem value="course">Cursos</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Usuario</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Método de Pago</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.id}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar>{payment.user.name.charAt(0)}</Avatar>
                            <Box>
                              <Typography variant="subtitle2">
                                {payment.user.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {payment.user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={payment.type}
                            size="small"
                            color={
                              payment.type === 'subscription' ? 'primary' :
                              payment.type === 'mentorship' ? 'secondary' :
                              'default'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(payment.amount, payment.currency)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(payment.status) || undefined}
                            label={payment.status}
                            color={getStatusColor(payment.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(payment.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Tooltip title={payment.paymentMethod}>
                            <IconButton size="small">
                              {getPaymentMethodIcon(payment.paymentMethod)}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell align="right">
                          <Tooltip title="Ver detalles">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setSelectedPayment(payment);
                                setOpenDialog(true);
                              }}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Descargar factura">
                            <IconButton
                              size="small"
                              onClick={() => {
                                // Implementar descarga de factura
                              }}
                            >
                              <DownloadIcon />
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
                count={filteredPayments.length}
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

            {renderPaymentDetails()}

            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
              <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </>
        )}
      </Box>
    </Container>
  );
};

export default PaymentManagement; 