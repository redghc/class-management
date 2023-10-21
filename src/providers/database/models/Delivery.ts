import { model, models, Schema } from 'mongoose';

export interface IDelivery {
  studentId: string;
  workId: string;
  score: number;
  active: boolean;
}

export interface DeliveryDocument extends IDelivery, Document {}

const DeliverySchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    workId: { type: Schema.Types.ObjectId, ref: 'Task', required: true, index: true },
    score: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

export default models.Delivered || model<DeliveryDocument>('Delivered', DeliverySchema);
