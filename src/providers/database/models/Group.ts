import { model, models, Schema } from 'mongoose';

export interface IGroup {
  name: string;
  degree: string;
  subject: string;
  cycleId: string;
  active: boolean;
}

export interface GroupDocument extends IGroup, Document {}

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

export default models.Group || model<GroupDocument>('Group', GroupSchema);
