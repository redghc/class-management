import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

import { jwtVerify } from 'jose';

import { JWT_SECRET } from '@/providers/helpers/envs';

export const dashboardMiddleware = (next: NextMiddleware) => {
  return async (req: NextRequest, event: NextFetchEvent) => {
    if (!req.nextUrl.pathname.startsWith('/dashboard')) {
      return next(req, event);
    }

    const token = req.cookies.get('token');
    if (token?.value == null) {
      return Response.redirect(new URL('/404', req.nextUrl.origin).href, 302);
    }

    const isValidToken = await jwtVerify(token.value, new TextEncoder().encode(JWT_SECRET));
    if (!isValidToken) {
      return Response.redirect(new URL('/404', req.nextUrl.origin).href, 302);
    }

    return next(req, event);
  };
};
