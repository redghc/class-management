import { IGroup } from '@/interfaces/group';

import GroupModel from '../models/GroupModel';

export const getGroups = async (page: number, limit: number) => {
  return await GroupModel.find()
    .populate('cycleId')
    .skip(page * limit)
    .limit(limit);
};

export const getActiveGroups = async () => {
  return await GroupModel.find({ active: true }).populate('cycleId');
};

export const getGroupById = async (id: string) => {
  return await GroupModel.findById(id).populate('cycleId');
};

export const getTotalGroupsAndPages = async (limit: number) => {
  const total = await GroupModel.countDocuments();
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createGroup = async (group: IGroup) => {
  return await GroupModel.create(group);
};

export const updateGroup = async (id: string, group: IGroup) => {
  return await GroupModel.findByIdAndUpdate(id, group);
};

export const changeGroupStatus = async (id: string, active: boolean) => {
  return await GroupModel.findByIdAndUpdate(id, { active });
};
