import { IUser } from '@/interfaces/user';

export const validateBody = (body: IUser) => {
  if (!body.name || !body.email || !body.password) {
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

  return true;
};
