import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { OfferModel, OfferEntity, OfferService, DefaultOfferService } from './index.js';
import { Component } from '../../../types/index.js';
import { Controller } from '../../../libs/rest/index.js';
import { OfferController } from './index.js';

export function createOfferContainer() {
  const containerModule = new ContainerModule((container) => {
    container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
    container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
    container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  });

  return containerModule;
}
