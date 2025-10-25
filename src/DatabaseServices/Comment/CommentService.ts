import { ICommentService } from './ICommentService.js';
import { IComment } from '../../models/index.js';
import { CreateCommentDto } from '../../dtoModels/index.js';
import { Comment, RentalOffer } from '../../schemas/index.js';
import { User } from '../../models/index.js';

export class CommentService implements ICommentService {

  async getCommentsForOffer(offerId: string): Promise<IComment[]> {
    try {
      const comments = await Comment.find({ rentalOffer: offerId }).exec();
      return comments;
    } catch (error) {
      throw new Error('Не удалось получить комментарии для предложения');
    }
  }

  async createComment(dto: CreateCommentDto, author: User): Promise<IComment> {
    try {
      const rentalOffer = await RentalOffer.findById(dto.rentalOffer);
      if (!rentalOffer) {
        throw new Error('Предложение не найдено');
      }

      const newComment = new Comment({
        text: dto.text,
        rating: dto.rating,
        author: author,
        rentalOffer: dto.rentalOffer,
      });

      await RentalOffer.updateOne(
        { _id: dto.rentalOffer },
        { $inc: { commentCount: 1 } }
      );

      await RentalOffer.updateOne(
        { _id: dto.rentalOffer },
        { $set: { rating: (rentalOffer.averageRating * rentalOffer.commentsCount + dto.rating) / (rentalOffer.commentsCount + 1) } }
      );

      await newComment.save();
      return newComment;
    } catch (error) {
      throw new Error('Ошибка при создании комментария');
    }
  }
}
