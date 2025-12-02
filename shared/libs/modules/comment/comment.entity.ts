import { defaultClasses, prop, Ref, modelOptions, getModelForClass } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({ schemaOptions: { collection: 'comments' } })
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public text!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({ default: 0 })
  public rating!: number;

  @prop({ ref: () => UserEntity, required: true })
  public author!: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
