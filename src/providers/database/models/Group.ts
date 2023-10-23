import { model, models, Schema } from 'mongoose';

import { GroupDegree, GroupDocument, GroupSubject } from '@/interfaces/group';

const GroupSchema = new Schema(
  {
    name: { type: String, required: true },
    degree: { type: String, required: true, enum: Object.values(GroupDegree) },
    subject: { type: String, required: true, enum: Object.values(GroupSubject) },
    cycleId: { type: Schema.Types.ObjectId, ref: 'Cycle', required: true, index: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

export default models.Group || model<GroupDocument>('Group', GroupSchema);
