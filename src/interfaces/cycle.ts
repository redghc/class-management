import { DateTime } from 'luxon';
import { Document } from 'mongoose';

export interface ICycle {
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface CycleDocument extends ICycle, Document {}

export interface CycleForm extends Omit<ICycle, 'startDate' | 'endDate'> {
  startDate: DateTime | null;
  endDate: DateTime | null;
}

export interface RCycle {
  _id: string;
  name: string;
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
