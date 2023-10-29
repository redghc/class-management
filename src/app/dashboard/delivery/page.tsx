'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
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

import DeliveryModal from '@/components/DeliveryModal';
import StatusChip from '@/components/StatusChip';

import useDelivery from './useDelivery';
import useDeliveryForm from './useDeliveryForm';

const Delivery = () => {
  const {
    page,
    rowsPerPage,
    countDeliveries,

    handleChangePage,
    handleChangeRowsPerPage,

    status,
    error,
    data,

    refetch,
  } = useDelivery();

  const {
    control,
    onSubmit,
    loading,

    works,
    students,

    open,
    handleOpenModal,
    handleCloseModal,
  } = useDeliveryForm(refetch);

  if (status === 'pending') return <Box>Cargando...</Box>;

  if (status === 'error') return <Box>Error: {error?.message}</Box>;

  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Actividades
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
              <TableCell align="center">Estudiante</TableCell>
              <TableCell align="center">Actividad</TableCell>
              <TableCell align="center">Calificación</TableCell>
              <TableCell align="center">Estatus</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">
                  {row.studentId.firstName} {row.studentId.lastName}
                </TableCell>
                <TableCell align="center">{row.workId.name}</TableCell>
                <TableCell align="center">{row.score}</TableCell>
                <TableCell align="center">
                  <StatusChip status={row.active} />
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={countDeliveries}
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

      <DeliveryModal
        control={control}
        handleClose={handleCloseModal}
        loading={loading}
        onSubmit={onSubmit}
        open={open}
        works={works}
        students={students}
      />
    </>
  );
};

export default Delivery;
