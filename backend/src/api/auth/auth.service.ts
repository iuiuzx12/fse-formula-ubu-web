import pool from '../../config/database';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';

export const createNewUser = async (username: string, password: string) => {
  // 1. เข้ารหัสรหัสผ่าน (Hashing)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 2. กำหนด role_id เป็น 'Member' (id=2) ตามที่เราสร้างไว้
  const defaultRoleId = 2;

  // 3. บันทึกข้อมูลลง Database
  const sql = 'INSERT INTO users (username, password_hash, role_id) VALUES (?, ?, ?)';
  const [result] = await pool.query(sql, [username, hashedPassword, defaultRoleId]);

  return result;
};

export const loginUser = async (username : string, password : string) => {
    
    const findUserSql = 'SELECT id, username, password_hash, role_id FROM users WHERE username = ?';
    const [rows] = await pool.query<RowDataPacket[]>(findUserSql, [username]);

    if (rows.length == 0){
        throw new Error('Invalid credentials');
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch) {
        throw new Error('Invalid credentials'); // ใช้ข้อความเดียวกัน
    }

    // 3. สร้าง JWT Token
    const payload = {
        userId: user.id,
        roleId: user.role_id
    };

    const secret = process.env.JWT_SECRET || 'default_secret'; // ใช้ Secret จาก .env
    const token = jwt.sign(payload, secret, { expiresIn: '8h' }); // Token มีอายุ 8 ชั่วโมง

    return token;
}