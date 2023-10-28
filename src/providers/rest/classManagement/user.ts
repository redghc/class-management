import { ILogin, IUser, RUser } from '@/interfaces/user';

import { ClassAPI } from './ClassAPI';

export interface UserResponse {
  status: string;
  data: UserResponseData;
}

export interface UserResponseData {
  token: string;
  expiresAt: number;
  expiresAtISO: string;
  expiresIn: number;
  data: RUser;
}

export const login = async (data: ILogin) => {
  const response = await ClassAPI.post('auth/login', { json: data }).json<UserResponse>();
  return response;
};

export const logout = async () => {
  const response = await ClassAPI.post('auth/logout').json();
  return response;
};

export const register = async (data: IUser) => {
  const response = await ClassAPI.post('auth/register', { json: data }).json();
  return response;
};
