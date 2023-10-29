import { useCallback, useEffect, useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { bool, number, object, ObjectSchema, string } from 'yup';

import { DeliveryForm } from '@/interfaces/delivery';
import { createDelivery } from '@/providers/rest/classManagement/delivery';
import {
  getActiveStudentsByGroup,
  getActiveStudentsByGroupWithoutWork,
} from '@/providers/rest/classManagement/student';
import { getWorksActive } from '@/providers/rest/classManagement/work';

const initialState: DeliveryForm = {
  workId: '',
  studentId: '',
  score: 0,
  active: true,
};

const validationSchema: ObjectSchema<DeliveryForm> = object({
  workId: string().trim().required('La actividad es requerida'),
  studentId: string().trim().required('El estudiante es requerido'),
  score: number().min(0).max(100).required('La nota es requerida'),
  active: bool().required(),
});

const useDeliveryForm = (refetch: () => void) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset, watch, setValue } = useForm<DeliveryForm>({
    defaultValues: initialState,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const { workId } = watch();

  // ? ---------- QueryClient ----------

  const queryWorks = useQuery({
    queryKey: ['activeWorks'],
    queryFn: () => getWorksActive(false),
  });

  const works = useMemo(() => queryWorks.data?.data ?? [], [queryWorks.data?.data]);

  const groupId = useMemo(
    () => works.find((work) => work._id === workId)?.groupId?._id ?? '',
    [works, workId],
  );

  const queryStudents = useQuery({
    queryKey: ['activeStudents', { groupId }],
    queryFn: () => getActiveStudentsByGroupWithoutWork(groupId, workId),
    enabled: groupId !== '',
  });

  const students = useMemo(() => queryStudents.data?.data ?? [], [queryStudents.data?.data]);

  const mutation = useMutation({
    mutationKey: ['newDelivery'],
    mutationFn: createDelivery,
  });

  // ? ---------- Effects ----------

  // On workId change reset studentId
  useEffect(() => {
    setValue('studentId', '');
  }, [workId]);

  // ? ---------- Actions ----------

  const handleOpenModal = useCallback(() => setOpen(true), []);

  const handleCloseModal = useCallback(() => {
    refetch();
    setOpen(false);
    reset(initialState);
  }, []);

  const onSubmit = useCallback(async (data: DeliveryForm) => {
    mutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('Entrega creada correctamente', { variant: 'success' });
        handleCloseModal();
      },
      onError: (error: Error | HTTPError) => {
        console.error('Error: DeliveryForm', error);
        enqueueSnackbar('Error al crear la entrega', { variant: 'error' });
      },
    });
  }, []);

  const handleSubmitForm = useCallback(handleSubmit(onSubmit), [onSubmit]);

  const loading = useMemo(
    () => mutation.isPending ?? queryWorks.isLoading ?? queryStudents.isLoading,
    [mutation.isPending, queryWorks.isLoading],
  );

  return {
    control,
    onSubmit: handleSubmitForm,
    loading,

    works,
    students,

    open,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useDeliveryForm;
