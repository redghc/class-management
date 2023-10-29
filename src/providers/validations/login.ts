import { ILogin } from '@/interfaces/user';

import { createError, error2Response } from './error';
import { validateEmail } from './validations';

export const validateBody = (body: ILogin) => {
  if (!body.email) {
    const error = createError(400, 'Email is required');
    return error2Response(error);
  }

  const validEmail = validateEmail(body.email);
  if (validEmail !== true) {
    return validEmail;
  }

  if (!body.password) {
    const error = createError(400, 'Password is required');
    return error2Response(error);
  }

  return true;
};
