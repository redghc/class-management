import { Document, Model, model, models, Schema } from 'mongoose';

export interface IAttendance {
  studentId: string;
  groupId: string;
  date: Date;
}

export interface AttendanceDocument extends IAttendance, Document {}

const AttendanceSchema = new Schema<AttendanceDocument>(
  {
    studentId: { type: String, required: true },
    groupId: { type: String, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

const AttendanceModel: Model<AttendanceDocument> =
  models.Attendance ?? model('Attendance', AttendanceSchema);

export default AttendanceModel;
