import { IDelivery } from '@/interfaces/delivery';

import { createError, error2Response } from './error';
import { validateId } from './validations';

export const validateBody = (body: IDelivery) => {
  if (!body.studentId || !body.workId || body.score == null || body.active == null) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
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
