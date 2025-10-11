import mongoose from 'mongoose';
import { UserType } from '../models/index.js';
const { Schema } = mongoose;

const userTypeSchema = new Schema(
  {
    type: {
      type: String,
      enum: UserType,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserTypeSchema = mongoose.model('UserType', userTypeSchema);
export default UserTypeSchema;
