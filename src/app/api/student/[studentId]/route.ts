import { NextRequest } from 'next/server';

import { isValidObjectId } from 'mongoose';

import { IStudent } from '@/interfaces/student';
import { connectDB } from '@/providers/database/mongoDB';
import { changeStudentStatus, getStudentById } from '@/providers/database/query/studentQuery';
import { updateStudent } from '@/providers/rest/classManagement/student';
import { validateBoolean, validateId } from '@/providers/validations/validations';

import { validateBody } from '../route';

interface Params {
  params: StudentParams;
}

interface StudentParams {
  studentId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const studentId = params.studentId;

  const isValid = validateId(studentId, 'student');
  if (isValid !== true) {
    return isValid;
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

  const isValid = validateId(studentId, 'student');
  if (isValid !== true) {
    return isValid;
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

  const isValid = validateId(studentId, 'student');
  if (isValid !== true) {
    return isValid;
  }

  const isValidActive = validateBoolean(body.active);
  if (isValidActive !== true) {
    return isValidActive;
  }

  await connectDB();

  const studentData = await changeStudentStatus(studentId, body.active);

  const response = {
    status: 'success',
    data: studentData,
  };

  return Response.json(response);
}
