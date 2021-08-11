import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'node:http';

export interface IGraphqlCustomContext {
  req: Request;
  res: Response;
  headers: IncomingHttpHeaders;
}
