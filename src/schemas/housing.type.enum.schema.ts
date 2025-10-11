import mongoose from 'mongoose';
import { HousingType } from '../models/index.js';
const { Schema } = mongoose;

const housingTypeSchema = new Schema(
  {
    type: {
      type: String,
      enum: HousingType,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HousingTypeSchema = mongoose.model('HousingType', housingTypeSchema);
export default HousingTypeSchema;
