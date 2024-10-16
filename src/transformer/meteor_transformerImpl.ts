import { NEO } from '../domain/model/neo/near_earth_object';
import { Meteor } from '../domain/dto/meteor/meteor';
import { MeteorTransformer } from './meteor_transformer';
import { injectable } from 'inversify';

@injectable()
class MeteorTransformerImpl implements MeteorTransformer {
  transformToDto(neo: NEO): Meteor {
    const diameterInMeters = neo.estimated_diameter.meters;

    return {
      id: neo.id,
      name: neo.name,
      diameter: {
        estimated_diameter_min: diameterInMeters.estimated_diameter_min,
        estimated_diameter_max: diameterInMeters.estimated_diameter_max
      },
      is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
      close_approach_date_full: neo.close_approach_data[0].close_approach_date_full,
      relative_velocity: Number(neo.close_approach_data[0].relative_velocity.kilometers_per_second)
    };
  }
}

export { MeteorTransformerImpl };
