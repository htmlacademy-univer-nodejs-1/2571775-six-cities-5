import { ContainerModule } from 'inversify';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../../types/index.js';
import { DefaultAuthService } from './default-auth.service.js';
import { ExceptionFilter } from '../../../libs/rest/index.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainerModule = new ContainerModule((container) => {
    container.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
    container.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();
  });
  return authContainerModule;
}
