import { IWork } from '@/interfaces/work';

import { createError, error2Response } from './error';
import { validateId } from './validations';

export const validateBody = (body: IWork) => {
  if (!body.name || !body.description || body.active == null) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
  }

  const isValidGroup = validateId(body.groupId, 'group');
  if (isValidGroup !== true) {
    return isValidGroup;
  }

  if (body.limitDate && body.limitDate < new Date()) {
    const error = createError(400, 'Limit date must be greater than today');
    return error2Response(error);
  }

  return true;
};
