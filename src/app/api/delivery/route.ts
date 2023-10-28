import { NextRequest } from 'next/server';

import { IDelivery } from '@/interfaces/delivery';
import { connectDB } from '@/providers/database/mongoDB';
import {
  createDelivery,
  getDeliveries,
  getTotalDeliveriesAndPages,
} from '@/providers/database/query/DeliveryQuery';
import { validateBody } from '@/providers/validations/delivery';

export async function GET(request: NextRequest) {
  await connectDB();

  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : 10;

  const deliveries = await getDeliveries(page, limit);
  const deliveriesAndPages = await getTotalDeliveriesAndPages(limit);

  const response = {
    status: 'success',
    data: deliveries,
    page,
    limit,
    total: deliveriesAndPages.total,
    pages: deliveriesAndPages.pages,
  };

  return Response.json(response);
}

export async function POST(request: NextRequest) {
  const body: IDelivery = await request.json();

  const isValidBody = validateBody(body);
  if (isValidBody !== true) {
    return isValidBody;
  }

  await connectDB();

  const deliveryCreate: IDelivery = {
    studentId: body.studentId,
    workId: body.workId,
    score: body.score,
    active: true,
  };

  const delivery = await createDelivery(deliveryCreate);

  const response = {
    status: 'success',
    data: delivery,
  };

  return Response.json(response);
}
