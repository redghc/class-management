'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import CycleModal from '@/components/CycleModal';
import StatusChip from '@/components/StatusChip';
import { ISODateToString } from '@/providers/helpers/dates';

import useCycle from './useCycle';
import useCycleForm from './useCycleForm';

const Cycle = () => {
  const {
    page,
    rowsPerPage,
    countCycles,

    handleChangePage,
    handleChangeRowsPerPage,

    status,
    error,
    data,

    handleToggleStatus,

    refetch,
  } = useCycle();

  const {
    open,
    formState,
    formError,

    handleCloseModal,
    handleOpenModal,

    handleChange,
    handleChangeDate,

    loading,
    onSubmit,
  } = useCycleForm(refetch);

  if (status === 'pending') return <Box>Cargando...</Box>;

  if (status === 'error') return <Box>Error: {error?.message}</Box>;

  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Ciclo escolar
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleOpenModal}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha inicio</TableCell>
              <TableCell align="center">Fecha fin</TableCell>
              <TableCell align="center">Estatus</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{ISODateToString(row.startDate)}</TableCell>
                <TableCell align="center">{ISODateToString(row.endDate)}</TableCell>
                <TableCell align="center">
                  <StatusChip status={row.active} />
                </TableCell>
                <TableCell align="center">
                  {/*
                  <IconButton>
                    <AddCircleIcon color="primary" />
                  </IconButton>
                  */}
                  <IconButton onClick={() => handleToggleStatus(row._id)}>
                    <ToggleOffIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={countCycles}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count, page }) =>
            `${from}-${to} de ${count} - Página ${page + 1}`
          }
        />
      </TableContainer>

      <CycleModal
        open={open}
        formError={formError}
        formState={formState}
        handleClose={handleCloseModal}
        handleChange={handleChange}
        handleChangeDate={handleChangeDate}
        onSubmit={onSubmit}
        loading={loading}
      />
    </>
  );
};

export default Cycle;
