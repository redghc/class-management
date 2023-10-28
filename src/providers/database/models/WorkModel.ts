import { Model, model, models, Schema } from 'mongoose';

import { WorkDocument } from '@/interfaces/work';

const WorkSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    limitDate: { type: Date, required: false },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

const WorkModel: Model<WorkDocument> = models.Work ?? model<WorkDocument>('Work', WorkSchema);

export default WorkModel;
