import { IDelivery } from '@/interfaces/delivery';

import DeliveryModel from '../models/DeliveryModel';

export const getDeliveries = async (page: number, limit: number) => {
  return await DeliveryModel.find({ active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getDeliveriesByWork = async (workId: string, page: number, limit: number) => {
  return await DeliveryModel.find({ workId, active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getDeliveriesByStudent = async (studentId: string, page: number, limit: number) => {
  return await DeliveryModel.find({ studentId, active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getDeliveryById = async (id: string) => {
  return await DeliveryModel.findById(id);
};

export const getTotalDeliveriesAndPages = async (limit: number) => {
  const total = await DeliveryModel.countDocuments({ active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const getTotalDeliveriesAndPagesByWork = async (workId: string, limit: number) => {
  const total = await DeliveryModel.countDocuments({ workId, active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const getTotalDeliveriesAndPagesByStudent = async (studentId: string, limit: number) => {
  const total = await DeliveryModel.countDocuments({ studentId, active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createDelivery = async (delivery: IDelivery) => {
  return await DeliveryModel.create(delivery);
};

export const updateDelivery = async (id: string, score: number) => {
  return await DeliveryModel.findByIdAndUpdate(id, { score });
};

export const changeDeliveryStatus = async (id: string, active: boolean) => {
  return await DeliveryModel.findByIdAndUpdate(id, { active });
};
