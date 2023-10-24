import { ICycle } from '@/interfaces/cycle';

export const validateBody = (body: ICycle) => {
  if (!body.name || !body.startDate || !body.endDate || body.active == null) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid body',
      },
      {
        status: 400,
      },
    );
  }

  if (body.startDate > body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Start date must be lower than end date',
      },
      {
        status: 400,
      },
    );
  }

  if (body.startDate === body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Start date must be different than end date',
      },
      {
        status: 400,
      },
    );
  }

  return true;
};
