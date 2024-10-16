import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Exception from '../../common/exception';
import { Middleware } from '../../common/middleware';
import { StatusCodes } from 'http-status-codes';

class ValidationMiddleware implements Middleware {
  constructor(
    private readonly schema: Schema,
    private readonly source: 'body' | 'query' | 'params' | 'headers'
  ) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req[this.source], { abortEarly: false });

    if (error) {
      next(
        new Exception(
          StatusCodes.BAD_REQUEST,
          'Validation Error',
          error.details.map((detail) => ({
            field: detail.context?.label,
            message: detail.message
          }))
        )
      );
    }

    next();
  }
}

export { ValidationMiddleware };
