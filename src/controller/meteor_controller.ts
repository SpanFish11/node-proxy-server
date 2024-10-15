import { NextFunction, Request, Response, Router } from 'express';

interface MeteorController {
  router: Router;
  getMeteors: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export { MeteorController };
