// frontend/src/pages/ChallengePage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { getChallengeById } from '../api/challenge.service';
import type { Challenge } from '../types/challenges.type';
import { Box, Typography, Breadcrumbs, Link, Grid, Paper, CircularProgress, Alert } from '@mui/material';

const ChallengePage = () => {
  const { lessonId, challengeId } = useParams<{ lessonId: string; challengeId: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!challengeId) return;

    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const data = await getChallengeById(challengeId);
        setChallenge(data);
      } catch (err) {
        setError('Failed to load challenge data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [challengeId]);

  const renderContent = () => {
    if (loading) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }
    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }
    if (!challenge) {
      return <Alert severity="info">Challenge not found.</Alert>;
    }
    return (
      <Grid container spacing={2} sx={{ height: 'calc(100vh - 120px)' }}>
        {/* Column 1: Instructions */}
        <Grid  size = {{xs : 12 , md : 4}}>
          <Paper sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
            <Typography variant="h5" gutterBottom>{challenge.title}</Typography>
            <Typography variant="body1">{challenge.description}</Typography>
          </Paper>
        </Grid>

        {/* Column 2: Blockly Workspace */}
        <Grid size = {{xs : 12 , md : 5}}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">[พื้นที่สำหรับ Blockly Workspace]</Typography>
          </Paper>
        </Grid>

        {/* Column 3: Simulator */}
        <Grid size = {{xs : 12 , md : 3}}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">[พื้นที่สำหรับ Simulator]</Typography>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link component={RouterLink} underline="hover" color="inherit" to="/">Dashboard</Link>
        <Link component={RouterLink} underline="hover" color="inherit" to={`/lessons/${lessonId}`}>Lesson {lessonId}</Link>
        <Typography color="text.primary">Challenge {challengeId}</Typography>
      </Breadcrumbs>
      {renderContent()}
    </Box>
  );
};

export default ChallengePage;