import { Document } from 'mongoose';

import { RGroup } from './group';

export interface IWork {
  name: string;
  description?: string;
  limitDate?: Date;
  groupId: string;
  active: boolean;
}

export interface WorkDocument extends IWork, Document {}

export interface RWork {
  _id: string;
  name: string;
  description?: string;
  limitDate?: string;
  groupId: RGroup;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
