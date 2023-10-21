import { Document, model, models, Schema } from 'mongoose';

export interface ICycle {
  name: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
}

export interface CycleDocument extends ICycle, Document {}

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
