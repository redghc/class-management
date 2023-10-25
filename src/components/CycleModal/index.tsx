import { ChangeEventHandler } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';

import { CycleForm } from '@/interfaces/cycle';

interface CycleModalProps {
  open: boolean;
  formState: CycleForm;
  formError: string;

  handleClose: () => void;

  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  handleChangeDate: (date: DateTime | null, field: string) => void;

  onSubmit: () => void;
  loading: boolean;
}

const CycleModal = ({
  open,
  handleClose,
  handleChange,
  handleChangeDate,
  formState,
  formError,
  onSubmit,
  loading,
}: CycleModalProps) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <form>
        <DialogTitle>Añadir nuevo ciclo escolar</DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre"
              name="name"
              onChange={handleChange}
              value={formState.name}
              fullWidth
            />

            <DatePicker
              label="Fecha inicial"
              value={formState.startDate}
              onChange={(v) => handleChangeDate(v, 'startDate')}
              sx={{ width: '100%' }}
            />

            <DatePicker
              label="Fecha final"
              value={formState.endDate}
              onChange={(v) => handleChangeDate(v, 'endDate')}
              sx={{ width: '100%' }}
            />

            {formError !== '' && <Alert severity="error">{formError}</Alert>}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={loading}>
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CycleModal;
