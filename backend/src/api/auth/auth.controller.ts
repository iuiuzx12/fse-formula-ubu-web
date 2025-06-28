import { RequestHandler } from 'express';
import * as authService from './auth.service';

export const register: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      // ใช้ res.status(...).json(...) เพื่อส่งการตอบกลับและจบการทำงาน
      // แต่ "ไม่ต้อง" มีคำว่า return ข้างหน้า
      res.status(400).json({ message: 'Username and password are required' });
      return; // <-- ใช้ return เปล่าๆ เพื่อหยุดการทำงานฟังก์ชันพอ
    }

    await authService.createNewUser(username, password);

    res.status(201).json({ message: 'User created successfully' });

  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ message: 'Username already exists' });
    } else {
      console.error('Register Error:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required' });
      return;
    }

    // เรียก service เพื่อทำการ login และรับ token กลับมา
    const token = await authService.loginUser(username, password);

    res.status(200).json({ message: 'Login successful', token: token });

  } catch (error: any) {
    // จัดการกับ Error ที่ service โยนมา (Invalid credentials)
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getProfile: RequestHandler = (req, res) => {
  // ข้อมูล user ถูกแนบมาจาก authenticateToken middleware แล้ว
  if (!req.user) {
    res.status(401).json({ message: 'User not authenticated' });
    return ;
  }

  // ในชีวิตจริง เราอาจจะนำ userId ไป query ข้อมูลเพิ่มเติมจาก DB
  // แต่ตอนนี้เราจะส่งข้อมูลจาก Token กลับไปก่อน
  res.status(200).json({
    message: 'Profile retrieved successfully',
    user: req.user
  });
};

