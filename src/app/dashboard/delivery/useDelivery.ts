import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getDeliveries } from '@/providers/rest/classManagement/delivery';

const useDelivery = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countDeliveries, setCountDeliveries] = useState(1);

  // ? ---------- QueryClient ----------

  const { status, data, error, refetch } = useQuery({
    queryKey: ['delivery', { page, rowsPerPage }],
    queryFn: () => getDeliveries(page, rowsPerPage),
  });

  // ? ---------- Effects ----------

  useEffect(() => {
    if (status === 'success') {
      setCountDeliveries(data.total);
    }
  }, [status, data?.total]);

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

  return {
    page,
    rowsPerPage,
    countDeliveries,

    handleChangePage,
    handleChangeRowsPerPage,

    status,
    error,
    data: data?.data ?? [],

    refetch,
  };
};

export default useDelivery;
