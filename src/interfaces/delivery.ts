import { Document } from 'mongoose';

import { RStudent } from './student';
import { RWork } from './work';

export interface IDelivery {
  studentId: string;
  workId: string;
  score: number;
  active: boolean;
}

export interface DeliveryDocument extends IDelivery, Document {}

export interface RDelivery {
  _id: string;
  studentId: RStudent;
  workId: RWork;
  score: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
