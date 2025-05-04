import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckCircleIcon,
  AccountBalanceWallet as StripeIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface PaymentForm {
  amount: number;
  currency: string;
  paymentMethod: string;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  email: string;
}

const initialForm: PaymentForm = {
  amount: 0,
  currency: 'CRC',
  paymentMethod: 'credit_card',
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  email: '',
};

const MakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount, items } = location.state || { totalAmount: 0, items: [] };

  const [activeStep, setActiveStep] = useState(0);
  const [form, setForm] = useState<PaymentForm>({
    ...initialForm,
    amount: totalAmount
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aquí iría la lógica para procesar el pago
      // Después de procesar el pago exitosamente:
      
      // Limpiar el carrito
      localStorage.removeItem('cart');
      
      setSuccess(true);
      setForm(initialForm);
      setActiveStep(0);
      
      // Redirigir a la página de éxito o al dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setError('Error al procesar el pago');
    }
  };

  const steps = ['Resumen de Compra', 'Método de Pago', 'Confirmación'];

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Resumen de la Compra
            </Typography>
            <List>
              {items.map((item: CartItem) => (
                <ListItem key={item.id}>
                  <ListItemIcon>
                    <CartIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={`$${item.price}`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                  label="Total"
                name="amount"
                value={totalAmount}
                type="number"
                inputProps={{ readOnly: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Moneda</InputLabel>
                <Select
                  name="currency"
                  value={form.currency}
                    onChange={(e) => setForm(prev => ({ ...prev, currency: e.target.value }))}
                  label="Moneda"
                >
                  <MenuItem value="USD">USD - Dólar Estadounidense</MenuItem>
                  <MenuItem value="EUR">EUR - Euro</MenuItem>
                  <MenuItem value="CRC">CRC - Colón Costarricense</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                type="email"
                required
              />
            </Grid>
          </Grid>
          </Box>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Método de Pago</InputLabel>
                <Select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={(e) => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  fullWidth
                >
                  <MenuItem value="credit_card">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CreditCardIcon /> Tarjeta de Crédito
                    </Box>
                  </MenuItem>
                  <MenuItem value="stripe">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StripeIcon /> Stripe
                    </Box>
                  </MenuItem>
                  <MenuItem value="paypal">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PaymentIcon /> PayPal
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {form.paymentMethod === 'credit_card' && (
              <>
                <Grid item xs={12}>
                  <TextField
                  fullWidth
                  label="Número de Tarjeta"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                    setForm(prev => ({
                    ...prev,
                    cardNumber: numericValue,
                    }));
                  }}
                    inputProps={{ maxLength: 16 }}
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
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9/]/g, '');
                      if (numericValue.length <= 5) {
                        setForm(prev => ({
                          ...prev,
                          expiryDate: numericValue,
                        }));
                      }
                    }}
                    placeholder="MM/YY"
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={form.cvv}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/[^0-9]/g, '');
                      if (numericValue.length <= 4) {
                        setForm(prev => ({
                          ...prev,
                          cvv: numericValue,
                        }));
                      }
                    }}
                    type="password"
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    required
                  />
                </Grid>
              </>
            )}
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumen del Pago
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Monto:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${totalAmount} {form.currency}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Método de Pago:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {form.paymentMethod === 'credit_card' && 'Tarjeta de Crédito'}
                      {form.paymentMethod === 'stripe' && 'Stripe'}
                      {form.paymentMethod === 'paypal' && 'PayPal'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color="text.secondary">Email:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{form.email}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Realizar Pago
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <form onSubmit={handleSubmit}>
            {renderStepContent(activeStep)}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              {activeStep > 0 && (
                <Button onClick={() => setActiveStep(prev => prev - 1)} sx={{ mr: 1 }}>
                  Atrás
                </Button>
              )}
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<CheckCircleIcon />}
                >
                  Confirmar Pago
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => setActiveStep(prev => prev + 1)}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </form>
        </Paper>

        {error && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar
            open={true}
            autoHideDuration={6000}
            onClose={() => setSuccess(false)}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              Pago procesado exitosamente
            </Alert>
          </Snackbar>
        )}
      </Box>
    </Container>
  );
};

export default MakePayment;