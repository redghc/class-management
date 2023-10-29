import { isValidObjectId } from 'mongoose';

import { createError, error2Response } from './error';

export const validateId = (cycleId: string, name: string) => {
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    const error = createError(400, `Invalid ${name} id`);
    return error2Response(error);
  }

  return true;
};

export const validateBoolean = (active: boolean) => {
  if (active == null) {
    const error = createError(400, 'Missing fields');
    return error2Response(error);
  }

  return true;
};

export const validateEmail = (email: string) => {
  if (!email) {
    const error = createError(400, 'Email is required');
    return error2Response(error);
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    const error = createError(400, 'Invalid email');
    return error2Response(error);
  }

  return true;
};
