import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { GetAllOfferDto } from '../index.js';

export type GetAllOfferRequest = Request<RequestParams, RequestBody, GetAllOfferDto>;
