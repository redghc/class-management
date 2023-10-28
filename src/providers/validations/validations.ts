import { isValidObjectId } from 'mongoose';

export const validateId = (cycleId: string, name: string) => {
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: `Invalid ${name} id`,
      },
      {
        status: 400,
      },
    );
  }

  return true;
};

export const validateBoolean = (active: boolean) => {
  if (active == null) {
    return Response.json(
      {
        status: 'error',
        message: 'Missing fields',
      },
      {
        status: 400,
      },
    );
  }

  return true;
};

export const validateEmail = (email: string) => {
  if (!email) {
    return Response.json(
      {
        status: 'error',
        message: 'Email is required',
      },
      {
        status: 400,
      },
    );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid email',
      },
      {
        status: 400,
      },
    );
  }

  return true;
};
