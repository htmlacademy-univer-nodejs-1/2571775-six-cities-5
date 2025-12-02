import { Request } from 'express';
import { RequestBody, RequestParams } from '../../../rest/index.js';
import { CommentDto } from '../index.js';

export type CreateCommentRequest = Request<RequestParams, RequestBody, CommentDto>;
