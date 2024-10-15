import { NEO } from '../domain/model/neo/near_earth_object';
import { Meteor } from '../domain/dto/meteor/meteor';

interface MeteorTransformer {
  transformToDto: (neo: NEO) => Meteor;
}

export { MeteorTransformer };
