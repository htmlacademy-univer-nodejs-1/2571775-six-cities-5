import { inject, injectable } from 'inversify';
import { CommentService, CommentDto, CommentEntity } from './index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  public async create(dto: CommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);
    return result;
  }

  public async findById(id: string): Promise<DocumentType<CommentEntity> | null> {
    return this.commentModel.findById(id).exec();
  }

  public async findAll(): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel.find().exec();
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }
}
