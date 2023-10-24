import { IStudent } from '@/interfaces/student';

import StudentModel from '../models/StudentModel';

export const getStudents = async (page: number, limit: number) => {
  return await StudentModel.find()
    .populate('groupIds')
    .skip(page * limit)
    .limit(limit);
};

export const getStudentsByGroup = async (groupId: string, page: number, limit: number) => {
  return await StudentModel.find({ groupId })
    .populate('groupIds')
    .skip(page * limit)
    .limit(limit);
};

export const getStudentById = async (id: string) => {
  return await StudentModel.findById(id).populate('groupIds');
};

export const getTotalStudentsAndPages = async (limit: number) => {
  const total = await StudentModel.countDocuments();
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const getTotalStudentsAndPagesByGroup = async (groupId: string, limit: number) => {
  const total = await StudentModel.countDocuments({ groupId });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createStudent = async (student: IStudent) => {
  return await StudentModel.create(student);
};

export const updateStudent = async (id: string, student: IStudent) => {
  return await StudentModel.findByIdAndUpdate(id, student);
};

export const changeStudentStatus = async (id: string, active: boolean) => {
  return await StudentModel.findByIdAndUpdate(id, { active });
};
