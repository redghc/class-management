import { Document } from 'mongoose';

import { RGroup } from './group';

export interface IStudent {
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  groupIds: string[];
  active: boolean;
}

export interface StudentDocument extends IStudent, Document {}

export interface StudentForm extends IStudent {}

export interface RStudent {
  _id: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  groupIds: RGroup[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
