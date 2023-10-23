'use client';

import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getCycles, updateCycleStatus } from '@/providers/rest/classManagement/cycle';

const useCycle = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countElements, setCountElements] = useState(1);

  // ? ---------- QueryClient ----------

  const {
    status: statusCycle,
    data: dataCycle,
    error: errorCycle,
    refetch: refetchCycle,
  } = useQuery({
    queryKey: ['cycles', { page, rowsPerPage }],
    queryFn: () => getCycles(page, rowsPerPage),
  });

  const mutation = useMutation({
    mutationKey: ['cycle'],
    mutationFn: (params: { id: string; status: boolean }) =>
      updateCycleStatus(params.id, params.status),
  });

  // ? ---------- Effects ----------

  useEffect(() => {
    if (statusCycle === 'success') {
      setCountElements(dataCycle.total);
    }
  }, [statusCycle, dataCycle?.total]);

  // ? ---------- Actions ----------

  const handleChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    [],
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    [],
  );

  const handleToggleStatus = useCallback(
    async (id: string) => {
      const cycle = dataCycle?.data.find((cycle) => cycle._id === id);

      if (cycle) {
        await mutation.mutateAsync({ id, status: !cycle.active });
        await refetchCycle();
      }
    },
    [dataCycle],
  );

  return {
    page,
    rowsPerPage,
    countElements,
    handleChangePage,
    handleChangeRowsPerPage,

    status: statusCycle,
    error: errorCycle,
    data: dataCycle?.data ?? [],

    handleToggleStatus,

    refetchCycle,
  };
};

export default useCycle;
