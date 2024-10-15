import { NextFunction, Request, Response } from 'express';

interface ErrorHandler {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

export { ErrorHandler };
