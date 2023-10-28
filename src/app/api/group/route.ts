import { NextRequest } from 'next/server';

import { IGroup } from '@/interfaces/group';
import { connectDB } from '@/providers/database/mongoDB';
import {
  createGroup,
  getGroups,
  getTotalGroupsAndPages,
} from '@/providers/database/query/GroupQuery';
import { validateBody } from '@/providers/validations/group';

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

  const groupCreate: IGroup = {
    name: body.name,
    degree: body.degree,
    subject: body.subject,
    cycleId: body.cycleId,
    active: true,
  };

  const group = await createGroup(groupCreate);

  const response = {
    status: 'success',
    data: group,
  };

  return Response.json(response);
}
