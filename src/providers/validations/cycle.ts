import { ICycle } from '@/interfaces/cycle';

import { createError, error2Response } from './error';

export const validateBody = (body: ICycle) => {
  if (!body.name || !body.startDate || !body.endDate || body.active == null) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
  }

  if (body.startDate > body.endDate) {
    const error = createError(400, 'Start date must be lower than end date');
    return error2Response(error);
  }

  if (body.startDate === body.endDate) {
    const error = createError(400, 'Start date must be different than end date');
    return error2Response(error);
  }

  return true;
};
