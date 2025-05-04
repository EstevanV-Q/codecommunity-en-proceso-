import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  Reply as ReplyIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { CourseInteraction } from '../../types/student';

interface CourseInteractionProps {
  courseId: string;
  interactions: CourseInteraction[];
  onAddInteraction: (interaction: Omit<CourseInteraction, 'id' | 'createdAt' | 'updatedAt' | 'likes'>) => Promise<void>;
}

const CourseInteractionComponent: React.FC<CourseInteractionProps> = ({
  courseId,
  interactions,
  onAddInteraction,
}) => {
  const [newInteraction, setNewInteraction] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [interactionType, setInteractionType] = useState<'comment' | 'question'>('comment');
  const [likedInteractions, setLikedInteractions] = useState<Set<string>>(new Set());

  const handleAddInteraction = async () => {
    if (!newInteraction.trim()) return;

    try {
      await onAddInteraction({
        courseId,
        type: interactionType,
        content: newInteraction,
        author: {
          id: 'current-user-id', // TODO: Obtener del contexto de autenticación
          name: 'Usuario Actual', // TODO: Obtener del contexto de autenticación
        },
        replies: [],
      });
      setNewInteraction('');
    } catch (error) {
      console.error('Error adding interaction:', error);
    }
  };

  const handleLike = (interactionId: string) => {
    setLikedInteractions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(interactionId)) {
        newSet.delete(interactionId);
      } else {
        newSet.add(interactionId);
      }
      return newSet;
    });
  };

  const renderInteraction = (interaction: CourseInteraction, level = 0) => {
    const isLiked = likedInteractions.has(interaction.id);
    const marginLeft = level * 2;

    return (
      <Box key={interaction.id} ml={marginLeft}>
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            <Box display="flex" alignItems="center">
              <Avatar src={interaction.author.avatar}>
                {interaction.author.name.charAt(0)}
              </Avatar>
              <Box ml={2}>
                <Typography variant="subtitle2">{interaction.author.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(interaction.createdAt).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={interaction.type === 'question' ? 'Pregunta' : 'Comentario'}
              size="small"
              color={interaction.type === 'question' ? 'primary' : 'default'}
            />
          </Box>

          <Typography variant="body1" sx={{ mt: 1, mb: 1 }}>
            {interaction.content}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              size="small"
              onClick={() => handleLike(interaction.id)}
              color={isLiked ? 'primary' : 'default'}
            >
              {isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            </IconButton>
            <Typography variant="caption">{interaction.likes}</Typography>
            <Button
              size="small"
              startIcon={<ReplyIcon />}
              onClick={() => setReplyTo(interaction.id)}
            >
              Responder
            </Button>
          </Box>

          {interaction.replies?.map((reply) => renderInteraction(reply, level + 1))}
        </Paper>
      </Box>
    );
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Interacciones
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <Button
            variant={interactionType === 'comment' ? 'contained' : 'outlined'}
            onClick={() => setInteractionType('comment')}
          >
            Comentario
          </Button>
          <Button
            variant={interactionType === 'question' ? 'contained' : 'outlined'}
            onClick={() => setInteractionType('question')}
          >
            Pregunta
          </Button>
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          placeholder={
            interactionType === 'question'
              ? 'Escribe tu pregunta...'
              : 'Escribe tu comentario...'
          }
          value={newInteraction}
          onChange={(e) => setNewInteraction(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddInteraction}
            disabled={!newInteraction.trim()}
          >
            Publicar
          </Button>
        </Box>
      </Paper>

      <List>
        {interactions.map((interaction) => renderInteraction(interaction))}
      </List>

      <Dialog
        open={!!replyTo}
        onClose={() => setReplyTo(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Responder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tu respuesta"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyTo(null)}>Cancelar</Button>
          <Button variant="contained" color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CourseInteractionComponent; 