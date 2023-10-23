import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import { getActiveCycles } from '@/providers/database/query/cycleQuery';

export async function GET(request: NextRequest) {
  await connectDB();

  const activeCycles = await getActiveCycles();

  const response = {
    status: 'success',
    data: activeCycles,
  };

  return Response.json(response);
}
