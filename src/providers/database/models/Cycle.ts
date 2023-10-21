import { model, Schema } from 'mongoose';

const CycleSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    active: { type: Boolean, required: true, default: true, index: true },
  },
  {
    timestamps: true,
  },
);

const CycleModel = model('Cycle', CycleSchema);

export default CycleModel;
