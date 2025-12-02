import { DocumentExists } from '../../../types/document-exists.interface.js';
import { CreateOfferDto, EditOfferDto, OfferEntity } from './index.js';
import { DocumentType } from '@typegoose/typegoose';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findAll(city?: string, limit?: number, sortBy?: 'date' | 'price'): Promise<DocumentType<OfferEntity>[]>;
  findPremium(city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  edit(offerId: string, dto: EditOfferDto): Promise<DocumentType<OfferEntity>>;
  delete(offerId: string): Promise<DocumentType<OfferEntity>>;
  exists(documentId: string): Promise<boolean>
}
