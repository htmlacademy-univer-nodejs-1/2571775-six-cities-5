import { Document } from 'mongoose';
import { UserType } from './index.js';

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
  favoriteOffers: string[];
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
}
