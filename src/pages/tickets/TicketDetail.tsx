import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Chip, Box, Button, TextField, IconButton, Stack, Avatar, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';

const TicketDetail: React.FC = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [ticket, setTicket] = useState<any>(null);
  const [chat, setChat] = useState<Array<{from: string, text: string, date: string}>>([]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('studentTickets') || '[]');
    const found = tickets.find((t: any) => t.id === ticketId);
    setTicket(found);
  }, [ticketId]);

  useEffect(() => {
    if (!ticketId) return;
    const chatData = JSON.parse(localStorage.getItem(`ticketChat_${ticketId}`) || '[]');
    setChat(chatData);
  }, [ticketId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const saveChat = (newChat: any) => {
    if (!ticketId) return;
    localStorage.setItem(`ticketChat_${ticketId}`, JSON.stringify(newChat));
  };

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { from: 'user', text: message, date: new Date().toISOString() };
    const newChat = [...chat, newMsg];
    setChat(newChat);
    saveChat(newChat);
    setMessage('');
    setTimeout(() => {
      const supportMsg = { from: 'support', text: '¡Gracias por tu mensaje! Un agente te responderá pronto.', date: new Date().toISOString() };
      const updatedChat = [...newChat, supportMsg];
      setChat(updatedChat);
      saveChat(updatedChat);
    }, 1200);
  };

  if (!ticket) {
    return <Typography color="error">Ticket no encontrado</Typography>;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#1e1e1e', py: { xs: 2, md: 6 } }}>
      <Paper sx={{ p: { xs: 2, md: 5 }, maxWidth: 900, mx: 'auto', mt: 4, borderRadius: 5, boxShadow: 8, bgcolor: '#23272F', color: 'white' }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: 'white' }}>{ticket.title}</Typography>
        <Typography variant="body1" gutterBottom sx={{ fontSize: 18, color: '#D1D5DB' }}>{ticket.description}</Typography>
        <Box mb={2}>
          <Chip label={ticket.priority} sx={{ mr: 2, fontSize: 16, height: 32, bgcolor: '#2D3748', color: '#FBBF24', fontWeight: 'bold' }} />
          <Chip label={ticket.status === 'open' ? 'Abierto' : ticket.status} sx={{ fontSize: 16, height: 32, bgcolor: ticket.status === 'open' ? '#059669' : '#374151', color: 'white', fontWeight: 'bold' }} />
        </Box>
        <Typography variant="body2" sx={{ mb: 3, color: '#A0AEC0' }}>
          Fecha de creación: {new Date(ticket.date).toLocaleString()}
        </Typography>
        <Button variant="outlined" onClick={() => navigate('/student/dashboard')} sx={{ mb: 4, borderColor: '#4F46E5', color: '#A5B4FC', fontWeight: 'bold', '&:hover': { borderColor: '#6366F1', color: '#6366F1' } }}>
          Volver al Dashboard
        </Button>
        {/* Chat de soporte */}
        <Box mt={6}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2, color: '#A5B4FC' }}>Chat con Soporte</Typography>
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 1, md: 4 },
              minHeight: 400,
              maxHeight: 600,
              overflowY: 'auto',
              mb: 2,
              background: 'linear-gradient(135deg, #23272F 0%, #181A20 100%)',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              border: '1.5px solid #2D3748',
            }}
          >
            <Stack spacing={4}>
              {chat.length === 0 && <Typography color="#A0AEC0">No hay mensajes aún.</Typography>}
              {chat.map((msg, idx) => (
                <Box
                  key={idx}
                  display="flex"
                  flexDirection={msg.from === 'user' ? 'row-reverse' : 'row'}
                  alignItems="flex-end"
                  gap={2}
                  sx={{
                    animation: 'fadeIn 0.5s',
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(20px)' },
                      to: { opacity: 1, transform: 'none' }
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: msg.from === 'user' ? '#6366F1' : '#059669',
                      width: 56,
                      height: 56,
                      fontSize: 32,
                      boxShadow: msg.from === 'user' ? '0 2px 8px #6366F1' : '0 2px 8px #059669',
                    }}
                  >
                    {msg.from === 'user' ? <PersonIcon fontSize="inherit" /> : <SupportAgentIcon fontSize="inherit" />}
                  </Avatar>
                  <Box
                    sx={{
                      bgcolor: msg.from === 'user' ? '#3730A3' : '#1E293B',
                      color: 'white',
                      px: 3,
                      py: 2,
                      borderRadius: 4,
                      maxWidth: { xs: '80%', md: '60%' },
                      boxShadow: msg.from === 'user'
                        ? '0 2px 12px #6366F1AA'
                        : '0 2px 8px #05966944',
                      fontSize: 18,
                      borderTopRightRadius: msg.from === 'user' ? 0 : 16,
                      borderTopLeftRadius: msg.from === 'user' ? 16 : 0,
                    }}
                  >
                    <Typography variant="body1" sx={{ wordBreak: 'break-word', fontSize: 18 }}>{msg.text}</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', textAlign: msg.from === 'user' ? 'right' : 'left', mt: 1, color: '#CBD5E1' }}>
                      {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={chatEndRef} />
            </Stack>
          </Paper>
          <Box display="flex" gap={2} alignItems="center" sx={{ mt: 2 }}>
            <TextField
              fullWidth
              size="medium"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              sx={{
                borderRadius: 4,
                background: '#23272F',
                boxShadow: '0 2px 8px #23272F44',
                fontSize: 18,
                color: 'white',
                input: { color: 'white' },
                '& .MuiInputBase-input': { color: 'white' },
                '& fieldset': { borderColor: '#4F46E5' },
                '&:hover fieldset': { borderColor: '#6366F1' },
                '&.Mui-focused fieldset': { borderColor: '#6366F1' },
              }}
              inputProps={{ style: { fontSize: 18, padding: 16, color: 'white' } }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={!message.trim()}
              sx={{
                bgcolor: '#6366F1',
                color: 'white',
                width: 60,
                height: 60,
                borderRadius: 3,
                '&:hover': { bgcolor: '#4F46E5' },
                boxShadow: '0 2px 8px #6366F1AA',
                fontSize: 32
              }}
            >
              <SendIcon sx={{ fontSize: 36 }} />
            </IconButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TicketDetail;