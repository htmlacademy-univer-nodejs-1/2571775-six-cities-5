import { CreateUserDto } from '../../../shared/libs/modules/user/index.js';
import { RentalOffer } from '../../models/index.js';

export type CreateCommentDto = {
  text: string;
  createdAt: Date;
  rating: number;
  author: CreateUserDto;
  rentalOffer: RentalOffer;
};
