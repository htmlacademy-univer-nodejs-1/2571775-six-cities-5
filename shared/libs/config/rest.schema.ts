import convict from 'convict';
import validators from 'convict-format-with-validator';

convict.addFormats(validators);

export type RestSchema = {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  PORT: number;
  SALT: string;
  DB_HOST: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'IP address for the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_USER: {
    doc: 'Database user',
    format: String,
    env: 'DB_USER',
    default: 'name',
  },
  DB_PASSWORD: {
    doc: 'Database password',
    format: String,
    env: 'DB_PASSWORD',
    default: 'test',
  },
  DB_PORT: {
    doc: 'Database port',
    format: 'port',
    env: 'DB_PORT',
    default: 5454
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: 'base'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Upload directory',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  JWT_SECRET: {
    doc: 'Secret for sung JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
});
