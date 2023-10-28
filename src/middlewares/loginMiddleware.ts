import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

import { jwtVerify } from 'jose';

import { JWT_SECRET } from '@/providers/helpers/envs';

export const loginMiddleware = (next: NextMiddleware) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    if (req.nextUrl.pathname !== '/') {
      return next(req, event);
    }

    const token = req.cookies.get('token');
    if (token?.value == null) {
      return next(req, event);
    }

    const isValidToken = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET));
    if (!isValidToken) {
      return next(req, event);
    }

    return Response.redirect(new URL('/dashboard/home', req.nextUrl.origin).href, 302);
  };
};
