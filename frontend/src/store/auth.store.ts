import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

// กำหนดหน้าตาของข้อมูล User ที่ได้จาก Token
interface UserPayload {
  userId: number;
  roleId: number;
}

// กำหนดหน้าตาของ State ทั้งหมดใน Store
interface AuthState {
  token: string | null;
  user: UserPayload | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// สร้าง Store ของเรา
export const useAuthStore = create<AuthState>()(
  // persist จะช่วยบันทึก state ลง local storage โดยอัตโนมัติ
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      // Action สำหรับ Login
      login: (token: string) => {
        try {
          // ถอดรหัส token เพื่อเอาข้อมูล user
          const decoded = jwtDecode<UserPayload>(token);
          set({ token, user: decoded, isAuthenticated: true });
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      },

      // Action สำหรับ Logout
      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage', // ชื่อ key ใน local storage
    }
  )
);