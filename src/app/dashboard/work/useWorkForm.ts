import { useCallback, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { bool, date, object, ObjectSchema, string } from 'yup';

import { IWork, WorkForm } from '@/interfaces/work';
import { getGroupsActive } from '@/providers/rest/classManagement/group';
import { createWork } from '@/providers/rest/classManagement/work';

const initialState: WorkForm = {
  name: '',
  description: '',
  limitDate: null,
  groupId: '',
  active: true,
};

const validationSchema: ObjectSchema<WorkForm> = object({
  name: string().trim().required('El nombre es requerido'),
  description: string().trim().required('La descripción es requerida'),
  limitDate: date()
    .nullable()
    .required('La fecha límite es requerida')
    .min(DateTime.now(), 'La fecha límite debe ser mayor a la fecha actual'),
  groupId: string().trim().required('El grupo es requerido'),
  active: bool().required(),
});

const useWorkForm = (refetch: () => void) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset } = useForm<WorkForm>({
    defaultValues: initialState,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  // ? ---------- QueryClient ----------

  const { isLoading, data } = useQuery({
    queryKey: ['activeGroups'],
    queryFn: getGroupsActive,
  });

  const mutation = useMutation({
    mutationKey: ['newWork'],
    mutationFn: (data: IWork) => createWork(data),
  });

  // ? ---------- Actions ----------

  const handleOpenModal = useCallback(() => setOpen(true), []);

  const handleCloseModal = useCallback(() => {
    refetch();
    setOpen(false);
    reset(initialState);
  }, []);

  const onSubmit = useCallback(
    async (data: WorkForm) => {
      const newData: IWork = {
        ...data,
        limitDate: data.limitDate ? data.limitDate : undefined,
      };

      mutation.mutate(newData, {
        onSuccess: () => {
          enqueueSnackbar('Actividad creada correctamente', { variant: 'success' });
          handleCloseModal();
        },
        onError: (error) => {
          console.error('Error: WorkForm', error);

          if (error instanceof HTTPError) {
            enqueueSnackbar(error.message, { variant: 'error' });
            return;
          }

          enqueueSnackbar('Ocurrió un error al crear la actividad, intenta mas tarde', {
            variant: 'error',
          });
        },
      });
    },
    [mutation],
  );

  const handleSubmitForm = useCallback(handleSubmit(onSubmit), [onSubmit]);

  return {
    control,
    onSubmit: handleSubmitForm,
    loading: mutation.isPending ?? isLoading,
    groups: data?.data ?? [],

    open,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useWorkForm;
