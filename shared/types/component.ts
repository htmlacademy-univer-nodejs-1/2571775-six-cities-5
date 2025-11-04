export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DB: Symbol.for('DB'),
  UserService : Symbol.for('UserService'),
  OfferService: Symbol.for('OfferService'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserModel: Symbol.for('UserModel'),
  OfferModel: Symbol.for('OfferModel'),
  OfferController: Symbol.for('OfferController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  UserController: Symbol.for('UserController'),
} as const;
