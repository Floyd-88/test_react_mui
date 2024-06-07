import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Home Page
      </Typography>
      <Typography variant="body1" paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper mauris vel dolor
        rutrum lacinia. Fusce euismod turpis vel sapien vehicula, ut congue enim dapibus. Morbi
        euismod lorem eu arcu dapibus, id iaculis lectus luctus. Integer et justo in velit
        scelerisque hendrerit.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/devices">
        View Devices
      </Button>
    </Container>
  );
};

export default HomePage;
