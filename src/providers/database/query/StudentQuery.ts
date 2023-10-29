import { IStudent } from '@/interfaces/student';

import DeliveryModel from '../models/DeliveryModel';
import StudentModel from '../models/StudentModel';

export const getStudents = async (page: number, limit: number) => {
  return await StudentModel.find()
    .populate('groupIds')
    .skip(page * limit)
    .limit(limit);
};

export const getActiveStudents = async () => {
  return await StudentModel.find({ active: true }).populate('groupIds');
};

export const getStudentsByGroup = async (groupId: string, page: number, limit: number) => {
  return await StudentModel.find({ groupId })
    .populate('groupIds')
    .skip(page * limit)
    .limit(limit);
};

export const getActiveStudentsByGroup = async (groupId: string) => {
  return await StudentModel.find({ groupId, active: true }).populate('groupIds');
};

export const getActiveStudentsByGroupWithoutWork = async (groupId: string, workId: string) => {
  const deliveries = await DeliveryModel.find({ workId }).select('studentId');
  const studentsId = deliveries.map((delivery) => delivery.studentId);
  return await StudentModel.find({ groupId, active: true, _id: { $nin: studentsId } }).populate(
    'groupIds',
  );
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
