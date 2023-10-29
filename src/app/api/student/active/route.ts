import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import {
  getActiveStudents,
  getActiveStudentsByGroup,
  getActiveStudentsByGroupWithoutWork,
} from '@/providers/database/query/StudentQuery';

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const groupId = searchParams.get('groupId') ?? '';
  const neWorkId = searchParams.get('neWorkId') ?? '';

  let activeStudents;

  if (groupId !== '' && neWorkId !== '') {
    activeStudents = await getActiveStudentsByGroupWithoutWork(groupId, neWorkId);
  } else if (groupId !== '') {
    activeStudents = await getActiveStudentsByGroup(groupId);
  } else {
    activeStudents = await getActiveStudents();
  }

  const response = {
    status: 'success',
    data: activeStudents,
  };

  return Response.json(response);
}
