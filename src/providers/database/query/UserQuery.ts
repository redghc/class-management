import { IUser } from '@/interfaces/user';

import UserModel from '../models/UserModel';

export const getUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

export const createUser = async (user: IUser) => {
  return await UserModel.create(user);
};

export const updateUser = async (id: string, user: IUser) => {
  return await UserModel.findByIdAndUpdate(id, user);
};

export const changeUserStatus = async (id: string, active: boolean) => {
  return await UserModel.findByIdAndUpdate(id, { active });
};
