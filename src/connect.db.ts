import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import mongoose from 'mongoose';
import { Component } from '../shared/types/component.js';
import { Logger } from 'pino';

@injectable()
export class DB {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {}

  async connectToDatabase(url: string): Promise<void> {
    this.logger.info('Попытка установить соединение с базой данных...');

    try {
      await mongoose.connect(url);
      this.logger.info('Соединение с базой данных успешно установлено.');
    } catch (error) {
      this.logger.error('Ошибка при попытке подключения к базе данных:');
    }
  }

  private setupConnectionHandlers(): void {
    mongoose.connection.on('connected', () => {
      this.logger.info('Mongoose подключен к базе данных.');
    });

    mongoose.connection.on('disconnected', () => {
      this.logger.info('Mongoose отключен от базы данных.');
    });

    mongoose.connection.on('error', (error) => {
      this.logger.error('Ошибка подключения Mongoose:', error);
    });
  }

  private async closeConnection(): Promise<void> {
    await mongoose.connection.close();
    this.logger.info('Соединение с базой данных закрыто.');
  }

  public async initialize(url: string): Promise<void> {
    await this.connectToDatabase(url);
    this.setupConnectionHandlers();

    process.on('SIGINT', async () => {
      await this.closeConnection();
    });
  }
}
