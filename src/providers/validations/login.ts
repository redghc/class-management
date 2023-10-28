import { ILogin } from '@/interfaces/user';

import { validateEmail } from './validations';

export const validateBody = (body: ILogin) => {
  if (!body.email) {
    return Response.json({
      status: 'error',
      message: 'Email is required',
    });
  }

  const validEmail = validateEmail(body.email);
  if (validEmail !== true) {
    return validEmail;
  }

  if (!body.password) {
    return Response.json({
      status: 'error',
      message: 'Password is required',
    });
  }

  return true;
};
