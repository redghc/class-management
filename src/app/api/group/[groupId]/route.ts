import { NextRequest } from 'next/server';

import { IGroup } from '@/interfaces/group';
import { connectDB } from '@/providers/database/mongoDB';
import {
  changeGroupStatus,
  getGroupById,
  updateGroup,
} from '@/providers/database/query/GroupQuery';
import { validateBody } from '@/providers/validations/group';
import { validateBoolean, validateId } from '@/providers/validations/validations';

interface Params {
  params: GroupParams;
}

interface GroupParams {
  groupId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const groupId = params.groupId;

  const isValid = validateId(groupId, 'group');
  if (isValid !== true) {
    return isValid;
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

  const isValid = validateId(groupId, 'group');
  if (isValid !== true) {
    return isValid;
  }

  const isValidCycle = validateId(body.cycleId, 'cycle');
  if (isValidCycle !== true) {
    return isValidCycle;
  }

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const groupData = await updateGroup(groupId, body);

  const response = {
    status: 'success',
    data: groupData,
  };

  return Response.json(response);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body: IGroup = await request.json();
  const groupId = params.groupId;

  const isValid = validateId(groupId, 'group');
  if (isValid !== true) {
    return isValid;
  }

  const isValidActive = validateBoolean(body.active);
  if (isValidActive !== true) {
    return isValidActive;
  }

  await connectDB();

  const cycleData = await changeGroupStatus(groupId, body.active);

  const response = {
    status: 'success',
    data: cycleData,
  };

  return Response.json(response);
}
