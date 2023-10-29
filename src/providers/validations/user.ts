import { IUser } from '@/interfaces/user';

import { createError, error2Response } from './error';

export const validateBody = (body: IUser) => {
  if (!body.name || !body.email || !body.password) {
    const error = createError(400, 'Invalid body');
    return error2Response(error);
  }

  return true;
};
