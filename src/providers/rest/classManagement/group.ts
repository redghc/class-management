import { IGroup, RGroup } from '@/interfaces/group';

import { ClassAPI } from './ClassAPI';

export interface GroupsResponse {
  status: string;
  data: RGroup[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface GroupsActiveResponse {
  status: string;
  data: RGroup[];
}

export const getGroups = async (page: number, limit: number) => {
  const response = await ClassAPI.get(`group?page=${page}&limit=${limit}`).json<GroupsResponse>();
  return response;
};

export const getGroupsActive = async () => {
  const response = await ClassAPI.get('group/active').json<GroupsActiveResponse>();
  return response;
};

export const getGroup = async (id: number) => {
  const response = await ClassAPI.get(`group/${id}`).json();
  return response;
};

export const createGroup = async (data: IGroup) => {
  const response = await ClassAPI.post('group', { json: data }).json();
  return response;
};

export const updateGroup = async (id: string, data: IGroup) => {
  const response = await ClassAPI.put(`group/${id}`, { json: data }).json();
  return response;
};

export const updateGroupStatus = async (id: string, status: boolean) => {
  const response = await ClassAPI.patch(`group/${id}`, { json: { active: status } }).json();
  return response;
};
