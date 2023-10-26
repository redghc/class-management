import { RDelivery } from '@/interfaces/delivery';

import { ClassAPI } from './ClassAPI';

export interface DeliveriesResponse {
  status: string;
  data: RDelivery[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const getDeliveries = async (page: number, limit: number) => {
  const response = await ClassAPI.get(
    `delivery?page=${page}&limit=${limit}`,
  ).json<DeliveriesResponse>();
  return response;
};

export const getDelivery = async (id: string) => {
  const response = await ClassAPI.get(`delivery/${id}`).json();
  return response;
};

export const createDelivery = async (data: RDelivery) => {
  const response = await ClassAPI.post('delivery', { json: data }).json();
  return response;
};

export const updateDelivery = async (id: string, data: RDelivery) => {
  const response = await ClassAPI.put(`delivery/${id}`, { json: data }).json();
  return response;
};

export const updateDeliveryStatus = async (id: string, status: boolean) => {
  const response = await ClassAPI.patch(`delivery/${id}`, { json: { active: status } }).json();
  return response;
};
