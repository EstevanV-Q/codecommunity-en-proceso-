import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
  IconButton,
  Badge,
  Chip,
  Paper,
  styled,
  Alert,
  Stack,
  Snackbar,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCart as CartIcon,
  History as HistoryIcon,
  Subscriptions as SubscriptionsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
  CalendarToday as CalendarIcon,
  DonutLarge as DonutLargeIcon,
  Lock as LockIcon,
  ShoppingCart,
} from '@mui/icons-material';
import { colors, shadows } from '../../theme/tokens';

// Tipos de datos
interface Curso {
  id: string;
  titulo: string;
  precio: number;
  imagen: string;
  descripcion: string;
}

interface ItemCarrito {
  curso: Curso;
  cantidad: number;
}

interface Compra {
  id: string;
  fecha: Date;
  items: ItemCarrito[];
  total: number;
  estado: 'completada' | 'pendiente' | 'cancelada';
}

interface Suscripcion {
  id: string;
  fechaInicio: Date;
  fechaRenovacion: Date;
  estado: 'activa' | 'cancelada' | 'pendiente';
  plan: 'mensual' | 'anual';
  precio: number;
}

interface EstadoApp {
  itemsCarrito: ItemCarrito[];
  compras: Compra[];
  suscripciones: Suscripcion[];
}

// Componentes con estilo personalizado
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.lg
  }
}));

