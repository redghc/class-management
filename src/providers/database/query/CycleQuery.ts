import { ICycle } from '@/interfaces/cycle';

import CycleModel from '../models/CycleModel';

export const getCycles = async (page: number, limit: number) => {
  return await CycleModel.find()
    .skip(page * limit)
    .limit(limit);
};

export const getActiveCycles = async () => {
  return await CycleModel.find({ active: true });
};

export const getCycleById = async (id: string) => {
  return await CycleModel.findById(id);
};

export const getTotalCyclesAndPages = async (limit: number) => {
  const total = await CycleModel.countDocuments({ active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createCycle = async (cycle: ICycle) => {
  return await CycleModel.create(cycle);
};

export const updateCycle = async (id: string, cycle: ICycle) => {
  return await CycleModel.findByIdAndUpdate(id, cycle);
};

export const changeCycleStatus = async (id: string, active: boolean) => {
  return await CycleModel.findByIdAndUpdate(id, { active });
};
