import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
import { GroupDegree, GroupForm, GroupSubject } from '@/interfaces/group';
import { groupDegreeList, groupSubjectList } from '@/providers/constants/groups';

interface GroupModalProps {
  open: boolean;
  handleClose: () => void;

  onSubmit: () => void;
  control: Control<GroupForm, any>;

  loading: boolean;

  cycles: RCycle[];
}

const GroupModal = ({ open, handleClose, onSubmit, control, loading, cycles }: GroupModalProps) => {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth keepMounted>
      <form onSubmit={onSubmit}>
        <DialogTitle>Añadir nuevo grupo</DialogTitle>

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
              name="degree"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <FormLabel>Grado escolar</FormLabel>
                    <RadioGroup {...field} row sx={{ justifyContent: 'space-around' }}>
                      {groupDegreeList.map((degree) => (
                        <FormControlLabel
                          key={degree.value}
                          control={<Radio />}
                          label={degree.name}
                          value={degree.value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="subject"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <FormLabel>Asignatura</FormLabel>
                    <RadioGroup {...field} row sx={{ justifyContent: 'space-around' }}>
                      {groupSubjectList.map((subject) => (
                        <FormControlLabel
                          key={subject.value}
                          control={<Radio />}
                          label={subject.name}
                          value={subject.value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {fieldState.error && <Alert severity="error">{fieldState.error.message}</Alert>}
                </>
              )}
            />

            <Controller
              name="cycleId"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Ciclo escolar</InputLabel>
                    <Select label="Ciclo escolar" {...field} fullWidth>
                      {cycles.map((cycle) => (
                        <MenuItem key={cycle._id} value={cycle._id}>
                          {cycle.name}
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

export default GroupModal;
