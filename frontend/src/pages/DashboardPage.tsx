// frontend/src/pages/DashboardPage.tsx
import { useState, useEffect } from 'react';
import { getAllLessons } from '../api/lesson.service';
import type { Lesson } from '../types/lessons.type';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItemText,
  Paper,
  ListItemButton,
} from '@mui/material';

const DashboardPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const data = await getAllLessons();
        setLessons(data);
      } catch (err) {
        setError('Failed to fetch lessons. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Lessons
      </Typography>
      <Paper elevation={2}>
        <List>
          {lessons.map((lesson) => (
            <ListItemButton
              key={lesson.id}
              component={RouterLink}
              to={`/lessons/${lesson.id}`}
              divider
            >
              <ListItemText
                primary={lesson.title}
                secondary={lesson.description}
              />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default DashboardPage;