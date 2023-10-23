import { NextRequest } from 'next/server';

import { ICycle } from '@/providers/database/models/Cycle';
import { connectDB } from '@/providers/database/mongoDB';
import {
  createCycle,
  getCycles,
  getTotalCyclesAndPages,
} from '@/providers/database/query/cycleQuery';

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

  const body: ICycle = await request.json();

  // Validate body
  if (!body.name || !body.startDate || !body.endDate || body.active == null) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid body',
      },
      {
        status: 400,
      },
    );
  }

  if (body.startDate > body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Start date must be lower than end date',
      },
      {
        status: 400,
      },
    );
  }

  if (body.startDate === body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Start date must be different than end date',
      },
      {
        status: 400,
      },
    );
  }

  const cycle = await createCycle(body.name, body.startDate, body.endDate);

  const response = {
    status: 'success',
    data: cycle,
  };

  return Response.json(response);
}
