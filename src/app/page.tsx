'use client';

import React from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import Logo from '@/components/Logo';

import useLogin from './useLogin';

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
}));

const LoginContainer = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  width: '30rem',
  minHeight: '30rem',
  gap: '2rem',
});

const Subtitle = styled('h2')({
  fontWeight: 500,
  fontSize: '1.5rem',
  margin: 0,
});

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem',
});

const Login = () => {
  const { control, loading, onSubmit } = useLogin();

  return (
    <MainContainer>
      <LoginContainer>
        <Logo />

        <Subtitle>Iniciar sesión</Subtitle>
        <Form onSubmit={onSubmit}>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <TextField fullWidth placeholder="Usuario" {...field} />
                {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
              </>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <>
                <TextField fullWidth placeholder="Contraseña" {...field} type="password" />
                {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
              </>
            )}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            disabled={loading}
          >
            Iniciar sesión
          </Button>
        </Form>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
