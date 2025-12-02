import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { OfferModel, OfferEntity, OfferService, DefaultOfferService } from './index.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../../libs/rest/index.js';
import { OfferController } from './index.js';
import { CommentEntity, CommentModel, CommentService, DefaultCommentService } from '../comment/index.js';

export function createOfferContainer() {
  const containerModule = new ContainerModule((container) => {
    container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
    container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
    container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
    container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
    container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  });

  return containerModule;
}
