import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Control, Controller } from 'react-hook-form';

import { RCycle } from '@/interfaces/cycle';
import { GroupForm, RGroup } from '@/interfaces/group';
import { StudentForm } from '@/interfaces/student';
import { groupDegreeList, groupSubjectList } from '@/providers/constants/groups';

interface StudentsModalProps {
  open: boolean;
  handleClose: () => void;

  onSubmit: () => void;
  control: Control<StudentForm, any>;

  loading: boolean;

  groups: RGroup[];
}

const StudentsModal = ({
  open,
  handleClose,
  onSubmit,
  control,
  loading,
  groups,
}: StudentsModalProps) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <form onSubmit={onSubmit}>
        <DialogTitle>Añadir nuevo estudiante</DialogTitle>

        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Primer nombre" {...field} fullWidth />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="secondName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Segundo nombre" {...field} fullWidth />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Primer apellido" {...field} fullWidth />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="secondLastName"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <TextField label="Segundo apellido" {...field} fullWidth />
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="groupIds"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Grupos</InputLabel>
                    <Select
                      label="Grupos"
                      {...field}
                      fullWidth
                      multiple
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={groups.find((group) => group._id === value)?.name ?? value}
                            />
                          ))}
                        </Box>
                      )}
                    >
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

export default StudentsModal;
