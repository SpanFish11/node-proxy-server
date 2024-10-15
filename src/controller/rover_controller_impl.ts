import { NextFunction, Request, Response } from 'express';
import { RoverController } from './rover_controller';
import { BaseController } from '../common/controller/base_controller';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants';
import { RoverService } from '../service/rover_service';
import { ValidationMiddleware } from '../middleware/validator/validator';
import { roverSchema } from '../middleware/validator/rover_schema';

interface RequestBody {
  user_id: string;
  user_name: string;
  api_key: string;
}

@injectable()
class RoverControllerImpl extends BaseController implements RoverController {
  constructor(@inject(TYPES.RoverService) private readonly roverService: RoverService) {
    super();
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getIndexPage
      },
      {
        path: '/photos',
        method: 'post',
        func: this.getPhotos,
        middlewares: [new ValidationMiddleware(roverSchema, 'body')]
      }
    ]);
  }

  async getIndexPage(req: Request, res: Response): Promise<void> {
    this.render(res, 'rover/index.html');
  }

  async getPhotos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { user_id: userId, user_name: userName, api_key: apiKey } = req.body as RequestBody;

      this.render(res, 'rover/rover_photos.html', await this.roverService.getPhotos(userId, userName, apiKey));
    } catch (error) {
      next(error);
    }
  }
}

export { RoverControllerImpl };
