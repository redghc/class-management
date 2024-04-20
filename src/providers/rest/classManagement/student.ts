import { IStudent, RStudent } from '@/interfaces/student';

import { ClassAPI } from './ClassAPI';

export interface StudentsResponse {
  status: string;
  data: RStudent[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface StudentsActiveResponse {
  status: string;
  data: RStudent[];
}

export interface StudentResponse {
  status: string;
  data: RStudent;
}

export const getStudents = async (page: number, limit: number) => {
  const response = await ClassAPI.get(
    `student?page=${page}&limit=${limit}`,
  ).json<StudentsResponse>();
  return response;
};

export const getActiveStudents = async () => {
  const response = await ClassAPI.get(`student/active`).json<StudentsActiveResponse>();
  return response;
};

export const getActiveStudentsByGroup = async (groupId: string) => {
  const response = await ClassAPI.get(
    `student/active?groupId=${groupId}`,
  ).json<StudentsActiveResponse>();
  return response;
};

export const getActiveStudentsByGroupWithoutWork = async (groupId: string, workId: string) => {
  const response = await ClassAPI.get(
    `student/active?groupId=${groupId}&neWorkId=${workId}`,
  ).json<StudentsActiveResponse>();
  return response;
};

export const getStudent = async (id: string) => {
  const response = await ClassAPI.get(`student/${id}`).json<StudentResponse>();
  return response;
};

export const createStudent = async (data: IStudent) => {
  const response = await ClassAPI.post('student', { json: data }).json<StudentResponse>();
  return response;
};

export const updateStudent = async (id: string, data: IStudent) => {
  const response = await ClassAPI.put(`student/${id}`, { json: data }).json<StudentResponse>();
  return response;
};

export const updateStudentStatus = async (id: string, status: boolean) => {
  const response = await ClassAPI.patch(`student/${id}`, {
    json: { active: status },
  }).json<StudentResponse>();
  return response;
};
