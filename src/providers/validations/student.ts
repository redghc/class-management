import { isValidObjectId } from 'mongoose';

import { IStudent } from '@/interfaces/student';

import { createError, error2Response } from './error';

export const validateBody = (body: IStudent) => {
  if (
    !body.firstName ||
    !body.secondName ||
    !body.lastName ||
    !body.secondLastName ||
    body.active == null
  ) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
  }

  if (!Array.isArray(body.groupIds) || body.groupIds.length === 0) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
  }

  const isValidGroups = body.groupIds.every((groupId) => isValidObjectId(groupId));
  if (!isValidGroups) {
    const error = createError(400, 'Invalid group ids');
    return error2Response(error);
  }

  return true;
};
