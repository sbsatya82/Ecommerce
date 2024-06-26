
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', display: 'flex', justifyContent:'center', alignItems:'center', height: '100vh' }}>
      <Box>
        <Typography variant="h1" component="div" gutterBottom>
          404
        </Typography>
        <Typography variant="h4" component="div" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" component="div" gutterBottom style={{fontSize: '1.5rem'}}>
          Sorry, the page you are looking for does not exist. Please check the URL or go back to the homepage.
        </Typography>
        <Box mt={4}>
          <Button variant="contained" color="success" component={Link} to="/"style={{fontSize: '1.5rem'}}>
            Go to Homepage
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default NotFound;
