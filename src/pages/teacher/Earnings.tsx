import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Card,
  CardContent,
} from '@mui/material';
import { TeacherDashboard } from '../../types/teacher';
import { useAuth } from '../../context/AuthContext';

const Earnings: React.FC = () => {
  const { user } = useAuth();
  const [earnings, setEarnings] = useState<TeacherDashboard['earnings'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        // TODO: Implementar llamada a API
        const mockData: TeacherDashboard['earnings'] = {
          totalEarnings: 5000,
          platformFee: 1250, // 25%
          netEarnings: 3750,
          pendingPayments: 1000,
          paymentHistory: [
            {
              id: '1',
              amount: 1000,
              date: '2024-04-01',
              status: 'paid',
              courseId: 'course1',
            },
            {
              id: '2',
              amount: 1500,
              date: '2024-03-01',
              status: 'paid',
              courseId: 'course2',
            },
            {
              id: '3',
              amount: 1000,
              date: '2024-05-01',
              status: 'pending',
              courseId: 'course3',
            },
          ],
        };
        setEarnings(mockData);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Mis Ganancias
      </Typography>

      <Grid container spacing={3}>
        {/* Resumen de Ganancias */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ganancias Totales
              </Typography>
              <Typography variant="h4" color="primary">
                ${earnings?.totalEarnings.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Comisión de la Plataforma (25%)
              </Typography>
              <Typography variant="h4" color="error">
                ${earnings?.platformFee.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Ganancias Netas
              </Typography>
              <Typography variant="h4" color="success.main">
                ${earnings?.netEarnings.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Historial de Pagos */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Historial de Pagos
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Curso</TableCell>
                    <TableCell>Monto</TableCell>
                    <TableCell>Estado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {earnings?.paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.courseId}</TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          color={
                            payment.status === 'paid'
                              ? 'success'
                              : payment.status === 'pending'
                              ? 'warning'
                              : 'error'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Earnings; 