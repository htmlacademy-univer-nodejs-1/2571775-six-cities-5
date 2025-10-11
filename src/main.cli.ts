#!/usr/bin/env node

import axios from 'axios';
import chalk from 'chalk';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import 'reflect-metadata';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/component.emun.js';
import { TSVReader } from './cli/TSVReader.js';
import { TSVWriter } from './cli/TSVWriter.js';
import { DB } from './connect.db.js';
import { RentalOfferService } from './DatabaseServices/RentalOffer/RentalOfferService.js';
import { container } from './main.rest.js';
import { RentalOffer } from './models/rental-offer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rentalOfferService = container.get<RentalOfferService>(
  Component.RentalOfferService
);
const logger = container.get<Logger>(Component.Logger);
const db = container.get<DB>(Component.DB);
console.log(__dirname);

const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8')
).version;

const showHelp = () => {
  console.log(chalk.blue('Список команд:'));
  console.log(`${chalk.green('--help:')} выводит информацию о командах`);
  console.log(`${chalk.green('--version:')} выводит версию приложения`);
  console.log(`${chalk.green('--generate <n> <filepath> <data_url>:')} генерирует данные в файл`);
  console.log(
    `${chalk.green('--import <filename> <db_connection_string>:')} импортирует данные из TSV-файла`
  );
};

const importData = async (
  filePath: string,
  connectionString: string
): Promise<void> => {
  const reader: TSVReader = new TSVReader(filePath);
  await db
    .initialize(connectionString)
    .catch((err) => console.error('Ошибка инициализации базы данных:', err));
  let readNext = true;

  while (readNext) {
    const result = await reader.getRentalOffer();
    if (!result) {
      readNext = false;
      continue;
    }

    logger.info(JSON.stringify(result));
    const [rentalOffer, countRentalOffers] = result;

    try {
      const createResult = await rentalOfferService.create(rentalOffer);
      logger.info(
        chalk.green(
          `Успешно импортированы : ${countRentalOffers} предложений аренды`
        ),
        createResult
      );
    } catch (error) {
      logger.error(
        'Ошибка при сохранении предложения аренды в базу данных:',
        error as Error
      );
    }
  }
};

const generateData = async (
  countRentalOffers: number,
  filePath: string,
  url: string
): Promise<void> => {
  try {
    const response = await axios.get<RentalOffer[]>(url);
    const availableData = response.data;

    const tsvGenerator = new TSVWriter(filePath);
    for (let i = 0; i < countRentalOffers; i++) {
      const randomItem =
        availableData[Math.floor(Math.random() * availableData.length)];
      tsvGenerator.addRentalOffer(randomItem);
    }
    tsvGenerator.end();

  } catch (error) {
    console.error('Ошибка при получении данных с JSON-сервера:', error);
  }
};

const [, , command, ...args] = process.argv;
switch (command) {
  case '--help':
    showHelp();
    break;
  case '--version':
    console.log(chalk.yellow(`Версия приложения: ${version}`));
    break;
  case '--import':
    {
      const [filePath, connectionString] = args;
      importData(filePath, connectionString);
    }
    break;
  case '--generate': {
    const [nArg, filePath, url] = args;
    const countRentalOffers: number = parseInt(nArg, 10);
    generateData(countRentalOffers, filePath, url);
    break;
  }
  default:
    showHelp();
}
