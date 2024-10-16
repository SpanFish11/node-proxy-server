import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/controller/base_controller';
import { MeteorController } from './meteor_controller';
import { TYPES } from '../constants/constants';
import { MeteorService } from '../service/meteor_service';
import { ValidationMiddleware } from '../middleware/validator/validator';
import { meteorSchema } from '../middleware/validator/meteor_schema';

interface RequestQuery {
  date?: string;
  count?: boolean;
  wereDangerousMeteors?: boolean;
}

@injectable()
class MeteorControllerImpl extends BaseController implements MeteorController {
  constructor(@inject(TYPES.MeteorService) private readonly meteorService: MeteorService) {
    super();
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getMeteors,
        middlewares: [new ValidationMiddleware(meteorSchema, 'query')]
      }
    ]);
  }

  async getMeteors(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { date, count, wereDangerousMeteors } = req.query as RequestQuery;

      this.render(
        res,
        'meteor/meteor_data.html',
        await this.meteorService.getMeteors(date, count, wereDangerousMeteors)
      );
    } catch (error) {
      return next(error);
    }
  }
}

export { MeteorControllerImpl };
