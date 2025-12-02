import { Expose, Type } from 'class-transformer';
import { CreateUserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public test!: string;

  @Expose()
  public publicationDate!: string;

  @Expose({ name: 'createdAt'})
  public rating!: number;

  @Expose({ name: 'userId'})
  @Type(() => CreateUserRdo)
  public authorId!: CreateUserRdo;
}
