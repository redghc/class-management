import { model, models, Schema } from 'mongoose';

export interface IWork {
  name: string;
  description?: string;
  limitDate?: Date;
  groupId: string;
  active: boolean;
}

export interface WorkDocument extends IWork, Document {}

const WorkSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    limitDate: { type: Date, required: false },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

export default models.Work ?? model<WorkDocument>('Work', WorkSchema);
