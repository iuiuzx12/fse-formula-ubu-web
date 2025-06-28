// frontend/src/api/challenge.service.ts
import api from './axios';
import type { Challenge } from '../types/challenges.type';

export const getChallengesByLessonId = async (lessonId: string): Promise<Challenge[]> => {
  const response = await api.get<Challenge[]>(`/lessons/${lessonId}/challenges`);
  return response.data;
};

export const getChallengeById = async (challengeId: string): Promise<Challenge> => {
    const response = await api.get<Challenge>(`/challenges/${challengeId}`);
    return response.data;
};