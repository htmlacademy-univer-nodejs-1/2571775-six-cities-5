import mongoose from 'mongoose';
const { Schema } = mongoose;


import { City, Convenience, HousingType, IRentalOffer } from '../models/index.js';

const rentalOfferSchema = new Schema(
  {
    name: { type: String, required: true },
    offerDescription: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    city: { type: String, enum: Object.values(City), required: true },
    previewUrl: { type: String, required: true },
    housingImages: { type: [String], required: true },
    isPremium: { type: Boolean, required: true },
    isFavorite: { type: Boolean, required: true },
    rating: { type: Number, required: true },
    housingType: { type: [String], enum: Object.values(HousingType), required: true },
    roomsCount: { type: Number, required: true },
    guestsCount: { type: Number, required: true },
    rentalCost: { type: Number, required: true },
    convenienceList: { type: [String], enum: Object.values(Convenience), required: true },
    averageRating: { type: Number, required: true },
    author: { type: String, required: true },
    commentsCount: { type: Number, required: true },
    offerCoordinates: {
      type: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RentalOffer = mongoose.model<IRentalOffer>('RentalOffer', rentalOfferSchema);
