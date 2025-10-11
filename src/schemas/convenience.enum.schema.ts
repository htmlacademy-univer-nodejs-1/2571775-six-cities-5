import mongoose from 'mongoose';
import { Convenience } from '../models/index.js';
const { Schema } = mongoose;


const convenienceSchema = new Schema(
  {
    name: {
      type: String,
      enum: Convenience,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ConvenienceSchema = mongoose.model('Convenience', convenienceSchema);
export default ConvenienceSchema;
