import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { RDelivery } from '@/interfaces/delivery';
import { RStudent } from '@/interfaces/student';

import QRScanner from '../QRScanner';
import useRegisterDeliveryModal from './useRegisterDeliveryModal';

interface RegisterDeliveryModalProps {
  open: boolean;
  handleClose: () => void;
}

interface StudentProps {
  groupId: string;
  student?: RStudent;
  delivery?: RDelivery;
}

const RegisterDeliveryModal = ({ open, handleClose }: RegisterDeliveryModalProps) => {
  const {
    control,
    onSubmit,
    onSuccessScanQR,
    loading,

    groupId,
    works,
    student,
    delivery,
  } = useRegisterDeliveryModal(handleClose);

  console.log('groupId', groupId);
  console.log('student', student);
  console.log('delivery', delivery);

  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <form onSubmit={onSubmit}>
        <DialogTitle>Registrar entrega</DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="workId"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Actividad</InputLabel>
                    <Select label="Actividad" {...field} fullWidth>
                      {works.map((work) => (
                        <MenuItem key={work._id} value={work._id}>
                          {work.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <QRScanner success={onSuccessScanQR} open={open} />

            <StudentData student={student} delivery={delivery} groupId={groupId} />

            <Controller
              name="score"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Calificación" {...field} fullWidth type="number" />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RegisterDeliveryModal;

const StudentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  minHeight: theme.spacing(15),
  textAlign: 'center',
}));

const StudentData = ({ student, delivery, groupId }: StudentProps) => {
  if (!student) {
    return <StudentContainer>Escanea el código QR del estudiante.</StudentContainer>;
  }

  if (delivery) {
    return (
      <StudentContainer>
        <Typography>El estudiante ya ha registrado esta actividad.</Typography>
        Nombre: {student.firstName} {student.lastName}
        Calificación: {delivery.score}
      </StudentContainer>
    );
  }

  const userExistInGroup = student.groupIds.find((group) => group._id === groupId);

  if (!userExistInGroup) {
    return (
      <StudentContainer>
        <Typography>
          El estudiante no pertenece a esta clase. Selecciona la actividad correcta.
        </Typography>
        Nombre: {student.firstName} {student.lastName}
      </StudentContainer>
    );
  }

  return (
    <StudentContainer>
      Nombre: {student.firstName} {student.lastName}
    </StudentContainer>
  );
};
