import { ParamsDictionary } from 'express-serve-static-core';
import { City } from '../../../../../src/models';

export type ParamsGetAll = {
    city: City,
    limit: number,
    orderBy: string
} | ParamsDictionary;
