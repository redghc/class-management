import WorkModel from '../models/WorkModel';

export const getWorks = async (page: number, limit: number) => {
  return await WorkModel.find({ active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getWorksByGroup = async (groupId: string, page: number, limit: number) => {
  return await WorkModel.find({ groupId, active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getWorkById = async (id: string) => {
  return await WorkModel.findById(id);
};

export const getTotalWorksAndPages = async (limit: number) => {
  const total = await WorkModel.countDocuments({ active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const getTotalWorksAndPagesByGroup = async (groupId: string, limit: number) => {
  const total = await WorkModel.countDocuments({ groupId, active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createWork = async (
  name: string,
  description: string,
  groupId: string,
  limitDate?: Date,
) => {
  return await WorkModel.create({ name, description, groupId, limitDate });
};

export const updateWork = async (
  id: string,
  name: string,
  description: string,
  limitDate?: Date,
) => {
  return await WorkModel.findByIdAndUpdate(id, { name, description, limitDate });
};
