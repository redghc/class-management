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
    return Response.json(
      {
        status: 'error',
        message: 'Invalid cycle id',
      },
      {
        status: 400,
      },
    );
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
    return Response.json(
      {
        status: 'error',
        message: 'Invalid cycle id',
      },
      {
        status: 400,
      },
    );
  }

  if (!body.name || !body.startDate || !body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Missing fields',
      },
      {
        status: 400,
      },
    );
  }

  if (body.startDate > body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Start date must be less than end date',
      },
      {
        status: 400,
      },
    );
  }

  if (body.startDate === body.endDate) {
    return Response.json(
      {
        status: 'error',
        message: 'Start date must be less than end date',
      },
      {
        status: 400,
      },
    );
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
    return Response.json(
      {
        status: 'error',
        message: 'Invalid cycle id',
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
        message: 'Missing fields',
      },
      {
        status: 400,
      },
    );
  }

  await connectDB();

  const cycleData = await changeCycleStatus(cycleId, body.active);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}
