import { NextRequest } from 'next/server';

import { IWork } from '@/interfaces/work';
import { connectDB } from '@/providers/database/mongoDB';
import { changeWorkStatus, getWorkById, updateWork } from '@/providers/database/query/WorkQuery';
import { validateBoolean, validateId } from '@/providers/validations/validations';
import { validateBody } from '@/providers/validations/work';

interface Params {
  params: WorkParams;
}

interface WorkParams {
  workId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const workId = params.workId;

  const isValid = validateId(workId, 'work');
  if (isValid !== true) {
    return isValid;
  }

  await connectDB();

  const workData = await getWorkById(workId);

  const response = {
    status: 'success',
    data: workData,
  };

  return Response.json(response);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const body: IWork = await request.json();
  const workId = params.workId;

  const isValid = validateId(workId, 'work');
  if (isValid !== true) {
    return isValid;
  }

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const workData = await updateWork(workId, body);

  const response = {
    status: 'success',
    data: workData,
  };

  return Response.json(response);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body: IWork = await request.json();
  const workId = params.workId;

  const isValid = validateId(workId, 'work');
  if (isValid !== true) {
    return isValid;
  }

  const isValidActive = validateBoolean(body.active);
  if (isValidActive !== true) {
    return isValidActive;
  }

  await connectDB();

  const workData = await changeWorkStatus(workId, body.active);

  const response = {
    status: 'success',
    data: workData,
  };

  return Response.json(response);
}
