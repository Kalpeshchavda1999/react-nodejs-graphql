import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
    
  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
  },[])
  
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  );
}
