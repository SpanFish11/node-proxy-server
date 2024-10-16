import { NextFunction, Request, Response } from 'express';
import Exception from './exception';

interface Middleware {
  execute:
    | ((req: Request, res: Response, next: NextFunction) => void)
    | ((err: Error | Exception, req: Request, res: Response, next: NextFunction) => void);
}

export { Middleware };
