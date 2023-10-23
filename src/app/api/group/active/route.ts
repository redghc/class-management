import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import { getActiveGroups } from '@/providers/database/query/groupQuery';

export async function GET(request: NextRequest) {
  await connectDB();

  const activeGroups = await getActiveGroups();

  const response = {
    status: 'success',
    data: activeGroups,
  };

  return Response.json(response);

}
