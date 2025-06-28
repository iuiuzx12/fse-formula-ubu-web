// frontend/src/api/axios.ts

import axios from 'axios';

// สร้าง Instance ของ Axios พร้อมตั้งค่าพื้นฐาน
const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1', // baseURL ของ Backend ของเรา
});

// นี่คือหัวใจสำคัญ: Interceptor จะทำงาน "ก่อน" ที่ทุก Request จะถูกส่งออกไป
api.interceptors.request.use(
  (config) => {
    // 1. ดึงข้อมูล State จาก Local Storage โดยตรง
    const authStorage = localStorage.getItem('auth-storage');

    if (authStorage) {
      // 2. แปลง String JSON กลับมาเป็น Object
      const authState = JSON.parse(authStorage);
      const token = authState.state?.token;

      // 3. ถ้ามี Token, ให้แนบไปกับ Header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config; // ส่ง config ที่แก้ไขแล้วไปทำงานต่อ
  },
  (error) => {
    // จัดการกับ Error ของ Request
    return Promise.reject(error);
  }
);

export default api;