import { Container } from 'inversify';
import 'reflect-metadata';
import { Config, RestConfig, RestSchema } from '../shared/libs/config/index.js';
import { Logger, PinoLogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { DB } from './connect.db.js';
import { UserService } from './DatabaseServices/User/UserService.js';
import { RentalOfferService } from './DatabaseServices/RentalOffer/RentalOfferService.js';
import { RestApplication } from './rest/index.js';

export const container = new Container();

async function bootstrap() {
  container
    .bind<RestApplication>(Component.RestApplication)
    .to(RestApplication)
    .inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container
    .bind<Config<RestSchema>>(Component.Config)
    .to(RestConfig)
    .inSingletonScope();
  container.bind<DB>(Component.DB).to(DB);
  container
    .bind<UserService>(Component.UserService)
    .to(UserService)
    .inSingletonScope();
  container.
    bind<RentalOfferService>(Component.RentalOfferService)
    .to(RentalOfferService)
    .inSingletonScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
