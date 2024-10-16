import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import 'reflect-metadata';
import express, { Express, json, urlencoded } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './constants/constants';
import { Configuration } from './config/config';
import compression from 'compression';
import { MeteorController } from './controller/meteor_controller';
import nunjucks from 'nunjucks';
import { RoverController } from './controller/rover_controller';
import { ErrorHandler } from './common/error_handler';
import { StatusCodes } from 'http-status-codes';

@injectable()
class App {
  app: Express;
  server!: Server;
  port: number;

  constructor(
    @inject(TYPES.Configuration) private readonly configService: Configuration,
    @inject(TYPES.MeteorController) private readonly meteorController: MeteorController,
    @inject(TYPES.RoverController) private readonly roverController: RoverController,
    @inject(TYPES.ErrorHandler) private readonly errorHandler: ErrorHandler
  ) {
    this.configureSentry();

    this.app = express();
    this.port = Number(this.configService.get('PORT'));
  }

  configureNunjucks(): void {
    nunjucks.configure('src/views', {
      autoescape: true,
      express: this.app
    });

    this.app.set('view engine', 'html');
  }

  configureSentry(): void {
    Sentry.init({
      dsn: this.configService.get('SENTRY_DSN'),
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0
    });
  }

  useMiddleware(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(compression());
  }

  useRoutes(): void {
    this.app.use('/meteors', this.meteorController.router);
    this.app.use('/rovers', this.roverController.router);

    this.app.get('/health', (req, res) => {
      res.status(StatusCodes.OK).send();
    });
  }

  useExceptionFilters(): void {
    Sentry.setupExpressErrorHandler(this.app);

    this.app.use(this.errorHandler.catch.bind(this.errorHandler));

    this.app.use('*', (req, res) => {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' });
    });
  }

  public async init(): Promise<void> {
    this.configureNunjucks();
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    console.log(`[App] Server listening at http://localhost:${this.port}`);
  }

  public close(): void {
    this.server.close();
  }
}

export { App };
