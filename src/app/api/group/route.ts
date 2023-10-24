import { NextRequest } from 'next/server';

import { IGroup } from '@/interfaces/group';
import { connectDB } from '@/providers/database/mongoDB';
import {
  createGroup,
  getGroups,
  getTotalGroupsAndPages,
} from '@/providers/database/query/groupQuery';
import { validateId } from '@/providers/validations/validations';

export const validateBody = (body: IGroup) => {
  if (!body.name || !body.degree || !body.subject || !body.cycleId || body.active == null) {
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

  const isValidCycle = validateId(body.cycleId, 'cycle');
  if (isValidCycle !== true) {
    return isValidCycle;
  }

  return true;
};

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;

  const groups = await getGroups(page, limit);
  const groupsAndPages = await getTotalGroupsAndPages(limit);

  const response = {
    status: 'success',
    data: groups,
    page,
    limit,
    total: groupsAndPages.total,
    pages: groupsAndPages.pages,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  const body: IGroup = await request.json();

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const group = await createGroup(body.name, body.degree, body.subject, body.cycleId);

  const response = {
    status: 'success',
    data: group,
  };

  return Response.json(response);
}
