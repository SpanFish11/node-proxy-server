import { injectable } from 'inversify';
import { Response, Router } from 'express';
import { Controller } from './controller';

@injectable()
abstract class BaseController {
  private readonly _router: Router;

  constructor() {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public render<T>(res: Response, view: string, data?: T): void {
    if (data) {
      return res.render(view, data);
    }
    return res.render(view);
  }

  protected bindRoutes(routes: Controller[]): void {
    routes.forEach(({ path, func, method, middlewares }) => {
      console.log(`Register [${method}] ${path}`);
      const middleware = middlewares?.map((m) => m.execute.bind(m));
      const handler = func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      // eslint-disable-next-line security/detect-object-injection
      this._router[method](path, pipeline);
    });
  }
}

export { BaseController };
