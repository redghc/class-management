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
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller } from 'react-hook-form';

import { RGroup } from '@/interfaces/group';
import { WorkForm } from '@/interfaces/work';
import { DateTimeToJSDate, JSDateToDateTime } from '@/providers/helpers/dates';

interface WorkModalProps {
  open: boolean;
  handleClose: () => void;

  onSubmit: () => void;
  control: Control<WorkForm, any>;

  loading: boolean;

  groups: RGroup[];
}

const WorkModal = ({ open, handleClose, onSubmit, control, loading, groups }: WorkModalProps) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <form onSubmit={onSubmit}>
        <DialogTitle>Añadir nueva actividad</DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Nombre" {...field} fullWidth />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Descripción" {...field} fullWidth />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="limitDate"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <DatePicker
                    label="Fecha límite"
                    sx={{ width: '100%' }}
                    disabled={field.disabled}
                    onChange={(v) =>
                      field.onChange({ target: { value: DateTimeToJSDate(v), name: field.name } })
                    }
                    ref={field.ref}
                    value={JSDateToDateTime(field.value)}
                  />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="groupId"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Grupo</InputLabel>
                    <Select label="Grupo" {...field} fullWidth>
                      {groups.map((group) => (
                        <MenuItem key={group._id} value={group._id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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

export default WorkModal;
