import { Document } from 'mongoose';
import { UserType } from './user-type.enum.js';

export interface IUser extends Document {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
}
