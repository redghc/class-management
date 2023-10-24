import { IWork, RWork } from '@/interfaces/work';

import { ClassAPI } from './ClassAPI';

export interface WorksResponse {
  status: string;
  data: RWork[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export const getWorks = async (page: number, limit: number) => {
  const response = await ClassAPI.get(`work?page=${page}&limit=${limit}`).json<WorksResponse>();
  return response;
};

export const getWork = async (id: string) => {
  const response = await ClassAPI.get(`work/${id}`).json();
  return response;
};

export const createWork = async (data: IWork) => {
  const response = await ClassAPI.post('work', { json: data }).json();
  return response;
};

export const updateWork = async (id: string, data: IWork) => {
  const response = await ClassAPI.put(`work/${id}`, { json: data }).json();
  return response;
};

export const updateWorkStatus = async (id: string, status: boolean) => {
  const response = await ClassAPI.patch(`work/${id}`, { json: { active: status } }).json();
  return response;
};
