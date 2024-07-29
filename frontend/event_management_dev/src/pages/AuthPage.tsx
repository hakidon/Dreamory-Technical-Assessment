import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginForm from '../components/AuthForm/LoginForm';
import RegistrationForm from '../components/AuthForm/RegistrationForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
        {isLogin ? 'Login' : 'Register'}
      </Typography>
      {isLogin ? <LoginForm /> : <RegistrationForm />}
      <Button onClick={() => navigate('/')} variant="contained" color="error" fullWidth>
        Back to Main Page
      </Button>
      <Box mt={2}>
        <Button onClick={() => setIsLogin(!isLogin)} fullWidth>
          {isLogin ? 'Switch to Registration' : 'Switch to Login'}
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;
