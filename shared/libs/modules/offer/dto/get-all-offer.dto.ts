import { City } from '../../../../../src/models/index.js';

export class GetAllOfferDto {
  public city!: City;
  public limit!: number;
  public sortBy!: 'date' | 'price';
}
