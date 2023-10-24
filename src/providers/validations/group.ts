import { IGroup } from '@/interfaces/group';

import { validateId } from './validations';

export const validateBody = (body: IGroup) => {
  if (!body.name || !body.degree || !body.subject || !body.cycleId || body.active == null) {
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

  const isValidCycle = validateId(body.cycleId, 'cycle');
  if (isValidCycle !== true) {
    return isValidCycle;
  }

  return true;
};
