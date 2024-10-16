import { NextFunction, Request, Response, Router } from 'express';
import { Middleware } from '../middleware';

interface Controller {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: Middleware[];
}

export { Controller };
