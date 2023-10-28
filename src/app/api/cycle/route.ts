import { NextRequest } from 'next/server';

import { ICycle } from '@/interfaces/cycle';
import { connectDB } from '@/providers/database/mongoDB';
import {
  createCycle,
  getCycles,
  getTotalCyclesAndPages,
} from '@/providers/database/query/CycleQuery';
import { validateBody } from '@/providers/validations/cycle';

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
  const body: ICycle = await request.json();

  // Validate body
  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const cycleCreate: ICycle = {
    name: body.name,
    endDate: body.endDate,
    startDate: body.startDate,
    active: true,
  };

  const cycle = await createCycle(cycleCreate);

  const response = {
    status: 'success',
    data: cycle,
  };

  return Response.json(response);
}
