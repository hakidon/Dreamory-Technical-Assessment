import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';
import { loginUser } from '../../api/authApi';
import Cookies from 'js-cookie';

interface LoginFormInputs {
  email: string;
  password: string; 
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async data => {
    try {
      const response = await loginUser(data);
      console.log(response)
      if (response) {
        Cookies.set('jwtToken', response.token, { expires: 1 });
        navigate('/admin-dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <Typography variant="h5" component="h1" gutterBottom>
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        {...register('email', { 
          required: 'Email is required', 
          pattern: { 
            value: /^\S+@\S+$/i, 
            message: 'Invalid email address' 
          } 
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
