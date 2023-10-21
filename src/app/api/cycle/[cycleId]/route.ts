import { NextRequest } from 'next/server';

import { isValidObjectId } from 'mongoose';

import { connectDB } from '@/providers/database/mongoDB';
import {
  enableDisableCycle,
  getCycleById,
  updateCycle,
} from '@/providers/database/query/cycleQuery';

interface Params {
  params: CycleParams;
}

interface CycleParams {
  cycleId: string;
}

interface Cycle {
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export async function GET(request: NextRequest, { params }: Params) {
  const cycleId = params.cycleId;

  // Valid mongo id
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    return Response.json({
      status: 'error',
      message: 'Invalid cycle id',
    });
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
  const body: Cycle = await request.json();
  const cycleId = params.cycleId;

  // Valid mongo id
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    return Response.json({
      status: 'error',
      message: 'Invalid cycle id',
    });
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
  const body: Cycle = await request.json();
  const cycleId = params.cycleId;

  // Valid mongo id
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    return Response.json({
      status: 'error',
      message: 'Invalid cycle id',
    });
  }

  const cycleData = await enableDisableCycle(cycleId, body.active);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}
