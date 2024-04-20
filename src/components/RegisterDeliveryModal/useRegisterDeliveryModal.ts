import { useCallback, useEffect, useMemo } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { bool, number, object, ObjectSchema, string } from 'yup';

import { DeliveryForm } from '@/interfaces/delivery';
import {
  createDelivery,
  getDeliveryByWorkAndStudent,
} from '@/providers/rest/classManagement/delivery';
import { getStudent } from '@/providers/rest/classManagement/student';
import { getWorksActive } from '@/providers/rest/classManagement/work';

import { onDecode } from '../QRScanner';

const initialState: DeliveryForm = {
  workId: '',
  studentId: '',
  score: 0,
  active: true,
};

const validationSchema: ObjectSchema<DeliveryForm> = object({
  workId: string().trim().required('La actividad es requerida'),
  studentId: string().trim().required('El estudiante es requerido'),
  score: number()
    .min(0, 'La nota mínima es 0')
    .max(100, 'La nota máxima es 100')
    .required('La nota es requerida'),
  active: bool().required(),
});

const useRegisterDeliveryModal = (onClose: () => void) => {
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset, watch, setValue } = useForm<DeliveryForm>({
    defaultValues: initialState,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  const { workId, studentId } = watch();

  // ? ---------- QueryClient ----------

  const queryWorks = useQuery({
    queryKey: ['activeWorks'],
    queryFn: () => getWorksActive(false),
  });

  const queryStudent = useQuery({
    queryKey: ['activeStudents', { workId, studentId }],
    queryFn: () => getStudent(studentId),
    enabled: workId !== '' && studentId !== '',
  });

  const queryDelivery = useQuery({
    queryKey: ['activeDeliveries', { workId, studentId }],
    queryFn: () => getDeliveryByWorkAndStudent(workId, studentId),
    enabled: workId !== '' && studentId !== '',
  });

  const mutation = useMutation({
    mutationKey: ['newDelivery'],
    mutationFn: createDelivery,
  });

  // ? ---------- Effects ----------

  // * On workId change reset studentId
  useEffect(() => {
    setValue('studentId', '');
  }, [workId]);

  // ? ---------- Actions ----------

  const onSuccessScanQR: onDecode = useCallback(
    (studentId) => setValue('studentId', studentId.data),
    [setValue],
  );

  const onSubmit = useCallback(async (data: DeliveryForm) => {
    mutation.mutate(data, {
      onSuccess: () => {
        enqueueSnackbar('Entrega creada correctamente', { variant: 'success' });
        reset(initialState);
        onClose();
      },
      onError: (error: Error | HTTPError) => {
        console.error('Error: RegisterDeliveryModal', error);
        enqueueSnackbar('Error al registrar la entrega', { variant: 'error' });
      },
    });
  }, []);

  const handleSubmitForm = useCallback(handleSubmit(onSubmit), [onSubmit]);

  const works = useMemo(() => queryWorks.data?.data ?? [], [queryWorks.data?.data]);
  const groupId = useMemo(
    () => works.find((work) => work._id === workId)?.groupId?._id ?? '',
    [works, workId],
  );

  const loading = useMemo(
    () =>
      queryWorks.isLoading ||
      queryStudent.isLoading ||
      queryDelivery.isLoading ||
      mutation.isPending,
    [queryWorks.isLoading, queryStudent.isLoading, queryDelivery.isLoading],
  );

  return {
    control,
    onSubmit: handleSubmitForm,
    onSuccessScanQR,
    loading,

    groupId,
    works,
    student: queryStudent.data?.data,
    delivery: queryDelivery.data?.data,
  };
};

export default useRegisterDeliveryModal;
