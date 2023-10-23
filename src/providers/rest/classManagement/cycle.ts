import { ICycle, RCycle } from '@/interfaces/cycle';

import { ClassAPI } from './ClassAPI';

export interface CyclesResponse {
  status: string;
  data: RCycle[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CyclesActiveResponse {
  status: string;
  data: RCycle[];
}

export const getCycles = async (page: number, limit: number) => {
  const response = await ClassAPI.get(`cycle?page=${page}&limit=${limit}`).json<CyclesResponse>();
  return response;
};

export const getCyclesActive = async () => {
  const response = await ClassAPI.get('cycle/active').json<CyclesActiveResponse>();
  return response;
};

export const getCycle = async (id: number) => {
  const response = await ClassAPI.get(`cycle/${id}`).json();
  return response;
};

export const createCycle = async (data: ICycle) => {
  const response = await ClassAPI.post('cycle', { json: data }).json();
  return response;
};

export const updateCycle = async (id: string, data: ICycle) => {
  const response = await ClassAPI.put(`cycle/${id}`, { json: data }).json();
  return response;
};

export const updateCycleStatus = async (id: string, status: boolean) => {
  const response = await ClassAPI.patch(`cycle/${id}`, { json: { active: status } }).json();
  return response;
};
