import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { testConnection } from './config/database'; // <-- 1. Import เข้ามา
import authRoutes from './api/auth/auth.routes';
import lessonRoutes from './api/lessons/lesson.routes';
import { singleChallengeRouter } from '@/api/challenges/chalenges.routes';


// โหลด environment variables จากไฟล์ .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware พื้นฐาน
app.use(cors());
app.use(express.json());

//API Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/challenges', singleChallengeRouter);

// Route แรกของเรา
app.get('/api/v1', (req: Request, res: Response) => {
  res.send('Hello from Mech UBU EV Hub API! 👋');
});



// ฟังก์ชันสำหรับเริ่มการทำงานของเซิร์ฟเวอร์
const startServer = async () => {
  await testConnection(); // <-- 2. เรียกทดสอบการเชื่อมต่อก่อนเริ่มฟัง Request

  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
};

// เริ่มการทำงาน
startServer();