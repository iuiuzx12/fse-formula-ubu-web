// frontend/src/types/lesson.types.ts
export interface Lesson {
  id: number;
  title: string;
  description: string | null;
  display_order: number;
}