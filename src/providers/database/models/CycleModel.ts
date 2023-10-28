import { Model, model, models, Schema } from 'mongoose';

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

const CycleModel: Model<CycleDocument> = models.Cycle ?? model('Cycle', CycleSchema);

export default CycleModel;
