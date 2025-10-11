import mongoose from 'mongoose';
const { Schema } = mongoose;
import { City } from '../models/index.js';

const citySchema = new Schema(
  {
    name: {
      type: String,
      enum: City,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CitySchema = mongoose.model('City', citySchema);
export default CitySchema;
