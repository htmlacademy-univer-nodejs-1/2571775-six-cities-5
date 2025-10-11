import mongoose from 'mongoose';
import { IUser, UserType } from '../models/index.js';
const { Schema } = mongoose;

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    password: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(UserType),
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', userSchema);
