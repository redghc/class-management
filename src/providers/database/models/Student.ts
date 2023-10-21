import { model, models, Schema } from 'mongoose';

export interface IStudent {
  firstName: string;
  secondName?: string;
  lastName: string;
  secondLastName?: string;
  groupIds: string[];
  active: boolean;
}

export interface StudentDocument extends IStudent, Document {}

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

export default models.Student || model<StudentDocument>('Student', StudentSchema);
