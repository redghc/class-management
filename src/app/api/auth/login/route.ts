import { NextRequest } from 'next/server';

import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';

import { connectDB } from '@/providers/database/mongoDB';
import { JWT_SECRET } from '@/providers/helpers/envs';
import { validateBody } from '@/providers/validations/login';

export interface ILogin {
  email: string;
  password: string;
}

const validEmail = 'prueba@email.com';
const validPassword = '123456';

// * POST - /api/auth/login - Login user
export async function POST(request: NextRequest) {
  const body: ILogin = await request.json();

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const validPasswordCrypt = await bcrypt.hash(validPassword, 10);

  const isValid = await bcrypt.compare(body.password, validPasswordCrypt);
  if (!isValid) {
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

  const user = { name: 'Prueba', email: validEmail };

  // Expiration in seconds - 1day after the token is generated
  const expiresIn = 60 * 60 * 24;
  const expiresAt = new Date().getTime() + expiresIn * 1000;
  const expiresAtISO = new Date(expiresAt).toISOString();

  const token = sign({ data: user }, JWT_SECRET, { expiresIn: '1d' });

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
      data: user,
    },
  };

  return Response.json(response, { headers: { 'Set-Cookie': serializedToken } });
}
