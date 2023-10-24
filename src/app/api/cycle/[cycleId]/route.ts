import { NextRequest } from 'next/server';

import { ICycle } from '@/interfaces/cycle';
import { connectDB } from '@/providers/database/mongoDB';
import {
  changeCycleStatus,
  getCycleById,
  updateCycle,
} from '@/providers/database/query/cycleQuery';
import { validateBoolean, validateId } from '@/providers/validations/validations';

import { validateBody } from '../route';

interface Params {
  params: CycleParams;
}

interface CycleParams {
  cycleId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const cycleId = params.cycleId;

  const isValid = validateId(cycleId, 'cycle');
  if (isValid !== true) {
    return isValid;
  }

  await connectDB();

  const cycleData = await getCycleById(cycleId);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const body: ICycle = await request.json();
  const cycleId = params.cycleId;

  const isValid = validateId(cycleId, 'cycle');
  if (isValid !== true) {
    return isValid;
  }

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const cycleData = await updateCycle(cycleId, body.name, body.startDate, body.endDate);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body: ICycle = await request.json();
  const cycleId = params.cycleId;

  const isValid = validateId(cycleId, 'cycle');
  if (isValid !== true) {
    return isValid;
  }

  const isValidActive = validateBoolean(body.active);
  if (isValidActive !== true) {
    return isValidActive;
  }

  await connectDB();

  const cycleData = await changeCycleStatus(cycleId, body.active);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}
