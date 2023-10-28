import { NextRequest } from 'next/server';

import { compare } from 'bcrypt';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { omit } from 'lodash';

import { ILogin } from '@/interfaces/user';
import { connectDB } from '@/providers/database/mongoDB';
import { getUserByEmail } from '@/providers/database/query/UserQuery';
import { JWT_SECRET } from '@/providers/helpers/envs';
import { validateBody } from '@/providers/validations/login';

// * POST - /api/auth/login - Login user
export async function POST(request: NextRequest) {
  const body: ILogin = await request.json();

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const emailLowerCase = body.email.toLowerCase();

  const user = await getUserByEmail(emailLowerCase);
  if (!user) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid credentials',
      },
      {
        status: 400,
      },
    );
  }

  const isValidPassword = await compare(body.password, user.password);
  if (!isValidPassword) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid credentials',
      },
      {
        status: 400,
      },
    );
  }

  const userWithoutPassword = omit(user.toObject(), ['password']);

  // Expiration in seconds - 1day after the token is generated
  const expiresIn = 60 * 60 * 24;
  const expiresAt = new Date().getTime() + expiresIn * 1000;
  const expiresAtISO = new Date(expiresAt).toISOString();

  const token = sign({ data: userWithoutPassword }, JWT_SECRET, { expiresIn: '1d' });

  const serializedToken = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(expiresAt),
    maxAge: expiresIn,
    path: '/',
  });

  const response = {
    status: 'success',
    data: {
      token,
      expiresAt,
      expiresAtISO,
      expiresIn,
      data: userWithoutPassword,
    },
  };

  return Response.json(response, { headers: { 'Set-Cookie': serializedToken } });
}
