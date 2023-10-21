import { model, Schema } from 'mongoose';

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    degree: { type: String, required: true },
    subject: { type: String, required: true },
    cycleId: { type: Schema.Types.ObjectId, ref: 'Cycle', required: true, index: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

const GroupModel = model('Group', GroupSchema);

export default GroupModel;
