import { Document } from 'mongoose';

import { RCycle } from './cycle';

export interface IGroup {
  name: string;
  degree: GroupDegree;
  subject: GroupSubject;
  cycleId: string;
  active: boolean;
}

export enum GroupDegree {
  FIRST = 'first',
  SECOND = 'second',
  THIRD = 'third',
  FOURTH = 'fourth',
  FIFTH = 'fifth',
  SIXTH = 'sixth',
}

export enum GroupSubject {
  MATH = 'math',
  SPANISH = 'spanish',
  CHEMISTRY = 'chemistry',
  PHYSICS = 'physics',
  BIOLOGY = 'biology',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
  ENGLISH = 'english',
}

export interface GroupForm extends IGroup {}

export interface GroupDocument extends IGroup, Document {}

export interface RGroup {
  _id: string;
  name: string;
  degree: GroupDegree;
  subject: GroupSubject;
  cycleId: RCycle;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
