// src/components/admin/AdminLayout.jsx
import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import './AdminLayout.css';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const AdminLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;