import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import {
  createCycle,
  getCycles,
  getTotalCyclesAndPages,
} from '@/providers/database/query/cycleQuery';

interface NewCycle {
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;

  const cycles = await getCycles(page, limit);
  const cyclesAndPages = await getTotalCyclesAndPages(limit);

  const response = {
    status: 'success',
    data: cycles,
    page,
    limit,
    total: cyclesAndPages.total,
    pages: cyclesAndPages.pages,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  await connectDB();

  const body: NewCycle = await request.json();

  const cycle = await createCycle(body.name, body.startDate, body.endDate);

  const response = {
    status: 'success',
    data: cycle,
  };

  return Response.json(response);
}
