'use client';

import Link from 'next/link';
import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import Logo from '@/components/Logo';

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
  height: '30rem',
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
  return (
    <MainContainer>
      <LoginContainer>
        <Logo />

        <Subtitle>Iniciar sesión</Subtitle>
        <Form>
          <TextField fullWidth placeholder="Usuario" id="username" />
          <TextField fullWidth placeholder="Contraseña" id="password" type="password" />
        </Form>
        <Button
          fullWidth
          variant="contained"
          size="large"
          LinkComponent={Link}
          href="/dashboard/home"
        >
          Iniciar sesión
        </Button>
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;