const PriceChip = styled(Chip)(({ theme }) => ({
  backgroundColor: colors.primary[50],
  color: colors.primary[700],
  fontWeight: 'bold',
  '& .MuiChip-label': {
    fontSize: '1.1rem'
  }
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const AppCarrito: React.FC = () => {
  const navigate = useNavigate(); // Inicializar navigate
  const [estado, setEstado] = useState<EstadoApp>({
    itemsCarrito: [],
    compras: [],
    suscripciones: []
  });
  
  const [seccionActiva, setSeccionActiva] = useState<'carrito' | 'compras' | 'suscripciones' | 'metodosPago'>('carrito'); // Add 'metodosPago'
  
  // 1. Primero, agregar estados para el feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  // Cursos de ejemplo
  const cursos: Curso[] = [
    {
      id: '1',
      titulo: 'TypeScript Avanzado',
      precio: 49.99,
      imagen: '/curso-ts.jpg',
      descripcion: 'Aprende TypeScript desde cero hasta nivel avanzado'
    },
    {
      id: '2',
      titulo: 'React Profesional',
      precio: 59.99,
      imagen: '/curso-react.jpg',
      descripcion: 'Desarrollo de aplicaciones con React y TypeScript'
    },
    {
      id: '3',
      titulo: 'Node.js y Express',
      precio: 39.99,
      imagen: '/curso-node.jpg',
      descripcion: 'Construye APIs RESTful con Node.js y Express'
    }
  ];
  
  // Funciones para el carrito
  // 2. Modificar la función agregarAlCarrito
  const agregarAlCarrito = (curso: Curso) => {
    setEstado(prevEstado => {
      const itemExistente = prevEstado.itemsCarrito.find(
        item => item.curso.id === curso.id
      );
      
      const nuevoEstado = itemExistente ? {
        ...prevEstado,
        itemsCarrito: prevEstado.itemsCarrito.map(item => 
          item.curso.id === curso.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        )
      } : {
        ...prevEstado,
        itemsCarrito: [...prevEstado.itemsCarrito, { curso, cantidad: 1 }]
      };

      // Mostrar mensaje
      setSnackbarMessage(`${curso.titulo} agregado al carrito`);
      setSnackbarOpen(true);
      
      return nuevoEstado;
    });
  };
  
  const eliminarDelCarrito = (cursoId: string) => {
    setEstado(prevEstado => ({
      ...prevEstado,
      itemsCarrito: prevEstado.itemsCarrito.filter(item => item.curso.id !== cursoId)
    }));
  };
  
  const actualizarCantidad = (cursoId: string, cantidad: number) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(cursoId);
      return;
    }
    
    setEstado(prevEstado => ({
      ...prevEstado,
      itemsCarrito: prevEstado.itemsCarrito.map(item => 
        item.curso.id === cursoId 
          ? { ...item, cantidad } 
          : item
      )
    }));
  };
  
  // Función para completar la compra
  const realizarCompra = () => {
    if (estado.itemsCarrito.length === 0) return;
  
    const totalAmount = calcularTotal(); // Calculate the total price of the cart
  
    const nuevaCompra: Compra = {
      id: `compra-${Date.now()}`,
      fecha: new Date(),
      items: [...estado.itemsCarrito],
      total: totalAmount,
      estado: 'completada',
    };
  
    setEstado(prevEstado => ({
      ...prevEstado,
      compras: [nuevaCompra, ...prevEstado.compras],
      itemsCarrito: [],
    }));
  
    // Pass the total amount as state when navigating to the payment page
    navigate('/payment', { state: { totalAmount } });
  };
  
  // Funciones para las suscripciones
  const agregarSuscripcion = (plan: 'mensual' | 'anual') => {
    const precio = plan === 'mensual' ? 19.99 : 199.99;
    const fechaInicio = new Date();
    const fechaRenovacion = new Date();
    
    if (plan === 'mensual') {
      fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
    } else {
      fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);
    }
    
    const nuevaSuscripcion: Suscripcion = {
      id: `suscripcion-${Date.now()}`,
      fechaInicio,
      fechaRenovacion,
      estado: 'activa',
      plan,
      precio
    };
    
    setEstado(prevEstado => ({
      ...prevEstado,
      suscripciones: [nuevaSuscripcion, ...prevEstado.suscripciones]
    }));
    
    alert(`¡Suscripción ${plan} activada con éxito!`);
  };
  
  const cambiarEstadoSuscripcion = (id: string, nuevoEstado: 'activa' | 'cancelada' | 'pendiente') => {
    setEstado(prevEstado => ({
      ...prevEstado,
      suscripciones: prevEstado.suscripciones.map(suscripcion => 
        suscripcion.id === id 
          ? { ...suscripcion, estado: nuevoEstado } 
          : suscripcion
      )
    }));
  };
  
  // Funciones de cálculo
  const calcularTotal = () => {
    return estado.itemsCarrito.reduce(
      (total, item) => total + (item.curso.precio * item.cantidad),
      0
    );
  };

  const [form, setForm] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit_card' | 'paypal' | 'stripe'>('credit_card'); // Add state for payment method

  const handlePaymentMethodChange = (method: 'credit_card' | 'paypal' | 'stripe') => {
    setSelectedPaymentMethod(method);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Tabs de navegación CARRITO COMPRAS SUSCRIPCIONES Y METODO DE PAGO*/}
      <Paper sx={{ mb: 4 }}>
        <Tabs 
          value={
            seccionActiva === 'carrito' ? 0 : 
            seccionActiva === 'compras' ? 1 : 
            seccionActiva === 'suscripciones' ? 2 : 
            3 // Add case for 'metodosPago'
          }
          onChange={(_, newValue) => {
            setSeccionActiva(
              newValue === 0 ? 'carrito' : 
              newValue === 1 ? 'compras' : 
              newValue === 2 ? 'suscripciones' : 
              'metodosPago' // Handle 'metodosPago'
            );
          }}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab 
            icon={<StyledBadge badgeContent={estado.itemsCarrito.length} color="primary">
              <CartIcon />
            </StyledBadge>} 
            label="Carrito" 
          />
          <Tab icon={<HistoryIcon />} label="Mis Compras" />
          <Tab icon={<SubscriptionsIcon />} label="Suscripciones" />
          <Tab icon={<LockIcon />} label="Métodos de Pago" /> {/* Add new tab */}
        </Tabs>
      </Paper>

      {seccionActiva === 'carrito' && (
        <>
          <Typography variant="h4" gutterBottom>
            Cursos Disponibles
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {cursos.map((curso) => (
              <Grid item xs={12} sm={6} md={4} key={curso.id}>
                <StyledCard>
                  <CardMedia
                    component="img"
                    height="140"
                    image={curso.imagen}
                    alt={curso.titulo}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {curso.titulo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {curso.descripcion}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <PriceChip label={`$${curso.precio}`} />
                      <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => agregarAlCarrito(curso)}
                      >
                        Agregar
                      </Button>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {/* Carrito */}
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Carrito de Compras
            </Typography>

            {estado.itemsCarrito.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <CartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography color="text.secondary">
                  Tu carrito está vacío
                </Typography>
              </Box>
            ) : (
              <>
                <Stack spacing={2}>
                  {estado.itemsCarrito.map((item) => (
                    <Box
                      key={item.curso.id}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 100, height: 60, borderRadius: 1 }}
                        image={item.curso.imagen}
                        alt={item.curso.titulo}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1">{item.curso.titulo}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.curso.precio} x {item.cantidad}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton 
                          size="small"
                          onClick={() => actualizarCantidad(item.curso.id, item.cantidad - 1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.cantidad}</Typography>
                        <IconButton 
                          size="small"
                          onClick={() => actualizarCantidad(item.curso.id, item.cantidad + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton 
                          color="error"
                          onClick={() => eliminarDelCarrito(item.curso.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="subtitle1" sx={{ minWidth: 80, textAlign: 'right' }}>
                        ${(item.curso.precio * item.cantidad).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 3 
                }}>
                  <Box>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total ({estado.itemsCarrito.length} {
                        estado.itemsCarrito.length === 1 ? 'curso' : 'cursos'
                      })
                    </Typography>
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 'bold' }}>
                      ${calcularTotal().toFixed(2)}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<ShoppingCart />}
                    
                    onClick={realizarCompra}
                    disabled={estado.itemsCarrito.length === 0}
                  >
                    Realizar Compra
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </>
      )}

      {seccionActiva === 'compras' && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Historial de Compras
          </Typography>

          {estado.compras.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <HistoryIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No tienes compras realizadas
              </Typography>
              <Button
                variant="contained"
                onClick={() => setSeccionActiva('carrito')}
                startIcon={<ShoppingCart />}
              >
                Ir a la tienda
              </Button>
            </Paper>
          ) : (
            <Stack spacing={3}>
              {estado.compras.map((compra) => (
                <Paper key={compra.id} sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="h6">
                        Orden #{compra.id.split('-')[1].slice(-4)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {compra.fecha.toLocaleDateString()} - {compra.fecha.toLocaleTimeString()}
                      </Typography>
                    </Box>
                    <Chip
                      label={compra.estado.charAt(0).toUpperCase() + compra.estado.slice(1)}
                      color={
                        compra.estado === 'completada' 
                          ? 'success' 
                          : compra.estado === 'pendiente' 
                          ? 'warning' 
                          : 'error'
                      }
                    />
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    {compra.items.map((item) => (
                      <Grid item xs={12} key={`${compra.id}-${item.curso.id}`}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 100, height: 60, borderRadius: 1 }}
                            image={item.curso.imagen}
                            alt={item.curso.titulo}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">
                              {item.curso.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Cantidad: {item.cantidad}
                            </Typography>
                          </Box>
                          <Typography variant="subtitle1" sx={{ minWidth: 80, textAlign: 'right' }}>
                            ${(item.curso.precio * item.cantidad).toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Typography variant="h6">
                      Total: ${compra.total.toFixed(2)}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          )}
        </Box>
      )}

      {seccionActiva === 'suscripciones' && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Planes de Suscripción
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Plan Mensual */}
            <Grid item xs={12} md={6}>
              <StyledCard>
                <CardContent>
                  <Typography variant="h5" gutterBottom>Plan Mensual</Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    $19.99
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      /mes
                    </Typography>
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Acceso a todos los cursos</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Soporte técnico</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Certificados digitales</Typography>
                    </Box>
                  </Stack>
                  <Button 
                    variant="contained" 
                    fullWidth
                    onClick={() => agregarSuscripcion('mensual')}
                  >
                    Suscribirse
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>

            {/* Plan Anual */}
            <Grid item xs={12} md={6}>
              <StyledCard sx={{ position: 'relative' }}>
                <Chip
                  label="Recomendado"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                  }}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom>Plan Anual</Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    $199.99
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      /año
                    </Typography>
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="success.main" 
                    sx={{ mb: 3 }}
                  >
                    ¡Ahorra un 17% comparado con el plan mensual!
                  </Typography>
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Todo lo incluido en el plan mensual</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Acceso prioritario a nuevos cursos</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Mentorías personalizadas</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" />
                      <Typography>Descarga de contenido offline</Typography>
                    </Box>
                  </Stack>
                  <Button 
                    variant="contained" 
                    fullWidth
                    color="primary"
                    onClick={() => agregarSuscripcion('anual')}
                  >
                    Suscribirse y Ahorrar
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>

          {/* Suscripciones Activas */}
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Tus Suscripciones
          </Typography>

          {estado.suscripciones.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <SubscriptionsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No tienes suscripciones activas
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {estado.suscripciones.map((suscripcion) => (
                <Grid item xs={12} key={suscripcion.id}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6">
                          Plan {suscripcion.plan.charAt(0).toUpperCase() + suscripcion.plan.slice(1)}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            <CalendarIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                            Inicio: {suscripcion.fechaInicio.toLocaleDateString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <DonutLargeIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                            Renovación: {suscripcion.fechaRenovacion.toLocaleDateString()}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip
                          label={suscripcion.estado.charAt(0).toUpperCase() + suscripcion.estado.slice(1)}
                          color={
                            suscripcion.estado === 'activa' 
                              ? 'success' 
                              : suscripcion.estado === 'pendiente' 
                              ? 'warning' 
                              : 'error'
                          }
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" color="primary">
                          ${suscripcion.precio.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                      {suscripcion.estado === 'activa' && (
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon/>}
                          onClick={() => cambiarEstadoSuscripcion(suscripcion.id, 'cancelada')}
                        >
                          Cancelar Suscripción
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
      {seccionActiva === 'metodosPago' && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Métodos de Pago
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Selecciona un método de pago:
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant={selectedPaymentMethod === 'credit_card' ? 'contained' : 'outlined'}
                onClick={() => handlePaymentMethodChange('credit_card')}
              >
                Tarjeta de Crédito
              </Button>
              <Button
                variant={selectedPaymentMethod === 'paypal' ? 'contained' : 'outlined'}
                onClick={() => handlePaymentMethodChange('paypal')}
              >
                PayPal
              </Button>
              <Button
                variant={selectedPaymentMethod === 'stripe' ? 'contained' : 'outlined'}
                onClick={() => handlePaymentMethodChange('stripe')}
              >
                Stripe
              </Button>
            </Box>

            {selectedPaymentMethod === 'credit_card' && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Número de Tarjeta"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nombre en la Tarjeta"
                    name="cardName"
                    value={form.cardName}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="Fecha de Expiración"
                    name="expiryDate"
                    value={form.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={form.cvv}
                    onChange={handleInputChange}
                    type="password"
                    required
                  />
                </Grid>
              </Grid>
            )}

            {selectedPaymentMethod === 'paypal' && (
              <Typography variant="body1">
                Serás redirigido a PayPal para completar tu pago.
              </Typography>
            )}

            {selectedPaymentMethod === 'stripe' && (
              <Typography variant="body1">
                Serás redirigido a Stripe para completar tu pago.
              </Typography>
            )}
          </Paper>
        </Box>
      )}
      {/* 3. Agregar el componente Snackbar después del Container */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AppCarrito;