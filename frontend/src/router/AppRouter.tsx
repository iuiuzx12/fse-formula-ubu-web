import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from './ProtectedRoute';

// สร้างหน้า Dashboard ชั่วคราว
const DashboardPage = () => <h1>Welcome to the Dashboard!</h1>;
// สร้างหน้า Layout หลักชั่วคราว
const RootLayout = () => <ProtectedRoute><DashboardPage /></ProtectedRoute>;

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;