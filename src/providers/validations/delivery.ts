import { IDelivery } from '@/interfaces/delivery';

import { validateId } from './validations';

export const validateBody = (body: IDelivery) => {
  if (!body.studentId || !body.workId || body.score == null || body.active == null) {
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

  const isValidStudentId = validateId(body.studentId, 'studentId');
  if (isValidStudentId !== true) {
    return isValidStudentId;
  }

  const isValidWorkId = validateId(body.workId, 'workId');
  if (isValidWorkId !== true) {
    return isValidWorkId;
  }

  return true;
};
