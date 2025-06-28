import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. ดึง Token จาก Header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // รูปแบบ "Bearer TOKEN"

  if (token == null) {
    // 2. ถ้าไม่มี Token ให้ส่ง 401 Unauthorized
    res.sendStatus(401);
    return 
  }

  // 3. ตรวจสอบความถูกต้องของ Token
  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err: any, user: any) => {
    if (err) {
      // 4. ถ้า Token ไม่ถูกต้อง (เช่น หมดอายุ) ให้ส่ง 403 Forbidden
      res.sendStatus(403);
      return 
    }

    // 5. ถ้า Token ถูกต้อง ให้แนบข้อมูล user ไปกับ Request แล้วไปต่อ
    // เราจะแก้ไข Type ของ Request ในขั้นตอนต่อไป
    req.user = user; 

    next(); // ไปยัง Route Handler ตัวถัดไป
  });
};


export const checkAdmin = (req : Request , res : Response, next : NextFunction) => {

  const user = req.user;

  if(user && user.roleId == 1){
    next();
  }
  else{
    res.status(403).json({message: 'Forbidden: Admin access required'});
    return;
  }

};