import * as fs from 'node:fs';
import * as readline from 'node:readline';
import { HousingType } from '../../shared/enums/housing-type.enum.js';
import { City } from '../models/city.enum.js';
import { Convenience } from '../models/convenience.enum.js';
import { CreateOfferDto } from '../../shared/libs/modules/offer/index.js';
import { Types } from 'mongoose';

function parseEnum<T>(enumObj: T, key: string): T[keyof T] {
  return enumObj[key as keyof T];
}

export class TSVReader {
  private readStream: fs.ReadStream;
  private getNextLine: AsyncIterableIterator<string>;
  private countRentalOffers: number;

  constructor(filePath: string) {
    this.readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
    this.getNextLine = readline
      .createInterface({
        input: this.readStream,
        crlfDelay: Infinity,
      })[Symbol.asyncIterator]();
    this.countRentalOffers = 0;
  }

  public async getRentalOffer(): Promise<[CreateOfferDto, number] | undefined> {
    const { value, done } = await this.getNextLine.next();
    if (done) {
      this.readStream.close();
      return undefined;
    }
    this.countRentalOffers++;
    const rentalOffer = this.parseRentalOffer(value.split('\t'));
    return [rentalOffer, this.countRentalOffers];
  }

  public parseRentalOffer(fields: string[]): CreateOfferDto {
    return {
      id: '',
      name: fields[0],
      offerDescription: fields[1],
      publicationDate: new Date(fields[2]),
      city: parseEnum(City, fields[3]),
      previewUrl: fields[4],
      housingImages: fields[5] as unknown as string[],
      isPremium: fields[6] === 'true',
      isFavorite: fields[7] === 'true',
      rating: parseFloat(fields[8]),
      housingType: parseEnum(HousingType, fields[9]),
      roomsCount: parseInt(fields[10], 10),
      guestsCount: parseInt(fields[11], 10),
      rentalCost: parseInt(fields[12], 10),
      convenienceList: fields[13].split(';') as Convenience[],
      author: this.normalizeToObjectId(Buffer.from(fields[14]).toString('hex')),
      commentsCount: parseInt(fields[15], 10),
      averageRating: parseFloat(fields[16]),
      offerCoordinates: {
        latitude: parseFloat(fields[17].split(', ')[0]),
        longitude: parseFloat(fields[17].split(', ')[1]),
      },
    };
  }

  private normalizeToObjectId(idString: string): Types.ObjectId {
    if (idString.length < 24) {
      idString = idString.padEnd(24, '0');
    } else if (idString.length > 24) {
      idString = idString.substring(0, 24);
    }

    return new Types.ObjectId(idString);
  }
}
