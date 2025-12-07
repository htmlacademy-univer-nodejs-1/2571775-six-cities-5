import { Container } from 'inversify';
import 'reflect-metadata';
import { Component } from '../shared/types/index.js';
import { RestApplication } from './rest/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from '../shared/libs/modules/user/index.js';
import { createOfferContainer } from '../shared/libs/modules/offer/index.js';
import { createCommentContainer } from '../shared/libs/modules/comment/comment.container.js';
import { createAuthContainer } from '../shared/libs/modules/auth/auth.container.js';

export const appContainer = new Container();
appContainer.load(
  createRestApplicationContainer(),
  createUserContainer(),
  createOfferContainer(),
  createCommentContainer(),
  createAuthContainer(),
);

async function bootstrap() {
  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
