import { NextRequest } from 'next/server';

import { isValidObjectId } from 'mongoose';

import { ICycle } from '@/providers/database/models/Cycle';
import { connectDB } from '@/providers/database/mongoDB';
import {
  changeCycleStatus,
  getCycleById,
  updateCycle,
} from '@/providers/database/query/cycleQuery';

interface Params {
  params: CycleParams;
}

interface CycleParams {
  cycleId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
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
  const body: ICycle = await request.json();
  const cycleId = params.cycleId;

  // Valid mongo id
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    return Response.json({
      status: 'error',
      message: 'Invalid cycle id',
    });
  }

  if (!body.name || !body.startDate || !body.endDate) {
    return Response.json({
      status: 'error',
      message: 'Missing fields',
    });
  }

  if (body.startDate > body.endDate) {
    return Response.json({
      status: 'error',
      message: 'Start date must be less than end date',
    });
  }

  if (body.startDate === body.endDate) {
    return Response.json({
      status: 'error',
      message: 'Start date must be less than end date',
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
  const body: ICycle = await request.json();
  const cycleId = params.cycleId;

  // Valid mongo id
  const isValid = isValidObjectId(cycleId);
  if (!isValid) {
    return Response.json({
      status: 'error',
      message: 'Invalid cycle id',
    });
  }

  if (body.active === undefined) {
    return Response.json({
      status: 'error',
      message: 'Missing fields',
    });
  }

  await connectDB();

  const cycleData = await changeCycleStatus(cycleId, body.active);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}
