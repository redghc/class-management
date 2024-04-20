'use client';

import { useCallback, useState } from 'react';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import RegisterDeliveryModal from '@/components/RegisterDeliveryModal';

const WelcomePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background:
    'rgb(255, 255, 255) linear-gradient(135deg, rgba(104, 205, 249, 0.2), rgba(7, 141, 238, 0.2))',
  color: theme.palette.primary.dark,
  minHeight: theme.spacing(15),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const BigButtonPaperized = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  minHeight: theme.spacing(15),
  fontSize: theme.spacing(3),

  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(7.5),
    minHeight: theme.spacing(20),
  },
}));

const AddIcon = styled(AddCircleIcon)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(3),
  fontSize: '3rem',

  [theme.breakpoints.down('sm')]: {
    top: theme.spacing(3),
    left: 'initial',
  },
}));

const Home = () => {
  const [openDelivery, setOpenDelivery] = useState(false);
  const [openAttendance, setOpenAttendance] = useState(false);

  const handleOpenDeliveryModal = useCallback(() => setOpenDelivery(true), []);
  const handleCloseDeliveryModal = useCallback(() => setOpenDelivery(false), []);

  const handleOpenAttendanceModal = useCallback(() => setOpenAttendance(true), []);
  const handleCloseAttendanceModal = useCallback(() => setOpenAttendance(false), []);

  return (
    <>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <WelcomePaper>
            <Box fontWeight="bold">
              <Typography variant="h5" component="h1">
                Bienvenido de vuelta 👋
              </Typography>
            </Box>

            <Box>Selecciona una opción para comenzar</Box>
          </WelcomePaper>
        </Grid>

        <Grid xs={12} sm={6}>
          <BigButtonPaperized
            variant="contained"
            fullWidth
            size="large"
            onClick={handleOpenDeliveryModal}
          >
            <AddIcon />
            Registrar actividad
          </BigButtonPaperized>
        </Grid>

        <Grid xs={12} sm={6}>
          <BigButtonPaperized
            variant="contained"
            fullWidth
            size="large"
            onClick={handleOpenAttendanceModal}
          >
            <AddIcon />
            Registrar Asistencia
          </BigButtonPaperized>
        </Grid>
      </Grid>

      <RegisterDeliveryModal open={openDelivery} handleClose={handleCloseDeliveryModal} />
    </>
  );
};

export default Home;
