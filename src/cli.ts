#!/usr/bin/env node

import chalk from 'chalk';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RentalOffer } from './models/rental-offer.js';
import { City } from './models/city.enum.js';
import { HousingType } from './models/housing-type.enum.js';
import { Convenience } from './models/convenience.enum.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const version = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
).version;

function parseEnum<T>(enumObj: T, key: string): T[keyof T] {
  return enumObj[key as keyof T];
}

const showHelp = () => {
  console.log(chalk.blue('Список команд:'));
  console.log(`${chalk.green('--help:')} выводит информацию о командах`);
  console.log(`${chalk.green('--version:')} выводит версию приложения`);
  console.log(`${chalk.green('--import <filename>:')} импортирует данные из TSV-файла`);
};

const importData = (filePath: string): RentalOffer[] | undefined => {

  if (!fs.existsSync(filePath)) {
    console.error(chalk.red('Файл не найден!'));
    return;
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split('\n');

  const offers: RentalOffer[] = lines.map((line) => {
    const fields = line.split('\t');
    const rentalOffer: RentalOffer = {
      name: fields[0],
      offerDescription: fields[1],
      publicationDate: new Date(fields[2]),
      city: parseEnum(City, fields[3]),
      previewUrl: fields[4],
      housingImages: fields[5] as unknown as string[],
      isPremium: fields[6] === 'true',
      isFavorite: fields[7] === 'true',
      rating: parseFloat(fields[8]),
      housingType: parseEnum(HousingType, fields[9]),
      roomsCount: parseInt(fields[10], 10),
      guestsCount: parseInt(fields[11], 10),
      rentalCost: parseInt(fields[12], 10),
      convenienceList: fields[13] as unknown as Convenience[],
      author: fields[14],
      commentsCount: parseInt(fields[15], 10),
      offerCoordinates: {
        latitude: parseFloat(fields[16]),
        longitude: parseFloat(fields[16]),
      },
    };
    return rentalOffer;
  });

  console.log(chalk.green('Данные успешно импортированы:'), offers);
  return offers;
};

const [, , command, args] = process.argv;
switch (command) {
  case '--help':
    showHelp();
    break;
  case '--version':
    console.log(chalk.yellow(`Версия приложения: ${version}`));
    break;
  case '--import':
    importData(args);
    break;
  default:
    showHelp();
}
