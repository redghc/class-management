import { Model, model, models, Schema } from 'mongoose';

import { UserDocument } from '@/interfaces/user';

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    password: { type: String, required: true },
    active: { type: Boolean, required: true, default: true, index: true },
    role: { type: String, required: true, default: 'user' },
  },
  {
    timestamps: true,
  },
);

const UserModel: Model<UserDocument> = models.User ?? model('User', UserSchema);

export default UserModel;
