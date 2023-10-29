import { Document } from 'mongoose';

import { RStudent } from './student';
import { RWork } from './work';

export interface IDelivery {
  workId: string;
  studentId: string;
  score: number;
  active: boolean;
}

export interface DeliveryDocument extends IDelivery, Document {}

export interface DeliveryForm extends IDelivery {}

export interface RDelivery {
  _id: string;
  workId: RWork;
  studentId: RStudent;
  score: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
