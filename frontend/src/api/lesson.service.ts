// frontend/src/api/lesson.service.ts
import api from './axios';
import type { Lesson } from '../types/lessons.type';

export const getAllLessons = async (): Promise<Lesson[]> => {
  const response = await api.get<Lesson[]>('/lessons');
  return response.data;
};

export const getLessonById = async (id: string): Promise<Lesson> => {
    const response = await api.get<Lesson>(`/lessons/${id}`);
    return response.data;
};