import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { TYPES } from './constants/constants';
import { MeteorController } from './controller/meteor_controller';
import { MeteorControllerImpl } from './controller/meteor_controller_impl';
import { MeteorRepository } from './repository/meteors_repository';
import { MeteorRepositoryImpl } from './repository/meteors_repository_impl';
import { MeteorTransformer } from './transformer/meteor_transformer';
import { MeteorTransformerImpl } from './transformer/meteor_transformerImpl';
import { MeteorService } from './service/meteor_service';
import { MeteorServiceImpl } from './service/meteor_service_impl';
import { Configuration } from './config/config';
import { ConfigurationService } from './config/config_service';
import { AxiosConfig } from './config/axios_config';
import { AxiosService } from './config/axios_service';
import { RoverRepository } from './repository/rover_repository';
import { RoverRepositoryImpl } from './repository/rover_repository_impl';
import { MarsPhotoTransformer } from './transformer/mars_photo_transformer';
import { MarsPhotoTransformerImpl } from './transformer/mars_photo_transformer_impl';
import { RoverService } from './service/rover_service';
import { RoverServiceImpl } from './service/rover_service_impl';
import { RoverController } from './controller/rover_controller';
import { RoverControllerImpl } from './controller/rover_controller_impl';
import { ErrorHandler } from './common/error_handler';
import { ErrorHandlerImpl } from './common/error_handler_impl';

interface Bootstrap {
  appContainer: Container;
  app: App;
}

export const appBinging = new ContainerModule((bind: interfaces.Bind) => {
  bind<Configuration>(TYPES.Configuration).to(ConfigurationService).inSingletonScope();
  bind<AxiosConfig>(TYPES.AxiosConfig).to(AxiosService).inSingletonScope();
  bind<ErrorHandler>(TYPES.ErrorHandler).to(ErrorHandlerImpl).inSingletonScope();

  bind<MeteorController>(TYPES.MeteorController).to(MeteorControllerImpl).inSingletonScope();
  bind<MeteorRepository>(TYPES.MeteorRepository).to(MeteorRepositoryImpl).inSingletonScope();
  bind<MeteorTransformer>(TYPES.MeteorTransformer).to(MeteorTransformerImpl).inSingletonScope();
  bind<MeteorService>(TYPES.MeteorService).to(MeteorServiceImpl).inSingletonScope();

  bind<RoverRepository>(TYPES.RoverRepository).to(RoverRepositoryImpl).inSingletonScope();
  bind<MarsPhotoTransformer>(TYPES.MarsPhotoTransformer).to(MarsPhotoTransformerImpl).inSingletonScope();
  bind<RoverService>(TYPES.RoverService).to(RoverServiceImpl).inSingletonScope();
  bind<RoverController>(TYPES.RoverController).to(RoverControllerImpl).inSingletonScope();

  bind<App>(TYPES.Application).to(App);
});

const bootstrap = (): Bootstrap => {
  const appContainer = new Container();
  appContainer.load(appBinging);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
