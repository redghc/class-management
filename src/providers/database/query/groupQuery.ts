import GroupModel from '../models/Group';

export const getGroups = async (page: number, limit: number) => {
  return await GroupModel.find({ active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getGroupById = async (id: string) => {
  return await GroupModel.findById(id);
};

export const getTotalGroupsAndPages = async (limit: number) => {
  const total = await GroupModel.countDocuments({ active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createGroup = async (
  name: string,
  degree: string,
  subject: string,
  cycleId: string,
) => {
  return await GroupModel.create({ name, degree, subject, cycleId });
};

export const updateGroup = async (
  id: string,
  name: string,
  degree: string,
  subject: string,
  cycleId: string,
) => {
  return await GroupModel.findByIdAndUpdate(id, { name, degree, subject, cycleId });
};

export const changeGroupStatus = async (id: string, active: boolean) => {
  return await GroupModel.findByIdAndUpdate(id, { active });
};
