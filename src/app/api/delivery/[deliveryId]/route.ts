import { NextRequest } from 'next/server';

import { connectDB } from '@/providers/database/mongoDB';
import {
  changeDeliveryStatus,
  getDeliveryById,
  updateDelivery,
} from '@/providers/database/query/DeliveryQuery';
import { validateBody } from '@/providers/validations/delivery';
import { validateId } from '@/providers/validations/validations';

interface Params {
  params: DeliveryParams;
}

interface DeliveryParams {
  deliveryId: string;
}

export async function GET(_: NextRequest, { params }: Params) {
  const deliveryId = params.deliveryId;

  const isValid = validateId(deliveryId, 'delivery');
  if (isValid !== true) {
    return isValid;
  }

  await connectDB();

  const deliveryData = await getDeliveryById(deliveryId);

  const response = {
    status: 'success',
    data: deliveryData,
  };

  return Response.json(response);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const body = await request.json();
  const deliveryId = params.deliveryId;

  const isValid = validateId(deliveryId, 'delivery');
  if (isValid !== true) {
    return isValid;
  }

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const deliveryData = await updateDelivery(deliveryId, body);

  const response = {
    status: 'success',
    data: deliveryData,
  };

  return Response.json(response);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const body = await request.json();
  const deliveryId = params.deliveryId;

  const isValid = validateId(deliveryId, 'delivery');
  if (isValid !== true) {
    return isValid;
  }

  const isValidActive = validateBody(body);
  if (isValidActive !== true) {
    return isValidActive;
  }

  await connectDB();

  const deliveryData = await changeDeliveryStatus(deliveryId, body);

  const response = {
    status: 'success',
    data: deliveryData,
  };

  return Response.json(response);
}
