import { ICycle } from '@/providers/database/models/Cycle';

import { ClassAPI } from './ClassAPI';

export const getCycles = async (page: number, limit: number) => {
  const response = await ClassAPI.get(`/cycle?page=${page}&limit=${limit}`);
  return response.data;
};

export const getCycle = async (id: number) => {
  const response = await ClassAPI.get(`/cycle/${id}`);
  return response.data;
};

export const createCycle = async (data: ICycle) => {
  const response = await ClassAPI.post('/cycle', data);
  return response.data;
};

export const updateCycle = async (id: number, data: ICycle) => {
  const response = await ClassAPI.put(`/cycle/${id}`, data);
  return response.data;
};

export const updateCycleStatus = async (id: number, status: boolean) => {
  const response = await ClassAPI.patch(`/cycle/${id}`, { status });
  return response.data;
};
