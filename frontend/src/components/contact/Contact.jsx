import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Snackbar, IconButton } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CloseIcon from '@mui/icons-material/Close';


const Contact = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@nathandsons.com'; // Replace with your actual email
  };

  const handlePhoneClick = () => {
    const contactNumber = '+1 234 567 890'; // Replace with your actual contact number
    navigator.clipboard.writeText(contactNumber);
    setSnackbarMessage('Contact number copied to clipboard');
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box className="dashboard-container" sx={{ padding: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom>Contact Us</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }} 
            onClick={handleEmailClick}
          >
            <EmailIcon sx={{ fontSize: 50, marginBottom: '1rem' }} color="primary" />
            <Typography variant="h5">Email</Typography>
            <Typography variant="body1">contact@nathandsons.com</Typography> {/* Replace with your actual email */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ padding: '2rem', textAlign: 'center', cursor: 'pointer' }} 
            onClick={handlePhoneClick}
          >
            <PhoneIcon sx={{ fontSize: 50, marginBottom: '1rem' }} color="primary" />
            <Typography variant="h6">Contact Number</Typography>
            <Typography variant="body1">+1 234 567 890</Typography> {/* Replace with your actual contact number */}
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default Contact;
