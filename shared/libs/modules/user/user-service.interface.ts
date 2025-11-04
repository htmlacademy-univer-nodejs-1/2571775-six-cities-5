import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, CreateUserDto } from './index.js';
import { OfferEntity } from '../offer/index.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;

  addFavorite(userId: string, offerId: string): Promise<void>;
  removeFavorite(userId: string, offerId: string): Promise<void>;
  getFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
}
