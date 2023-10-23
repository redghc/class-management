import Chip from '@mui/material/Chip';

interface StatusChipProps {
  status: boolean;
}

const StatusChip = ({ status }: StatusChipProps) => {
  if (status) {
    return <Chip label="Activo" color="success" />;
  }

  return <Chip label="Inactivo" color="error" />;
};

export default StatusChip;
