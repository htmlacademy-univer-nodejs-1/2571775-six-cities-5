import { TokenPayload } from './shared/libs/modules/auth/index.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
