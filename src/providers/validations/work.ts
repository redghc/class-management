import { IWork } from '@/interfaces/work';

import { validateId } from './validations';

export const validateBody = (body: IWork) => {
  if (!body.name || !body.description || body.active == null) {
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

  const isValidGroup = validateId(body.groupId, 'group');
  if (isValidGroup !== true) {
    return isValidGroup;
  }

  if (body.limitDate && body.limitDate < new Date()) {
    return Response.json(
      {
        status: 'error',
        message: 'Limit date must be greater than today',
      },
      {
        status: 400,
      },
    );
  }

  return true;
};
