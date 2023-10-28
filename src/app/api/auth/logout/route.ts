import { NextRequest } from 'next/server';

import { serialize } from 'cookie';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token');
  if (token?.value == null) {
    return Response.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
  }

  const serializedToken = serialize('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0),
    maxAge: 0,
    path: '/',
  });

  const response = {
    status: 'success',
    message: 'Logout success',
  };

  return Response.json(response, { headers: { 'Set-Cookie': serializedToken } });
}
