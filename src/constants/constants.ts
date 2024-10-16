const TYPES = {
  Application: Symbol.for('Application'),
  Configuration: Symbol.for('Configuration'),
  AxiosConfig: Symbol.for('AxiosConfig'),

  MeteorRepository: Symbol.for('MeteorRepository'),
  MeteorController: Symbol.for('MeteorController'),
  MeteorTransformer: Symbol.for('MeteorTransformer'),
  MeteorService: Symbol.for('MeteorService'),

  RoverRepository: Symbol.for('RoverRepository'),
  MarsPhotoTransformer: Symbol.for('MarsPhotoTransformer'),
  RoverService: Symbol.for('RoverService'),
  RoverController: Symbol.for('RoverController'),

  ErrorHandler: Symbol.for('ErrorHandler')
};

export { TYPES };
