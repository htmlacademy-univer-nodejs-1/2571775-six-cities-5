import { Document } from 'mongoose';
import { User } from './user.js';
import { RentalOffer } from './index.js';

export interface IComment extends Document {
  text: string;
  createdAt: Date;
  rating: number;
  author: User;
  rentalOffer: RentalOffer;
}

export type Comment = {
  text: string;
  createdAt: Date;
  rating: number;
  author: User;
};
