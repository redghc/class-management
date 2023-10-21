import { model, Schema } from 'mongoose';

const WorkSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    subject: { type: String, required: true },
    cycleId: { type: Schema.Types.ObjectId, ref: 'Cycle', required: true, index: true },
    groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true, index: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

const WorkModel = model('Work', WorkSchema);

export default WorkModel;
