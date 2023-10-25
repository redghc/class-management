import { NextRequest } from 'next/server';

import { IWork } from '@/interfaces/work';
import { connectDB } from '@/providers/database/mongoDB';
import { createWork, getTotalWorksAndPages, getWorks } from '@/providers/database/query/WorkQuery';
import { validateBody } from '@/providers/validations/work';

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;

  const works = await getWorks(page, limit);
  const worksAndPages = await getTotalWorksAndPages(limit);

  const response = {
    status: 'success',
    data: works,
    page,
    limit,
    total: worksAndPages.total,
    pages: worksAndPages.pages,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  const body: IWork = await request.json();

  // Validate body
  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const work = await createWork(body);

  const response = {
    status: 'success',
    data: work,
  };

  return Response.json(response);
}
