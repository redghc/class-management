import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { updateStudentStatus } from '@/providers/rest/classManagement/student';
import { getWorks, updateWorkStatus } from '@/providers/rest/classManagement/work';

const useWork = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countWorks, setCountWorks] = useState(1);

  // ? ---------- QueryClient ----------

  const { status, data, error, refetch } = useQuery({
    queryKey: ['work', { page, rowsPerPage }],
    queryFn: () => getWorks(page, rowsPerPage),
  });

  const mutation = useMutation({
    mutationKey: ['work'],
    mutationFn: (params: { id: string; status: boolean }) =>
      updateWorkStatus(params.id, params.status),
  });

  // ? ---------- Effects ----------

  useEffect(() => {
    if (status === 'success') {
      setCountWorks(data.total);
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

  const handleToggleStatus = useCallback(
    async (id: string) => {
      const work = data?.data.find((cycle) => cycle._id === id);

      if (work) {
        await mutation.mutateAsync({ id, status: !work.active });
        await refetch();
      }
    },
    [data],
  );

  return {
    page,
    rowsPerPage,
    countWorks,

    handleChangePage,
    handleChangeRowsPerPage,

    status,
    error,
    data: data?.data ?? [],

    handleToggleStatus,

    refetch,
  };
};

export default useWork;
