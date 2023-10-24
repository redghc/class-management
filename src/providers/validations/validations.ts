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
