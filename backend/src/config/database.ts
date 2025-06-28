import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // โหลดค่าจาก .env

// สร้าง Connection Pool เพื่อประสิทธิภาพที่ดีกว่าการสร้าง Connection ใหม่ทุกครั้ง
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ฟังก์ชันสำหรับทดสอบการเชื่อมต่อ
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully!');
    connection.release(); // คืน connection กลับสู่ pool
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    // ปิดโปรแกรมถ้าเชื่อมต่อ DB ไม่ได้ เพราะจะทำงานต่อไม่ได้
    process.exit(1);
  }
};

// Export pool เพื่อให้ส่วนอื่นๆ ของโปรแกรมนำไปใช้ query ข้อมูลได้
export default pool;