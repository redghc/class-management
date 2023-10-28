import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { object, ObjectSchema, string } from 'yup';

import { ILogin } from '@/interfaces/user';
import { login } from '@/providers/rest/classManagement/user';

const initialState: ILogin = {
  email: '',
  password: '',
};

const validationSchema: ObjectSchema<ILogin> = object({
  email: string()
    .trim()
    .email('El correo electrónico es inválido')
    .required('El correo electrónico es requerido'),
  password: string().trim().required('La contraseña es requerida'),
});

const useLogin = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { handleSubmit, control, reset } = useForm<ILogin>({
    defaultValues: initialState,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  });

  // ? ---------- QueryClient ----------

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });

  // ? ---------- Actions ----------

  const onSubmit = useCallback(
    (data: ILogin) => {
      mutation.mutate(data, {
        onSuccess: () => {
          enqueueSnackbar('Bienvenido', { variant: 'success' });
          reset();
          router.push('/dashboard/home');
        },
        onError: (error: Error | HTTPError) => {
          console.log('Error: LoginForm', error);
          enqueueSnackbar('Usuario o contraseña incorrectos', { variant: 'error' });
        },
      });
    },
    [enqueueSnackbar, mutation, reset],
  );

  const handleSubmitForm = useCallback(handleSubmit(onSubmit), [onSubmit]);

  return {
    control,
    onSubmit: handleSubmitForm,
    loading: mutation.isPending,
  };
};

export default useLogin;
