import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { EditOfferDto } from '../index.js';

export type EditOfferRequest = Request<RequestParams, RequestBody, EditOfferDto>;
