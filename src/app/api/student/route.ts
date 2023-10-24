import { NextRequest } from 'next/server';

import { isValidObjectId } from 'mongoose';

import { IStudent } from '@/interfaces/student';
import { connectDB } from '@/providers/database/mongoDB';
import {
  createStudent,
  getStudents,
  getTotalStudentsAndPages,
} from '@/providers/database/query/studentQuery';

export const validateBody = (body: IStudent) => {
  if (
    !body.firstName ||
    !body.secondName ||
    !body.lastName ||
    !body.secondLastName ||
    body.active == null
  ) {
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

  if (!Array.isArray(body.groupIds) || body.groupIds.length === 0) {
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

  const isValidGroups = body.groupIds.every((groupId) => isValidObjectId(groupId));
  if (!isValidGroups) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid group ids',
      },
      {
        status: 400,
      },
    );
  }

  return true;
};

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;

  const students = await getStudents(page, limit);
  const studentsAndPages = await getTotalStudentsAndPages(limit);

  const response = {
    status: 'success',
    data: students,
    page,
    limit,
    total: studentsAndPages.total,
    pages: studentsAndPages.pages,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  const body: IStudent = await request.json();

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const student = await createStudent(
    body.firstName,
    body.secondName ?? '',
    body.lastName,
    body.secondLastName ?? '',
    body.groupIds,
  );

  const response = {
    status: 'success',
    data: student,
  };

  return Response.json(response);
}
