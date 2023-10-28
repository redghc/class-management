import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  active: boolean;
  role: string;
}

export interface UserDocument extends IUser, Document {}

export interface RUser {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
