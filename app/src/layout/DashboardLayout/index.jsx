import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function DashboardLayout() {

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
