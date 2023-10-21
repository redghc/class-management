import StudentModel from '../models/Student';

export const getStudents = async (page: number, limit: number) => {
  return await StudentModel.find({ active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getStudentsByGroup = async (groupId: string, page: number, limit: number) => {
  return await StudentModel.find({ groupId, active: true })
    .skip(page * limit)
    .limit(limit);
};

export const getStudentById = async (id: string) => {
  return await StudentModel.findById(id);
};

export const getTotalStudentsAndPages = async (limit: number) => {
  const total = await StudentModel.countDocuments({ active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const getTotalStudentsAndPagesByGroup = async (groupId: string, limit: number) => {
  const total = await StudentModel.countDocuments({ groupId, active: true });
  const pages = Math.ceil(total / limit);
  return { total, pages };
};

export const createStudent = async (
  firstName: string,
  secondName: string,
  lastName: string,
  secondLastName: string,
  groupIds: string[],
) => {
  return await StudentModel.create({ firstName, secondName, lastName, secondLastName, groupIds });
};

export const updateStudent = async (
  id: string,
  firstName: string,
  secondName: string,
  lastName: string,
  secondLastName: string,
  groupIds: string[],
) => {
  return await StudentModel.findByIdAndUpdate(id, {
    firstName,
    secondName,
    lastName,
    secondLastName,
    groupIds,
  });
};

export const changeStudentStatus = async (id: string, active: boolean) => {
  return await StudentModel.findByIdAndUpdate(id, { active });
};
