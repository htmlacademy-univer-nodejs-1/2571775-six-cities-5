import { CreateRentalOfferDto } from '../../dtoModels/index.js';

export interface IRentalOfferService<T> {

  create(dto: CreateRentalOfferDto): Promise<T>;

  findAll(query: object): Promise<T[]>;

  update(id: string, data: Partial<T>): Promise<T | null>;

  delete(id: string): Promise<T | null>;

  addToFavorites(userId: string, offerId: string): Promise<boolean>;

  removeFromFavorites(userId: string, offerId: string): Promise<boolean>;

  getFavorites(userId: string): Promise<T[]>;

  getPremiumOffers(city: string, limit: number): Promise<T[]>;
}
