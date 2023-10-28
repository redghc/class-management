import { NextRequest } from 'next/server';

import { hash } from 'bcrypt';
import { omit } from 'lodash';

import { IUser } from '@/interfaces/user';
import { connectDB } from '@/providers/database/mongoDB';
import { createUser } from '@/providers/database/query/UserQuery';
import { BCRYPT_SALT } from '@/providers/helpers/envs';
import { validateBody } from '@/providers/validations/user';

export async function POST(request: NextRequest) {
  const body: IUser = await request.json();

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  const cryptedPassword = await hash(body.password, BCRYPT_SALT);

  const userCreate: IUser = {
    name: body.name,
    email: body.email.toLowerCase(),
    password: cryptedPassword,
    role: 'admin',
    active: true,
  };

  await connectDB();

  const user = await createUser(userCreate);
  const userWithoutPassword = omit(user.toObject(), ['password']);

  const response = {
    status: 'success',
    data: userWithoutPassword,
  };

  return Response.json(response);
}
