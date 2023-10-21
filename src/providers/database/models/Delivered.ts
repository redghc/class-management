import { model, Schema } from 'mongoose';

const DeliveredSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true, index: true },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true, index: true },
    score: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

const DeliveredModel = model('Delivered', DeliveredSchema);

export default DeliveredModel;
