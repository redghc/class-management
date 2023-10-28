import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { logout } from '@/providers/rest/classManagement/user';

const useLayout = () => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  // ? ---------- QueryClient ----------

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
  });

  // ? ---------- Actions ----------

  const handleLogout = useCallback(() => {
    mutation.mutate(void 0, {
      onSuccess: () => {
        enqueueSnackbar('Sesión cerrada correctamente', { variant: 'success' });
        router.push('/');
      },
      onError: () => {
        enqueueSnackbar('Sesión cerrada correctamente', { variant: 'success' });
        router.push('/');
      },
    });
  }, [mutation, router]);

  const toggleDrawer = () => setOpen(!open);

  return {
    open,
    toggleDrawer,
    handleLogout,

    loading: mutation.isPending,
  };
};

export default useLayout;
