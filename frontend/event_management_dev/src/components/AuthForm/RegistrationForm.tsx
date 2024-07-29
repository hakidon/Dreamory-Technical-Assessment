import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, Box } from '@mui/material';
import { registerUser } from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormInputs>();

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    try {
      const response = await registerUser(data); 
      console.log(response);
  
      if (response) {
        alert("Register success!")
        window.location.reload(); 
      } else {
        alert('Login failed'); 
      }
    } catch (error) {
      console.error(error); 
      alert('Invalid credentials'); 
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email"
        {...register('email', { required: 'Email is required' })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        {...register('password', { required: 'Password is required' })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        {...register('confirmPassword', { required: 'Confirm Password is required' })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>
    </Box>
  );
};

export default RegistrationForm;
