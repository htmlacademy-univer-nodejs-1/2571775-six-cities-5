import { Comment, User } from '../../models/index.js';
import { CreateCommentDto } from '../../dtoModels/index.js';

export interface ICommentService {
  getCommentsForOffer(offerId: string): Promise<Comment[]>;

  createComment(dto: CreateCommentDto, author: User): Promise<Comment>;
}
