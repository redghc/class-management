import { ChangeEvent, MouseEvent, useCallback, useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { getGroups, updateGroupStatus } from '@/providers/rest/classManagement/group';

const useGroup = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [countGroups, setCountGroups] = useState(1);

  // ? ---------- QueryClient ----------

  const { status, data, error, refetch } = useQuery({
    queryKey: ['groups', { page, rowsPerPage }],
    queryFn: () => getGroups(page, rowsPerPage),
  });

  const mutation = useMutation({
    mutationKey: ['group'],
    mutationFn: (params: { id: string; status: boolean }) =>
      updateGroupStatus(params.id, params.status),
  });

  // ? ---------- Effects ----------

  useEffect(() => {
    if (status === 'success') {
      setCountGroups(data.total);
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
      const group = data?.data.find((cycle) => cycle._id === id);

      if (group) {
        await mutation.mutateAsync({ id, status: !group.active });
        await refetch();
      }
    },
    [data],
  );

  return {
    page,
    rowsPerPage,
    countGroups,

    handleChangePage,
    handleChangeRowsPerPage,

    status,
    error,
    data: data?.data ?? [],

    handleToggleStatus,

    refetch,
  };
};

export default useGroup;
