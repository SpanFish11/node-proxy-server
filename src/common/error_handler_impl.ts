import { Request, Response } from 'express';
import Exception from './exception';
import { ErrorHandler } from './error_handler';
import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

@injectable()
class ErrorHandlerImpl implements ErrorHandler {
  catch(error: Error, req: Request, res: Response): void {
    if (error instanceof Exception) {
      console.error(`[${error.code}]: ${error.message}`);

      const body = {
        error: {
          code: error.code,
          message: error.message,
          details: error.details
        }
      };

      res.status(error.code).json(body);
    }

    console.error(`[${StatusCodes.INTERNAL_SERVER_ERROR}]: ${error.message}`);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Server Error'
    });
  }
}

export { ErrorHandlerImpl };
