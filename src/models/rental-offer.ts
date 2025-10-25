import { Document } from 'mongoose';
import { City, Convenience, Coordinate, HousingType } from './index.js';

export interface IRentalOffer extends Document {
  name: string;
  offerDescription: string;
  publicationDate: Date;
  city: City;
  previewUrl: string;
  housingImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentalCost: number;
  convenienceList: Convenience[];
  author: string;
  commentsCount: number;
  averageRating: number;
  offerCoordinates: Coordinate;
}

export type RentalOffer = {
  name: string;
  offerDescription: string;
  publicationDate: Date;
  city: City;
  previewUrl: string;
  housingImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomsCount: number;
  guestsCount: number;
  rentalCost: number;
  convenienceList: Convenience[];
  author: string;
  commentsCount: number;
  averageRating: number;
  offerCoordinates: Coordinate;
}
