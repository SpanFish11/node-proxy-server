import { NextFunction, Request, Response, Router } from 'express';

interface RoverController {
  router: Router;
  getIndexPage: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getPhotos: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export { RoverController };
