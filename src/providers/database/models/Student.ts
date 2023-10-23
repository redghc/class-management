import { model, models, Schema } from 'mongoose';

import { StudentDocument } from '@/interfaces/student';

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    secondName: { type: String, required: false },
    lastName: { type: String, required: true },
    secondLastName: { type: String, required: false },
    groupIds: [{ type: Schema.Types.ObjectId, ref: 'Group', required: true, index: true }],
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

export default models.Student ?? model<StudentDocument>('Student', StudentSchema);
