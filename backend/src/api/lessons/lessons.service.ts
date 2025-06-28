import pool from "@/config/database";
import { ResultSetHeader } from 'mysql2';

type lessonData = {
    title : string
    description? : string
    content_data : any
    display_order : number
    author_id : number
}

export const findAllLessons = async () => {
    const sql = 'SELECT id, title, description, display_order FROM lessons ORDER BY display_order ASC';
    const [lessons] = await pool.query(sql);
    return lessons;
}

export const createLessons = async (lessonData : lessonData) => {

    const { title, description, content_data, display_order, author_id } = lessonData;

    const sql = 'INSERT INTO lessons (title, description, content_data, display_order, author_id) VALUES (?, ?, ?, ?, ?)';
    const [result] = await pool.query(sql, [title, description, JSON.stringify(content_data), display_order, author_id]);
    return result;
}

export const updateLesson = async (id: number, lessonData: { title?: string; description?: string; content_data?: any; display_order?: number }) => {
  // สร้าง query แบบ dynamic เพื่ออัปเดตเฉพาะ field ที่ส่งมา
  const fields = [];
  const values = [];

  if (lessonData.title) {
    fields.push('title = ?');
    values.push(lessonData.title);
  }
  if (lessonData.description) {
    fields.push('description = ?');
    values.push(lessonData.description);
  }
  if (lessonData.content_data) {
    fields.push('content_data = ?');
    values.push(JSON.stringify(lessonData.content_data));
  }
  if (lessonData.display_order) {
    fields.push('display_order = ?');
    values.push(lessonData.display_order);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id); // เพิ่ม id เข้าไปใน array ตัวสุดท้ายสำหรับ WHERE clause

  const sql = `UPDATE lessons SET ${fields.join(', ')} WHERE id = ?`;
  const [result] = await pool.query<ResultSetHeader>(sql, values);
  return result;
};

// ลบบทเรียน
export const deleteLesson = async (id: number) => {
  const sql = 'DELETE FROM lessons WHERE id = ?';
  const [result] = await pool.query<ResultSetHeader>(sql, [id]);
  return result;
};