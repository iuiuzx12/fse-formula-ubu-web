// frontend/src/pages/LessonDetailPage.tsx

import { useState, useEffect } from 'react';
import { getLessonById } from '../api/lesson.service';
import { getChallengesByLessonId } from '../api/challenge.service';
import type { Lesson } from '../types/lessons.type';
import type { Challenge } from '../types/challenges.type';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';

const LessonDetailPage = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        // ดึงข้อมูลทั้งสองอย่างพร้อมกัน
        const [lessonData, challengesData] = await Promise.all([
          getLessonById(lessonId),
          getChallengesByLessonId(lessonId),
        ]);
        setLesson(lessonData);
        setChallenges(challengesData);
      } catch (err) {
        setError('Failed to fetch lesson details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!lesson) {
    return <Alert severity="info">Lesson not found.</Alert>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {lesson.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {lesson.description}
      </Typography>
      
      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Challenges
      </Typography>
      {challenges.length > 0 ? (
         <List>
            {challenges.map((challenge) => (
                <ListItem key={challenge.id} secondaryAction={
                    <Button 
                      component={RouterLink} 
                      to={`/lessons/${lessonId}/challenges/${challenge.id}`}
                      variant="contained" 
                      size="small"
                    >Start</Button>
                }>
                    <ListItemText primary={challenge.title} secondary={challenge.description}/>
                </ListItem>
            ))}
         </List>
      ) : (
        <Typography variant="body2">No challenges available for this lesson yet.</Typography>
      )}
    </Paper>
  );
};

export default LessonDetailPage;