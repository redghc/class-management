import CycleModel from '../models/Cycle';

export const getCycles = async (page: number, limit: number) => {
  return await CycleModel.find({ active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getCycleById = async (id: string) => {
  return await CycleModel.findById(id);
};

export const getTotalCyclesAndPages = async (limit: number) => {
  const total = await CycleModel.countDocuments({ active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createCycle = async (name: string, startDate: Date, endDate: Date) => {
  return await CycleModel.create({ name, startDate, endDate });
};

export const updateCycle = async (id: string, name: string, startDate: Date, endDate: Date) => {
  return await CycleModel.findByIdAndUpdate(id, { name, startDate, endDate });
};

export const enableDisableCycle = async (id: string, active: boolean) => {
  return await CycleModel.findByIdAndUpdate(id, { active });
};
