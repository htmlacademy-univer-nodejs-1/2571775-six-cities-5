import { types } from '@typegoose/typegoose';
import { ContainerModule } from 'inversify';
import { UserService, DefaultUserService, UserEntity, UserModel } from './index.js';
import { Component } from '../../../types/index.js';
import { UserController } from './index.js';
import { Controller } from '../../../libs/rest/index.js';

export function createUserContainer() {
  const containerModule = new ContainerModule((container) => {
    container.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
    container.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
    container.bind<Controller>(Component.UserController).to(UserController).inSingletonScope();
  });

  return containerModule;
}
