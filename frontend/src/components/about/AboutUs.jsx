import React from 'react';
import { Box, Typography, Avatar, Button, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


const AboutUs = () => {
  return (
    <Box className="dashboard-container" sx={{ padding: '2rem' }}>
      <Typography variant="h3" align="center" gutterBottom>About Us</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} container direction="column" alignItems="center">
          <Avatar 
            alt="Nath & Sons" 
            src="https://via.placeholder.com/150" // Replace with your image URL
            sx={{ width: 150, height: 150, marginBottom: '1rem' }} 
          />
          <Typography variant="h6">Nath & Sons</Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<InstagramIcon />} 
            href="https://www.instagram.com/nathandsons" // Replace with your Instagram URL
            target="_blank"
            sx={{ marginTop: '1rem' }}
          >
            Visit Instagram
          </Button>
          <Typography variant="body1" align="center" sx={{ marginTop: '1rem', maxWidth: '300px' }}>
            Welcome to Nath & Sons, your one-stop shop for all your clothing needs. Follow us on Instagram for the latest updates and collections.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} container direction="column" alignItems="center">
          <Typography variant="h6">Our Brands</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem' }}>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<YouTubeIcon />} 
              href="https://www.youtube.com/channel/nathandsons" // Replace with your YouTube URL
              target="_blank"
              sx={{ marginBottom: '1rem' }}
            >
              YouTube
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<InstagramIcon />} 
              href="https://www.instagram.com/nathandsons" // Replace with your Instagram URL
              target="_blank"
            >
              Instagram
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
