// frontend/src/types/challenge.types.ts
export interface Challenge {
  id: number;
  lesson_id: number;
  title: string;
  description: string | null;
  // เราจะเพิ่ม field อื่นๆ ที่นี่ในอนาคต
}