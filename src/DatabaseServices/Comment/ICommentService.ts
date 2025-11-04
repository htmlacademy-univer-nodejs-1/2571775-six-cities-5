import { CreateCommentDto } from '../../dtoModels/comment/create-comment.dto.js';
import { Comment, User } from '../../models/index.js';

export interface ICommentService {
  getCommentsForOffer(offerId: string): Promise<Comment[]>;

  createComment(dto: CreateCommentDto, author: User): Promise<Comment>;
}
