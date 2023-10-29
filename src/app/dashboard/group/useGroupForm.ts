import { useCallback, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { bool, mixed, object, ObjectSchema, string } from 'yup';

import { GroupDegree, GroupForm, GroupSubject, IGroup } from '@/interfaces/group';
import { getCyclesActive } from '@/providers/rest/classManagement/cycle';
import { createGroup } from '@/providers/rest/classManagement/group';

const initialState: GroupForm = {
  name: '',
  subject: GroupSubject.MATH,
  degree: GroupDegree.FIRST,
  cycleId: '',
  active: true,
};

const validationSchema: ObjectSchema<GroupForm> = object({
  name: string().trim().required('El nombre es requerido'),
  subject: mixed<GroupSubject>()
    .oneOf(Object.values(GroupSubject))
    .required('La materia es requerida'),
  degree: mixed<GroupDegree>().oneOf(Object.values(GroupDegree)).required('El grado es requerido'),
  cycleId: string().trim().required('El ciclo es requerido'),
  active: bool().required(),
});

const useGroupForm = (refetch: () => void) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset } = useForm<GroupForm>({
    defaultValues: initialState,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  // ? ---------- QueryClient ----------

  const { isLoading, data } = useQuery({
    queryKey: ['activeCycles'],
    queryFn: getCyclesActive,
  });

  const mutation = useMutation({
    mutationKey: ['newGroup'],
    mutationFn: (data: IGroup) => createGroup(data),
  });

  // ? ---------- Actions ----------

  const handleOpenModal = useCallback(() => setOpen(true), []);

  const handleCloseModal = useCallback(() => {
    refetch();
    setOpen(false);
    reset(initialState);
  }, []);

  const onSubmit = useCallback(async (data: GroupForm) => {
    mutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('Grupo creado correctamente', { variant: 'success' });
        handleCloseModal();
      },
      onError: (error) => {
        console.error('Error: GroupForm', error);

        if (error instanceof HTTPError) {
          enqueueSnackbar(error.message, { variant: 'error' });
          return;
        }

        enqueueSnackbar('Ocurrió un error al crear el grupo, intenta mas tarde', {
          variant: 'error',
        });
      },
    });
  }, []);

  const handleSubmitForm = useCallback(handleSubmit(onSubmit), [onSubmit]);

  const loading = useMemo(() => mutation.isPending ?? isLoading, [mutation.isPending, isLoading]);
  const cycles = useMemo(() => data?.data ?? [], [data?.data]);

  return {
    control,
    onSubmit: handleSubmitForm,
    loading,
    cycles,

    open,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useGroupForm;
