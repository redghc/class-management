import { ChangeEventHandler, useCallback, useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { HTTPError } from 'ky';
import { DateTime } from 'luxon';
import { useSnackbar } from 'notistack';

import { ICycle } from '@/interfaces/cycle';
import { createCycle } from '@/providers/rest/classManagement/cycle';

export interface CycleForm extends Omit<ICycle, 'startDate' | 'endDate'> {
  startDate: DateTime | null;
  endDate: DateTime | null;
}

const initialState: CycleForm = {
  name: '',
  startDate: null,
  endDate: null,
  active: true,
};

const useCycleForm = (refetch: () => void) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<CycleForm>(initialState);
  const [formError, setFormError] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  // ? ---------- QueryClient ----------

  const mutation = useMutation({
    mutationKey: ['newCycle'],
    mutationFn: (data: ICycle) => createCycle(data),
  });

  // ? ---------- Actions ----------

  const handleOpenModal = useCallback(() => setOpen(true), []);

  const handleCloseModal = useCallback(() => {
    refetch();
    setOpen(false);
    setFormState(initialState);
    setFormError('');
  }, []);

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    },
    [],
  );

  const handleChangeDate = useCallback((date: DateTime | null, field: string) => {
    setFormState((prevState) => ({ ...prevState, [field]: date }));
  }, []);

  const onSubmit = useCallback(async () => {
    const name = formState.name.trim();

    if (name === '') {
      setFormError('El nombre es requerido');
      return;
    }

    if (formState.startDate == null) {
      setFormError('La fecha inicial es requerida');
      return;
    }

    if (formState.endDate == null) {
      setFormError('La fecha final es requerida');
      return;
    }

    if (formState.startDate.toMillis() === formState.endDate.toMillis()) {
      setFormError('La fecha inicial no puede ser igual a la fecha final');
      return;
    }

    if (formState.startDate > formState.endDate) {
      setFormError('La fecha inicial no puede ser mayor a la fecha final');
      return;
    }

    const payload: ICycle = {
      name: formState.name,
      startDate: formState.startDate.toJSDate(),
      endDate: formState.endDate.toJSDate(),
      active: formState.active,
    };

    try {
      await mutation.mutateAsync(payload);
      enqueueSnackbar('Ciclo escolar creado correctamente', { variant: 'success' });
    } catch (error) {
      if (error instanceof HTTPError) {
        setFormError(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
        return;
      }

      setFormError('Ocurrió un error inesperado');
      enqueueSnackbar('Ocurrió un error inesperado, intenta más tarde', { variant: 'error' });
      return;
    }

    handleCloseModal();
  }, [formState, mutation]);

  return {
    open,
    formState,
    formError,

    handleChange,
    handleChangeDate,

    handleOpenModal,
    handleCloseModal,

    loading: mutation.isPending,
    onSubmit,
  };
};

export default useCycleForm;
