import { IRentalOfferService } from './IRentalOfferService.js';
import { RentalOffer } from '../../schemas/index.js';
import { injectable } from 'inversify';
import { IRentalOffer } from '../../models/index.js';
import { CreateRentalOfferDto } from '../../dtoModels/index.js';
import { User } from '../../schemas/index.js';
import { QueryOptions } from 'mongoose';

@injectable()
export class RentalOfferService implements IRentalOfferService<IRentalOffer> {

  async findById(id: string): Promise<IRentalOffer | null> {
    return RentalOffer.findById(id).exec();
  }

  async create(dto: CreateRentalOfferDto): Promise<IRentalOffer> {
    const newRentalOffer = new RentalOffer(dto);
    return newRentalOffer.save();
  }

  async findAll(query: object = {}, city?: string, limit = 60, sortBy: 'date' | 'price' = 'date'): Promise<IRentalOffer[]> {

    if (city) {
      query = { ...query, city };
    }

    const options: QueryOptions = {
      limit: Math.min(Math.max(limit, 1), 1000),
    };

    if (sortBy === 'price') {
      options.sort = { price: 1 };
    } else if (sortBy === 'date') {
      options.sort = { createdAt: -1 };
    }

    return RentalOffer.find(query, null, options).exec();
  }


  async update(id: string, data: Partial<IRentalOffer>): Promise<IRentalOffer | null> {
    return RentalOffer.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<IRentalOffer | null> {
    return RentalOffer.findByIdAndDelete(id).exec();
  }

  async addToFavorites(userId: string, offerId: string): Promise<boolean> {
    const offer = await this.findById(offerId);
    if (!offer){
      throw new Error('Offer not found');
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.favoriteOffers.includes(offerId)) {
      user.favoriteOffers.push(offerId);
      await user.save();
      return true;
    }
    return false;
  }

  async removeFromFavorites(userId: string, offerId: string): Promise<boolean> {
    const user = await User.findById(userId);
    if (!user){
      throw new Error('User not found');
    }

    const offerIndex = user.favoriteOffers.indexOf(offerId);
    if (offerIndex === -1) {
      return false;
    }

    user.favoriteOffers.splice(offerIndex, 1);
    await user.save();
    return true;
  }

  async getFavorites(userId: string): Promise<IRentalOffer[]> {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    return RentalOffer.find({ '_id': { $in: user.favoriteOffers } }).exec();
  }

  async getPremiumOffers(city: string, limit = 3): Promise<IRentalOffer[]> {
    return RentalOffer.find({ city, isPremium: true }).limit(limit).exec();
  }
}
