import { useCallback, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { array, bool, object, ObjectSchema, string } from 'yup';

import { IStudent, StudentForm } from '@/interfaces/student';
import { getGroupsActive } from '@/providers/rest/classManagement/group';
import { createStudent } from '@/providers/rest/classManagement/student';

const initialState: StudentForm = {
  firstName: '',
  secondName: '',
  lastName: '',
  secondLastName: '',
  groupIds: [],
  active: true,
};

const validationSchema: ObjectSchema<StudentForm> = object({
  firstName: string().trim().required('El primer nombre es requerido'),
  secondName: string().trim(),
  lastName: string().trim().required('El primer apellido es requerido'),
  secondLastName: string().trim(),
  groupIds: array().required('El grupo es requerido'),
  active: bool().required(),
});

const useStudentForm = (refetch: () => void) => {
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset } = useForm<StudentForm>({
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
    mutationKey: ['newStudent'],
    mutationFn: (data: IStudent) => createStudent(data),
  });

  // ? ---------- Actions ----------

  const handleOpenModal = useCallback(() => setOpen(true), []);

  const handleCloseModal = useCallback(() => {
    refetch();
    setOpen(false);
    reset(initialState);
  }, []);

  const onSubmit = useCallback(
    async (data: StudentForm) => {
      mutation.mutate(data, {
        onSuccess: () => {
          enqueueSnackbar('Estudiante creado correctamente', { variant: 'success' });
          handleCloseModal();
        },
        onError: (error) => {
          console.error('Error: StudentForm', error);

          if (error instanceof HTTPError) {
            enqueueSnackbar(error.message, { variant: 'error' });
            return;
          }

          enqueueSnackbar('Ocurrió un error al crear el estudiante, intenta mas tarde', {
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

export default useStudentForm;
