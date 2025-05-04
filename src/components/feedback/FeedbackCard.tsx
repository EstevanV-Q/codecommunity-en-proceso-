import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Avatar,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface FeedbackCardProps {
  id: string;
  courseName: string;
  rating: number;
  comment: string;
  studentName: string;
  studentAvatar?: string;
  date: Date;
  tags?: string[];
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  courseName,
  rating,
  comment,
  studentName,
  studentAvatar,
  date,
  tags,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" component="div">
            {courseName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {format(date, "d 'de' MMMM, yyyy", { locale: es })}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar src={studentAvatar} alt={studentName}>
            {studentName.charAt(0)}
          </Avatar>
          <Typography variant="subtitle1">{studentName}</Typography>
        </Box>

        <Box mb={2}>
          <Rating value={rating} readOnly precision={0.5} />
        </Box>

        <Typography variant="body1" paragraph>
          {comment}
        </Typography>

        {tags && tags.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap">
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackCard; 