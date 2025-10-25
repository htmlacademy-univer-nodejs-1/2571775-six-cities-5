import { RentalOffer } from '../../models/index.js';
import { CreateUserDto } from '../index.js';

export type CreateCommentDto = {
  text: string;
  createdAt: Date;
  rating: number;
  author: CreateUserDto;
  rentalOffer: RentalOffer;
};
