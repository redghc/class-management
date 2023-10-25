import { IWork } from '@/interfaces/work';

import WorkModel from '../models/WorkModel';

export const getWorks = async (page: number, limit: number) => {
  return await WorkModel.find()
    .skip(page * limit)
    .limit(limit);
};

export const getWorksByGroup = async (groupId: string, page: number, limit: number) => {
  return await WorkModel.find({ groupId })
    .skip(page * limit)
    .limit(limit);
};

export const getWorkById = async (id: string) => {
  return await WorkModel.findById(id);
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
