import pool from '@/config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';


type challengeData = {
    lesson_id: number
    title: string
    description?: string
    initial_simulator_state?: any
    success_conditions?: any
}

// ดึงโจทย์ทั้งหมดในบทเรียน
export const findChallengesByLessonId = async (lessonId: number) => {
  const sql = 'SELECT * FROM challenges WHERE lesson_id = ?';
  const [challenges] = await pool.query<RowDataPacket[]>(sql, [lessonId]);
  return challenges;
};

// สร้างโจทย์ใหม่
export const createChallenge = async (challengeData: challengeData) => {
  const { lesson_id, title, description, initial_simulator_state, success_conditions } = challengeData;
  const sql = 'INSERT INTO challenges (lesson_id, title, description, initial_simulator_state, success_conditions) VALUES (?, ?, ?, ?, ?)';
  const [result] = await pool.query<ResultSetHeader>(sql, [lesson_id, title, description, JSON.stringify(initial_simulator_state), JSON.stringify(success_conditions)]);
  return result;
};

// อัปเดตโจทย์
export const updateChallenge = async (id: number, challengeData: challengeData) => {
  const fields = Object.keys(challengeData).map(key => `${key} = ?`).join(', ');
  if (!fields) throw new Error('No fields to update');

  const values = Object.values(challengeData).map(value => typeof value === 'object' ? JSON.stringify(value) : value);
  values.push(id);

  const sql = `UPDATE challenges SET ${fields} WHERE id = ?`;
  const [result] = await pool.query<ResultSetHeader>(sql, values);
  return result;
};

// ลบโจทย์
export const deleteChallenge = async (id: number) => {
  const sql = 'DELETE FROM challenges WHERE id = ?';
  const [result] = await pool.query<ResultSetHeader>(sql, [id]);
  return result;
};

export const findChallengeById = async (id: number) => {
    const sql = 'SELECT * FROM challenges WHERE id = ?';
    const [rows] = await pool.query<RowDataPacket[]>(sql, [id]);
    return rows[0] || null;
};