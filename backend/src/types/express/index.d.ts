// บอก TypeScript ว่าเราจะทำการ "ขยาย" Type ที่มีอยู่แล้ว
declare namespace Express {
   interface Request {
    user?: { // ข้อมูลที่เราถอดรหัสได้จาก JWT
      userId: number;
      roleId: number;
    }

  }
}