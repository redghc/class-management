import { NextRequest } from 'next/server';

import { isValidObjectId } from 'mongoose';

import { IGroup } from '@/interfaces/group';
import { connectDB } from '@/providers/database/mongoDB';
import {
  changeGroupStatus,
  getGroupById,
  updateGroup,
} from '@/providers/database/query/groupQuery';

interface Params {
  params: GroupParams;
}

interface GroupParams {
  groupId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const groupId = params.groupId;

  // Valid mongo id
  const isValid = isValidObjectId(groupId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid group id',
      },
      {
        status: 400,
      },
    );
  }

  await connectDB();

  const groupData = await getGroupById(groupId);

  const response = {
    status: 'success',
    data: groupData,
  };

  return Response.json(response);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const body: IGroup = await request.json();
  const groupId = params.groupId;

  // Valid mongo id
  const isValid = isValidObjectId(groupId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid group id',
      },
      {
        status: 400,
      },
    );
  }

  const isValidCycle = isValidObjectId(body.cycleId);
  if (!isValidCycle) {
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

  const groupData = await updateGroup(groupId, body.name, body.degree, body.subject, body.cycleId);

  const response = {
    status: 'success',
    data: groupData,
  };

  return Response.json(response);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body: IGroup = await request.json();
  const groupId = params.groupId;

  // Valid mongo id
  const isValid = isValidObjectId(groupId);
  if (!isValid) {
    return Response.json(
      {
        status: 'error',
        message: 'Invalid group id',
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

  const cycleData = await changeGroupStatus(groupId, body.active);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}
