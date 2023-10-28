import { NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import { JWT_SECRET } from '@/providers/helpers/envs';

import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export const jwtMiddleware = (next: NextMiddleware) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    if (req.nextUrl.pathname.startsWith('/api/auth')) {
      return next(req, event);
    }

    if (!req.nextUrl.pathname.startsWith('/api')) {
      return next(req, event);
    }

    const token = req.cookies.get('token');
    if (token?.value == null) {
      return Response.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    const isValidToken = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET));
    if (!isValidToken) {
      return Response.json({ status: 'error', message: 'Unauthorized' }, { status: 401 });
    }

    return next(req, event);
  };
};
