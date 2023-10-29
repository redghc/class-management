import { IWork } from '@/interfaces/work';

import WorkModel from '../models/WorkModel';

export const getWorks = async (page: number, limit: number) => {
  return await WorkModel.find()
    .populate('groupId')
    .skip(page * limit)
    .limit(limit);
};

export const getActiveWorks = async (includeExpired: boolean) => {
  if (includeExpired) {
    return await WorkModel.find({ active: true }).populate('groupId');
  }
  return await WorkModel.find({ active: true, limitDate: { $gte: new Date() } }).populate(
    'groupId',
  );
};

export const getWorksByGroup = async (groupId: string, page: number, limit: number) => {
  return await WorkModel.find({ groupId })
    .populate('groupId')
    .skip(page * limit)
    .limit(limit);
};

export const getWorkById = async (id: string) => {
  return await WorkModel.findById(id).populate('groupId');
};

export const getTotalWorksAndPages = async (limit: number) => {
  const total = await WorkModel.countDocuments();
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const getTotalWorksAndPagesByGroup = async (groupId: string, limit: number) => {
  const total = await WorkModel.countDocuments({ groupId, active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createWork = async (work: IWork) => {
  return await WorkModel.create(work);
};

export const updateWork = async (id: string, work: IWork) => {
  return await WorkModel.findByIdAndUpdate(id, work);
};

export const changeWorkStatus = async (id: string, active: boolean) => {
  return await WorkModel.findByIdAndUpdate(id, { active });
};
