import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import {
  getDeliveriesByStudentAll,
  getDeliveryByWorkAndStudent,
} from '@/providers/database/query/DeliveryQuery';
import { validateId } from '@/providers/validations/validations';

interface Params {
  params: StudentParams;
}

interface StudentParams {
  studentId: string;
}

export async function GET(request: NextRequest, { params }: Params) {
  const studentId = params.studentId;

  const isValid = validateId(studentId, 'student');
  if (isValid !== true) {
    return isValid;
  }

  const searchParams = request.nextUrl.searchParams;

  await connectDB();

  let delivery;

  const workId = searchParams.get('workId') ?? '';
  if (workId !== '') {
    const isValidWorkId = validateId(workId, 'work');
    if (isValidWorkId !== true) {
      return isValidWorkId;
    }

    delivery = await getDeliveryByWorkAndStudent(workId, studentId);
  } else {
    delivery = await getDeliveriesByStudentAll(studentId);
  }

  const response = {
    status: 'success',
    data: delivery,
  };

  return Response.json(response);
}
