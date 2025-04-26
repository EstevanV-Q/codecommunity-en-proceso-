import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  Badge,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Search as SearchIcon,
  Mail as MailIcon,
  Group as GroupIcon,
  Announcement as AnnouncementIcon,
  Forum as ForumIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  type: 'chat' | 'announcement' | 'email';
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
  status: 'sent' | 'delivered' | 'read' | 'pending';
  recipients: Array<{
    id: string;
    name: string;
    type: 'student' | 'group' | 'course';
    status: 'pending' | 'sent' | 'delivered' | 'read';
  }>;
}

interface MessageFormData {
  content: string;
  type: 'chat' | 'announcement' | 'email';
  recipients: Array<{
    id: string;
    name: string;
    type: 'course' | 'group' | 'student';
  }>;
  subject?: string;
}

// Mock data
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'teacher1',
    senderName: 'Prof. Smith',
    content: 'Important announcement regarding next week\'s exam',
    timestamp: new Date().toISOString(),
    type: 'announcement',
    status: 'delivered',
    recipients: [{ id: 'course1', name: 'Web Development', type: 'course', status: 'sent' }],
  },
  {
    id: '2',
    senderId: 'student1',
    senderName: 'John Doe',
    content: 'Question about the assignment submission',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: 'chat',
    status: 'read',
    recipients: [{ id: 'teacher1', name: 'Prof. Smith', type: 'student', status: 'sent' }],
  },
  // ... más mensajes mock
];

const CommunicationHub: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'chat' | 'announcements' | 'email'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [newMessageForm, setNewMessageForm] = useState<MessageFormData>({
    content: '',
    type: 'chat',
    recipients: [],
    subject: ''
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const message: Message = {
      id: String(Date.now()),
      senderId: 'teacher1',
      senderName: 'Prof. Smith',
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'chat',
      status: 'sent',
      recipients: [{ id: selectedChat!, name: 'Student', type: 'student', status: 'pending' }],
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setLoading(false);
  };

  const handleNewMessageSubmit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const message: Message = {
      id: String(Date.now()),
      senderId: 'teacher1',
      senderName: 'Prof. Smith',
      content: newMessageForm.content,
      timestamp: new Date().toISOString(),
      type: newMessageForm.type as 'chat' | 'announcement' | 'email',
      status: 'sent',
      recipients: newMessageForm.recipients.map(r => ({
        id: r.id,
        name: r.name,
        type: r.type,
        status: 'pending'
      })),
      ...(newMessageForm.subject && { subject: newMessageForm.subject })
    };

    setMessages([...messages, message]);
    setOpenNewDialog(false);
    setNewMessageForm({
      content: '',
      type: 'chat',
      recipients: [],
      subject: ''
    });
    setLoading(false);
  };

  const getMessageIcon = (type: Message['type']) => {
    switch (type) {
      case 'announcement':
        return <AnnouncementIcon />;
      case 'email':
        return <MailIcon />;
      case 'chat':
        return <ForumIcon />;
      default:
        return <MailIcon />;
    }
  };

  const filteredMessages = messages.filter(message => {
    if (activeTab !== 'all' && message.type !== activeTab) return false;
    if (searchTerm && !message.content.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleRecipientsChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = event.target.value as string[];
    setNewMessageForm({
      ...newMessageForm,
      recipients: selectedIds.map(id => ({
        id: id.toString(),
        name: id.toString(),
        type: 'student'
      }))
    });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {/* Left sidebar - Contacts and chats list */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<SendIcon />}
                onClick={() => setOpenNewDialog(true)}
              >
                New Message
              </Button>
            </Box>

            <Box sx={{ p: 1, borderBottom: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
              <Chip
                label="All"
                icon={<MailIcon />}
                onClick={() => setActiveTab('all')}
                color={activeTab === 'all' ? 'primary' : 'default'}
              />
              <Chip
                label="Chats"
                icon={<ForumIcon />}
                onClick={() => setActiveTab('chat')}
                color={activeTab === 'chat' ? 'primary' : 'default'}
              />
              <Chip
                label="Announcements"
                icon={<AnnouncementIcon />}
                onClick={() => setActiveTab('announcements')}
                color={activeTab === 'announcements' ? 'primary' : 'default'}
              />
            </Box>

            <List sx={{ flexGrow: 1, overflow: 'auto' }}>
              {filteredMessages.map((message) => (
                <React.Fragment key={message.id}>
                  <ListItem
                    button
                    selected={selectedChat === message.id}
                    onClick={() => setSelectedChat(message.id)}
                  >
                    <ListItemAvatar>
                      <Badge
                        color="success"
                        variant="dot"
                        invisible={message.status === 'read'}
                      >
                        <Avatar>
                          {message.senderName.charAt(0)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message.senderName}
                      secondary={
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          noWrap
                        >
                          {message.content}
                        </Typography>
                      }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                      {getMessageIcon(message.type)}
                    </Box>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right side - Chat/Message view */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            {selectedChat ? (
              <>
                {/* Chat header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar>
                      {messages.find(m => m.id === selectedChat)?.senderName.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {messages.find(m => m.id === selectedChat)?.senderName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {messages.find(m => m.id === selectedChat)?.type}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Chat messages */}
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {messages
                    .filter(m => m.id === selectedChat || 
                              (m.senderId === messages.find(sm => sm.id === selectedChat)?.senderId))
                    .map((message) => (
                      <Box
                        key={message.id}
                        sx={{
                          display: 'flex',
                          justifyContent: message.senderId === 'teacher1' ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '70%',
                            bgcolor: message.senderId === 'teacher1' ? 'primary.main' : 'grey.200',
                            color: message.senderId === 'teacher1' ? 'white' : 'inherit',
                            borderRadius: 2,
                            p: 2,
                          }}
                        >
                          <Typography variant="body1">
                            {message.content}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.8 }}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Chat input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton>
                      <AttachFileIcon />
                    </IconButton>
                    <TextField
                      fullWidth
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={handleSendMessage}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MailIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="textSecondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* New Message Dialog */}
      <Dialog open={openNewDialog} onClose={() => setOpenNewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newMessageForm.type}
                label="Type"
                onChange={(e) => setNewMessageForm({ ...newMessageForm, type: e.target.value as Message['type'] })}
              >
                <MenuItem value="chat">Chat</MenuItem>
                <MenuItem value="announcement">Announcement</MenuItem>
                <MenuItem value="email">Email</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Recipients</InputLabel>
              <Select
                multiple
                value={newMessageForm.recipients.map(r => r.id)}
                onChange={handleRecipientsChange}
                input={<OutlinedInput label="Recipients" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                <MenuItem value="course1">Web Development Course</MenuItem>
                <MenuItem value="group1">Group A</MenuItem>
                <MenuItem value="student1">John Doe</MenuItem>
                <MenuItem value="student2">Jane Smith</MenuItem>
              </Select>
            </FormControl>

            {newMessageForm.type === 'email' && (
              <TextField
                label="Subject"
                fullWidth
                value={newMessageForm.subject || ''}
                onChange={(e) => setNewMessageForm({ 
                  ...newMessageForm, 
                  subject: e.target.value 
                })}
              />
            )}

            <TextField
              label="Message"
              fullWidth
              multiline
              rows={4}
              value={newMessageForm.content}
              onChange={(e) => setNewMessageForm({ ...newMessageForm, content: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleNewMessageSubmit}
            disabled={!newMessageForm.content || newMessageForm.recipients.length === 0}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {loading && <LinearProgress />}
    </Box>
  );
};

export default CommunicationHub; 