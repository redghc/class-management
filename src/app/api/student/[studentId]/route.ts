import { NextRequest } from 'next/server';

import { isValidObjectId } from 'mongoose';

import { IStudent } from '@/interfaces/student';
import { connectDB } from '@/providers/database/mongoDB';
import { changeStudentStatus, getStudentById } from '@/providers/database/query/studentQuery';
import { updateStudent } from '@/providers/rest/classManagement/student';

import { validateBody } from '../route';

interface Params {
  params: StudentParams;
}

interface StudentParams {
  studentId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const studentId = params.studentId;

  // Valid mongo id
  const isValid = isValidObjectId(studentId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid student id',
      },
      {
        status: 400,
      },
    );
  }

  await connectDB();

  const studentData = await getStudentById(studentId);

  const response = {
    status: 'success',
    data: studentData,
  };

  return Response.json(response);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const body: IStudent = await request.json();
  const studentId = params.studentId;

  // Valid mongo id
  const isValid = isValidObjectId(studentId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid student id',
      },
      {
        status: 400,
      },
    );
  }

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const studentData = await updateStudent(studentId, body);

  const response = {
    status: 'success',
    data: studentData,
  };

  return Response.json(response);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body: IStudent = await request.json();
  const studentId = params.studentId;

  // Valid mongo id
  const isValid = isValidObjectId(studentId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid student id',
      },
      {
        status: 400,
      },
    );
  }

  if (body.active == null) {
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

  await connectDB();

  const studentData = await changeStudentStatus(studentId, body.active);

  const response = {
    status: 'success',
    data: studentData,
  };

  return Response.json(response);
}
