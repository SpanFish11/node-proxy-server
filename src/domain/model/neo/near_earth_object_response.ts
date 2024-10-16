import { NEO } from './near_earth_object';
import { Link } from './link';

export interface NearEarthObjectsResponse {
  links: Link;
  near_earth_objects: Map<string, NEO[]>;
}
