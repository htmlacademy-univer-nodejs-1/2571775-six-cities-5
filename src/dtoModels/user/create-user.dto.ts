import { UserType } from '../../models/index.js';

export type CreateUserDto = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
};
