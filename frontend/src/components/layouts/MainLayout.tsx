// frontend/src/components/layouts/MainLayout.tsx

import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useAuthStore } from '../../store/auth.store';

export const MainLayout = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            FSE Knowledge Hub
          </Typography>
          <Box>
            <Button sx={{ color: '#fff' }} onClick={logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Toolbar />
        {/* เนื้อหาของแต่ละหน้าจะถูกแสดงผลตรงนี้ */}
        <Outlet />
      </Box>
    </Box>
  );
};