import { isValidObjectId } from 'mongoose';

import { IStudent } from '@/interfaces/student';

export const validateBody = (body: IStudent) => {
  if (
    !body.firstName ||
    !body.secondName ||
    !body.lastName ||
    !body.secondLastName ||
    body.active == null
  ) {
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

  if (!Array.isArray(body.groupIds) || body.groupIds.length === 0) {
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

  const isValidGroups = body.groupIds.every((groupId) => isValidObjectId(groupId));
  if (!isValidGroups) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid group ids',
      },
      {
        status: 400,
      },
    );
  }

  return true;
};
