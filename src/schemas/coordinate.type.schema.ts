import mongoose from 'mongoose';
const { Schema } = mongoose;

const coordinateSchema = new Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const CoordinateSchema = mongoose.model('Coordinate', coordinateSchema);
export default CoordinateSchema;
