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

import GroupModal from '@/components/GroupModal';
import StatusChip from '@/components/StatusChip';

import useGroup from './useGroup';
import useGroupForm from './useGroupForm';

const Group = () => {
  const {
    page,
    rowsPerPage,
    countGroups,

    handleChangePage,
    handleChangeRowsPerPage,

    status,
    error,
    data,

    handleToggleStatus,

    refetch,
  } = useGroup();

  const {
    control,
    onSubmit,
    loading,

    open,
    handleOpenModal,
    handleCloseModal,

    cycles,
  } = useGroupForm(refetch);

  if (status === 'pending') return <Box>Cargando...</Box>;

  if (status === 'error') return <Box>Error: {error?.message}</Box>;

  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" gutterBottom>
          Grupos
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
              <TableCell align="center">Grado escolar</TableCell>
              <TableCell align="center">Asignatura</TableCell>
              <TableCell align="center">Ciclo</TableCell>
              <TableCell align="center">Estatus</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.degree}</TableCell>
                <TableCell align="center">{row.subject}</TableCell>
                <TableCell align="center">{row.cycleId.name}</TableCell>
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
          count={countGroups}
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

      <GroupModal
        control={control}
        handleClose={handleCloseModal}
        loading={loading}
        onSubmit={onSubmit}
        open={open}
        cycles={cycles}
      />
    </>
  );
};

export default Group;
