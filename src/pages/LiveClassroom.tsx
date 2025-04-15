import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  TextField,
  Tooltip,
  Badge,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Slider,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  PeopleAlt as PeopleAltIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  Settings as SettingsIcon,
  Close as CloseIcon,
  Send as SendIcon,
  VolumeDown,
  VolumeUp,
  ExitToApp,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

interface Participant {
  id: string;
  name: string;
  role: 'teacher' | 'student';
  isMuted: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
}

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'emoji';
}

export type { Participant, Message };

const DRAWER_WIDTH = 340;
const EMOJIS = ['👍', '👏', '❤️', '😊', '🎉', '🤔', '✋', '👋', '✅','👌'];

const LiveClassroom: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [volume, setVolume] = useState(100);
  const navigate = useNavigate();

  // Simular usuario actual como profesor (en producción esto vendría de un contexto de autenticación)
  const currentUser: Participant = {
    id: '1',
    name: 'Profesor',
    role: 'teacher',
    isMuted: false,
    isVideoEnabled: true,
    isScreenSharing: false,
  };

  useEffect(() => {
    // Simular carga de participantes
    const mockParticipants: Participant[] = [
      currentUser,
      {
        id: '2',
        name: 'Estudiante 1',
        role: 'student',
        isMuted: true,
        isVideoEnabled: false,
        isScreenSharing: false,
      },
      {
        id: '3',
        name: 'Estudiante 2',
        role: 'student',
        isMuted: true,
        isVideoEnabled: false,
        isScreenSharing: false,
      },
    ];
    setParticipants(mockParticipants);
  }, []);

  const handleToggleMute = (participantId?: string) => {
    if (participantId) {
      setParticipants(participants.map(p =>
        p.id === participantId ? { ...p, isMuted: !p.isMuted } : p
      ));
    } else {
      setIsMuted(!isMuted);
    }
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const handleToggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        userId: currentUser.id,
        userName: currentUser.name,
        text: newMessage,
        timestamp: new Date(),
        type: 'text',
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleSendEmoji = (emoji: string) => {
    const message: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      text: emoji,
      timestamp: new Date(),
      type: 'emoji',
    };
    setMessages([...messages, message]);
    setEmojiAnchorEl(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleExitClass = () => {
    navigate('/courses'); // O la ruta que prefieras
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      {/* Barra superior */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Clase en vivo
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: 200 }}>
              <VolumeDown />
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                aria-labelledby="volume-slider"
                sx={{ mx: 2 }}
              />
              <VolumeUp />
            </Box>
            <IconButton color="inherit" onClick={() => setSettingsOpen(true)}>
              <SettingsIcon />
            </IconButton>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={handleExitClass}
            >
              Salir de clases
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Área principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: 8,
          height: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Área de video/pantalla compartida */}
        <Paper
          sx={{
            flexGrow: 1,
            bgcolor: 'grey.900',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography color="white">
            {isScreenSharing ? 'Pantalla compartida' : 'Área de video'}
          </Typography>
        </Paper>

        {/* Controles flotantes */}
        <Paper
          sx={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            p: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: 2,
            boxShadow: 3,
            zIndex: 1,
          }}
        >
          <IconButton onClick={() => handleToggleMute()} sx={{ color: 'white' }}>
            {isMuted ? <MicOffIcon /> : <MicIcon />}
          </IconButton>
          <IconButton onClick={handleToggleVideo} sx={{ color: 'white' }}>
            {isVideoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
          {currentUser.role === 'teacher' && (
            <IconButton onClick={handleToggleScreenShare} sx={{ color: 'white' }}>
              {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>
          )}
          <IconButton onClick={() => setIsChatOpen(!isChatOpen)} sx={{ color: 'white' }}>
            <Badge badgeContent={messages.length} color="error">
              <ChatIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={() => setIsParticipantsOpen(!isParticipantsOpen)} sx={{ color: 'white' }}>
            <PeopleAltIcon />
          </IconButton>
        </Paper>
      </Box>

      {/* Panel lateral (Chat y Participantes) */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Lista de participantes */}
          {isParticipantsOpen && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Participantes ({participants.length})
              </Typography>
              <List>
                {participants.map((participant) => (
                  <ListItem
                    key={participant.id}
                    secondaryAction={
                      currentUser.role === 'teacher' && participant.role === 'student' && (
                        <IconButton onClick={() => handleToggleMute(participant.id)}>
                          {participant.isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                        </IconButton>
                      )
                    }
                  >
                    <ListItemIcon>
                      <Avatar>{participant.name[0]}</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={participant.name}
                      secondary={participant.role === 'teacher' ? 'Profesor' : 'Estudiante'}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>
          )}

          {/* Chat */}
          {isChatOpen && (
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ p: 2 }}>
                Chat
              </Typography>
              <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: message.userId === currentUser.id ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {message.userName}
                    </Typography>
                    <Paper
                      sx={{
                        p: 1,
                        bgcolor: message.userId === currentUser.id ? 'primary.main' : 'grey.100',
                        color: message.userId === currentUser.id ? 'white' : 'inherit',
                        maxWidth: '70%',
                      }}
                    >
                      <Typography>
                        {message.type === 'emoji' ? (
                          <span style={{ fontSize: '2em' }}>{message.text}</span>
                        ) : (
                          message.text
                        )}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
              <Box sx={{ 
                p: 1, 
                bgcolor: 'background.paper',
                borderTop: 'none'
              }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Escribe un mensaje..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  InputProps={{
                    endAdornment: (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" onClick={(e) => setEmojiAnchorEl(e.currentTarget)}>
                          <EmojiEmotionsIcon />
                        </IconButton>
                        <IconButton size="small" color="primary" onClick={handleSendMessage}>
                          <SendIcon />
                        </IconButton>
                      </Box>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Menú de emojis */}
      <Menu
        anchorEl={emojiAnchorEl}
        open={Boolean(emojiAnchorEl)}
        onClose={() => setEmojiAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Grid container spacing={1} sx={{ p: 1 }}>
          {EMOJIS.map((emoji) => (
            <Grid item key={emoji}>
              <IconButton 
                onClick={() => handleSendEmoji(emoji)}
                size="small"
              >
                <Typography fontSize="1.5rem">{emoji}</Typography>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Menu>

      {/* Diálogo de configuración */}
      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Configuración
          <IconButton
            onClick={() => setSettingsOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Dispositivos de audio y video
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Micrófono</InputLabel>
            <Select value="" label="Micrófono">
              <MenuItem value="default">Micrófono predeterminado</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Cámara</InputLabel>
            <Select value="" label="Cámara">
              <MenuItem value="default">Cámara predeterminada</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Altavoces</InputLabel>
            <Select value="" label="Altavoces">
              <MenuItem value="default">Altavoces predeterminados</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSettingsOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LiveClassroom; 