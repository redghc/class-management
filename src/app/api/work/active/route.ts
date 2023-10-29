import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import { getActiveWorks } from '@/providers/database/query/WorkQuery';

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const includeExpired = searchParams.get('includeExpired') === 'true';

  const activeWorks = await getActiveWorks(includeExpired);

  const response = {
    status: 'success',
    data: activeWorks,
  };

  return Response.json(response);
}
