import { model, models, Schema } from 'mongoose';

import { CycleDocument } from '@/interfaces/cycle';

const CycleSchema = new Schema<CycleDocument>(
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

export default models.Cycle || model<CycleDocument>('Cycle', CycleSchema);
