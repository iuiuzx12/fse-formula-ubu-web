// frontend/src/router/AppRouter.tsx

import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import { MainLayout } from '../components/layouts/MainLayout';
import DashboardPage from '../pages/DashboardPage'; // 1. Import เข้ามา
import LessonDetailPage from '../pages/LessonDetailPage';
import ChallengePage from '../pages/ChallengePage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />, // 2. เปลี่ยนตรงนี้
      },
      {
        path: 'lessons/:lessonId',
        element: <LessonDetailPage />,
      },
      {
        path: 'lessons/:lessonId/challenges/:challengeId',
        element: <ChallengePage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;