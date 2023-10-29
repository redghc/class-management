import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

import { DeliveryForm } from '@/interfaces/delivery';
import { RStudent } from '@/interfaces/student';
import { RWork } from '@/interfaces/work';

interface DeliveryModalProps {
  open: boolean;
  handleClose: () => void;

  onSubmit: () => void;
  control: Control<DeliveryForm, any>;

  loading: boolean;

  works: RWork[];
  students: RStudent[];
}

const DeliveryModal = ({
  open,
  handleClose,
  onSubmit,
  control,
  loading,
  works,
  students,
}: DeliveryModalProps) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <form onSubmit={onSubmit}>
        <DialogTitle>Añadir nuevo estudiante</DialogTitle>

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

            <Controller
              name="studentId"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Estudiante</InputLabel>
                    <Select label="Estudiante" {...field} fullWidth>
                      {students.map((student) => (
                        <MenuItem key={student._id} value={student._id}>
                          {student.firstName} {student.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

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

export default DeliveryModal;
