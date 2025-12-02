import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { CommentModel, CommentEntity, CommentService, DefaultCommentService } from './index.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../../libs/rest/index.js';
import { CommentController } from './index.js';

export function createCommentContainer() {
  const container = new Container();

  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return container;
}
