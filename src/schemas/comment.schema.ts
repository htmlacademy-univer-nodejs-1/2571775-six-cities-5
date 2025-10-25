import mongoose from 'mongoose';
import { IComment } from '../models/index.js';
const { Schema } = mongoose;

const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    rating: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rentalOffer: { type: Schema.Types.ObjectId, ref: 'RentalOffer', required: true },
  },
  {
    timestamps: true,
  }
);

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
