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
  
    // Redirigir a la página de pago con el total y los items
    navigate('/payment', { 
      state: { 
        totalAmount,
        items: estado.itemsCarrito.map(item => ({
          id: item.curso.id,
          title: item.curso.titulo,
          price: item.curso.precio,
          image: item.curso.imagen,
          description: item.curso.descripcion
        }))
      } 
    });
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

  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const validateField = (name: string, value: string) => {
    if (name === 'expiryDate') {
      const isValid = /^\d{2}\/\d{2}$/.test(value); // MM/YY format
      setErrors(prev => ({
        ...prev,
        expiryDate: isValid ? '' : 'El formato debe ser MM/YY',
      }));
    }

    if (name === 'cvv') {
      const isValid = /^\d{3,4}$/.test(value); // 3 or 4 digits
      setErrors(prev => ({
        ...prev,
        cvv: isValid ? '' : 'El CVV debe contener 3 o 4 dígitos',
      }));
    }

    if (name === 'cardNumber') {
      const isValid = /^\d{16}$/.test(value); // 16 digits for card number
      setErrors(prev => ({
        ...prev,
        cardNumber: isValid ? '' : 'El número de tarjeta debe contener 16 dígitos',
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Restrict input for specific fields
    if (name === 'expiryDate') {
      const numericValue = value.replace(/[^0-9/]/g, ''); // Allow only numbers and "/"
      if (numericValue.length <= 5) {
        validateField(name, numericValue);
        setForm(prevForm => ({
          ...prevForm,
          [name]: numericValue,
        }));
      }
      return;
    }

    if (name === 'cvv') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
      if (numericValue.length <= 4) {
        validateField(name, numericValue);
        setForm(prevForm => ({
          ...prevForm,
          [name]: numericValue,
        }));
      }
      return;
    }

    if (name === 'cardNumber') {
      const numericValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
      if (numericValue.length <= 16) {
        validateField(name, numericValue);
        setForm(prevForm => ({
          ...prevForm,
          [name]: numericValue,
        }));
      }
      return;
    }

    // For other fields
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'credit_card' | 'paypal' | 'stripe'>('credit_card'); // Add state for payment method

  const handlePaymentMethodChange = (method: 'credit_card' | 'paypal' | 'stripe') => {
    setSelectedPaymentMethod(method);
  };

  const [paypalForm, setPaypalForm] = useState({
    country: '',
    email: '',
    type: '',
    phone: '',
    csc: '', // Add the missing csc property
    cardNumber: '', // Add missing property
    expiryDate: '', // Add missing property
    postalCode: '', // Add missing property
  });

  // Update the type for PayPal errors to include cardNumber and expiryDate
  const [paypalErrors, setPaypalErrors] = useState({
    email: '',
    phone: '',
    csc: '', // Add the missing csc property
    cardNumber: '', // Add missing property
    expiryDate: '', // Add missing property
    postalCode: '', // Add missing property
  });

  const validatePaypalField = (name: string, value: string) => {
    if (name === 'email') {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Basic email format
      setPaypalErrors(prev => ({
        ...prev,
        email: isValid ? '' : 'El correo electrónico no es válido',
      }));
    }

    if (name === 'phone') {
      const isValid = /^\+\d{1,15}$/.test(value); // International phone format
      setPaypalErrors(prev => ({
        ...prev,
        phone: isValid ? '' : 'El número de teléfono debe incluir el código de país (e.g., +52)',
      }));
    }
  };

  const handlePaypalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validate the field
    validatePaypalField(name, value);

    setPaypalForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const countryCodes = {
    Mexico: '+52', // México
    UnitedStates: '+1',  // Estados Unidos
    Canada: '+1',  // Canadá
    Brazil: '+55', // Brasil
    Argentina: '+54', // Argentina
    Colombia: '+57', // Colombia
    Chile: '+56', // Chile
    Peru: '+51', // Perú
    Venezuela: '+58', // Venezuela
    CostaRica: '+506', // Costa Rica
    Panama: '+507', // Panamá
    Uruguay: '+598', // Uruguay
  };
  
  const [selectedCountry, setSelectedCountry] = useState<'Mexico' | 'UnitedStates' | 'Canada' | 'Brazil' | 'Argentina' | 'Colombia' | 'Chile' | 'Peru' | 'Venezuela' | 'CostaRica' | 'Panama' | 'Uruguay'>('Mexico'); // Default to México
  
  const handleCountryChange = (country: 'Mexico' | 'UnitedStates' | 'Canada' | 'Brazil' | 'Argentina' | 'Colombia' | 'Chile' | 'Peru' | 'Venezuela' | 'CostaRica' | 'Panama' | 'Uruguay') => {
    setSelectedCountry(country);
    setPaypalForm(prevForm => ({
      ...prevForm,
      phone: countryCodes[country], 
    }));
  };

  const handlePaypalPayment = () => {
    // Validate required fields
    const requiredFields = ['country', 'email', 'type', 'phone', 'csc']; // Include csc in validation
    let hasErrors = false;
  
    requiredFields.forEach((field) => {
      if (!paypalForm[field as keyof typeof paypalForm]) {
        setPaypalErrors((prev) => ({
          ...prev,
          [field]: `El campo ${field} es obligatorio`,
        }));
        hasErrors = true;
      }
    });
  
    if (hasErrors) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    // Simulate PayPal payment process
    alert('Procesando pago con PayPal...');
    console.log('PayPal Payment Details:', paypalForm);
  
    // Reset form after successful payment
    setPaypalForm({
      country: '',
      email: '',
      type: '',
      phone: '',
      csc: '', // Reset csc
      cardNumber: '', // Reset cardNumber
      expiryDate: '', // Reset expiryDate
      postalCode: '', // Reset postalCode
    });
    setSelectedCountry('Mexico'); // Reset to default country
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Tabs de navegación CARRITO COMPRAS SUSCRIPCIONES Y METODO DE PAGO*/}
      <Paper
        sx={{
          mb: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.default',
          boxShadow: shadows.sm,
          p: { xs: 2, sm: 0 }, // Add padding for mobile
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, // 2x2 grid on mobile, 4 columns on larger screens
            gap: 2,
            width: '100%',
          }}
        >
          <Button
            variant={seccionActiva === 'carrito' ? 'contained' : 'outlined'}
            onClick={() => setSeccionActiva('carrito')}
            startIcon={
              <StyledBadge badgeContent={estado.itemsCarrito.length} color="primary">
                <CartIcon />
              </StyledBadge>
            }
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              justifyContent: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Carrito
          </Button>
          <Button
            variant={seccionActiva === 'compras' ? 'contained' : 'outlined'}
            onClick={() => setSeccionActiva('compras')}
            startIcon={<HistoryIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              justifyContent: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Mis Compras
          </Button>
          <Button
            variant={seccionActiva === 'suscripciones' ? 'contained' : 'outlined'}
            onClick={() => setSeccionActiva('suscripciones')}
            startIcon={<SubscriptionsIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              justifyContent: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              
            }}
          >
            Suscripciones
          </Button>
          <Button
            variant={seccionActiva === 'metodosPago' ? 'contained' : 'outlined'}
            onClick={() => setSeccionActiva('metodosPago')}
            startIcon={<LockIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              justifyContent: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              
            }}
          >
            Métodos de Pago
          </Button>
        </Box>
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
                {/* Listado de items en el carrito */}
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
                        flexWrap: 'wrap', // Allow wrapping for smaller screens
                        backgroundColor: 'background.paper',
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          width: { xs: 80, sm: 100 }, // Adjust width for smaller screens
                          height: { xs: 50, sm: 60 },
                          borderRadius: 1,
                          objectFit: 'cover', // Ensure image fits nicely
                        }}
                        image={item.curso.imagen}
                        alt={item.curso.titulo}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="subtitle1"
                          noWrap
                          sx={{ maxWidth: '100%', fontWeight: 'bold' }} // Prevent overflow
                        >
                          {item.curso.titulo}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.curso.precio.toFixed(2)}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          minWidth: 80,
                          textAlign: 'right',
                          flex: '0 0 auto', // Prevent shrinking
                          fontWeight: 'bold',
                        }}
                      >
                        ${(item.curso.precio * item.cantidad).toFixed(2)}
                      </Typography>
                      <IconButton
                        color="error"
                        onClick={() => eliminarDelCarrito(item.curso.id)}
                         // Add margin-left to move it closer to the price
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>

                {/* Divider y total */}
                <Divider sx={{ my: 3 }} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mt: 2,
                    flexWrap: 'wrap', // Allow wrapping for smaller screens
                  }}
                >
                  <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                    <Typography variant="subtitle1" color="text.secondary">
                      Total ({estado.itemsCarrito.length}{' '}
                      {estado.itemsCarrito.length === 1 ? 'curso' : 'cursos'})
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
                    sx={{ width: { xs: '100%', sm: 'auto' } }} // Full width on mobile
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
                  Paypal
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
                    required
                    inputProps={{
                      maxLength: 19,
                      inputMode: 'numeric', // Ensure numeric input
                      pattern: '[0-9]*', // Restrict to numbers only
                    }}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      setPaypalForm((prevForm) => ({
                        ...prevForm,
                        cardNumber: numericValue, // Update the correct field
                      }));
                    }}
                    value={paypalForm.cardNumber} // Bind the value to the form state
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
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate || 'Formato: MM/YY'}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleInputChange}
                      type="password"
                      error={!!errors.cvv}
                      helperText={errors.cvv ||""}
                      required
                    />
                    
                  </Box>
                </Grid>
              </Grid>
            )}

            {selectedPaymentMethod === 'paypal' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Completa tu pago con PayPal
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="País/Región"
                      name="country"
                      value={selectedCountry}
                      onChange={(e) => handleCountryChange(e.target.value as 'Mexico' | 'UnitedStates' | 'Canada' | 'Brazil' | 'Argentina' | 'Colombia' | 'Chile' | 'Peru' | 'Venezuela' | 'CostaRica' | 'Panama' | 'Uruguay')}
                      select
                      SelectProps={{
                        native: true,
                      }}
                      required
                    >
                      {Object.keys(countryCodes).map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      name="email"
                      value={paypalForm.email}
                      onChange={handlePaypalInputChange}
                      error={!!paypalErrors.email}
                      helperText={paypalErrors.email || 'Formato: usuario@dominio.com'}
                      required
                    />
                  </Grid>
                    <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="No. de la Tarjeta"
                      name="cardNumber"
                      required
                      inputProps={{
                      maxLength: 19,
                      inputMode: 'numeric', // Ensure numeric input
                      pattern: '[0-9]*', // Restrict to numbers only
                      }}
                      onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      setPaypalForm((prevForm) => ({
                        ...prevForm,
                        cardNumber: numericValue, // Update the correct field
                      }));
                      }}
                      value={paypalForm.cardNumber} // Bind the value to the form state
                    />
                    </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Fecha de Vencimiento"
                      name="expiryDate"
                      required
                      inputProps={{
                        maxLength: 5,
                        inputMode: 'numeric', // Ensure numeric input
                        pattern: '[0-9/]*', // Restrict to numbers and "/"
                      }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9/]/g, ''); // Allow only numbers and "/"
                        setPaypalForm((prevForm) => ({
                          ...prevForm,
                          expiryDate: numericValue, // Update the correct field
                        }));
                      }}
                      value={paypalForm.expiryDate} // Bind the value to the form state
                    />
                  </Grid>
                    <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="CSC"
                      required
                      inputProps={{
                      maxLength: 4,
                      inputMode: 'numeric', // Ensure numeric input
                      pattern: '[0-9]*', // Restrict to numbers only
                      }}
                      onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      setPaypalForm((prevForm) => ({
                        ...prevForm,
                        csc: numericValue, // Update the correct field
                      }));
                      }}
                      value={paypalForm.csc || ''} // Bind the value to the form state
                    />
                    </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TextField
                        fullWidth
                        label="Número de Teléfono"
                        name="phone"
                        value={paypalForm.phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')} // Format as XXX-XXX-XXXX
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                          setPaypalForm((prevForm) => ({
                            ...prevForm,
                            phone: numericValue,
                          }));
                        }}
                        error={!!paypalErrors.phone}
                        helperText={paypalErrors.phone || 'Formato: 123-456-7890'}
                        placeholder="Ejemplo: 123-456-7890"
                        required
                      />
                      
                    </Box>
                  </Grid>

                  {/* Address Fields */}
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Dirección de la tarjeta
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nombres"
                      name="firstName"
                      required
                      helperText="Introduce tu(s) nombre(s)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Apellidos"
                      name="lastName"
                      required
                      helperText="Introduce tu(s) apellido(s)"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      name="address"
                      required
                      helperText="Introduce tu dirección completa"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Colonia"
                      name="colony"
                      required
                      helperText="Introduce tu colonia"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Ciudad"
                      name="city"
                      required
                      helperText="Introduce tu ciudad"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Estado"
                      name="state"
                      required
                      helperText="Introduce tu estado"
                    />
                  </Grid>
                    <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Código postal"
                      name="postalCode"
                      required
                      helperText="Formato: 12345"
                      inputProps={{
                      maxLength: 5,
                      inputMode: 'numeric', // Ensure numeric input
                      pattern: '[0-9]*', // Restrict to numbers only
                      }}
                      onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      setPaypalForm((prevForm) => ({
                        ...prevForm,
                        postalCode: numericValue,
                      }));
                      }}
                      value={paypalForm.postalCode || ''} // Bind the value to the form state
                    />
                    </Grid>
                </Grid>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Te enviaremos un mensaje de texto con un código de seguridad para confirmar este número.
                </Typography>
                
              </Box>
            )}

            {selectedPaymentMethod === 'stripe' && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Completa tu pago con Stripe
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      name="email"
                      value={paypalForm.email}
                      onChange={handlePaypalInputChange}
                      error={!!paypalErrors.email}
                      helperText={paypalErrors.email || ''}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                  Informacion de la tajeta
                </Typography>
                    <TextField
                      fullWidth
                      label="Número de Tarjeta"
                      name="cardNumber"
                      required
                      inputProps={{
                        maxLength: 19,
                        inputMode: 'numeric', // Ensure numeric input
                        pattern: '[0-9]*', // Restrict to numbers only
                      }}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                        setPaypalForm((prevForm) => ({
                          ...prevForm,
                          cardNumber: numericValue, // Update the correct field
                        }));
                      }}
                      value={paypalForm.cardNumber} // Bind the value to the form state
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
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate || 'Formato: MM/YY'}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                      fullWidth
                      label="CVC"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleInputChange}
                      type="password"
                      error={!!errors.cvv}
                      helperText={errors.cvv ||""}
                      required
                    />
                    
                  </Box>
                </Grid>
                </Grid>
                <Typography variant="h6" mt={3}gutterBottom>
                  País o Región
                </Typography>
                <Grid item xs={10} mt={2}>
                    <TextField
                    
                      fullWidth
                      label="País/Región"
                      name="country"
                      value={selectedCountry}
                      onChange={(e) => handleCountryChange(e.target.value as 'Mexico' | 'UnitedStates' | 'Canada' | 'Brazil' | 'Argentina' | 'Colombia' | 'Chile' | 'Peru' | 'Venezuela' | 'CostaRica' | 'Panama' | 'Uruguay')}
                      select
                      SelectProps={{
                        native: true,
                      }}
                      required
                    >
                      {Object.keys(countryCodes).map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                    <Grid item xs={12} mt={2}>
                    <TextField
                      fullWidth
                      label="Código postal"
                      name="postalCode"
                      required
                      helperText="Formato: 12345"
                      inputProps={{
                      maxLength: 5,
                      inputMode: 'numeric', // Ensure numeric input
                      pattern: '[0-9]*', // Restrict to numbers only
                      }}
                      onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                      setPaypalForm((prevForm) => ({
                        ...prevForm,
                        postalCode: numericValue,
                      }));
                      }}
                      value={paypalForm.postalCode || ''} // Bind the value to the form state
                    />
                    </Grid>
              </Box>
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