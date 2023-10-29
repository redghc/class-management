import { IGroup } from '@/interfaces/group';

import { createError, error2Response } from './error';
import { validateId } from './validations';

export const validateBody = (body: IGroup) => {
  if (!body.name || !body.degree || !body.subject || !body.cycleId || body.active == null) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
  }

  const isValidCycle = validateId(body.cycleId, 'cycle');
  if (isValidCycle !== true) {
    return isValidCycle;
  }

  return true;
};
