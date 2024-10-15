import { Link } from './link';
import { EstimatedDiameter } from './estimated_diameter';
import { CloseApproachData } from './close_approach_data';

export interface NEO {
  links: Link;
  id: string;
  neo_reference_id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: EstimatedDiameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
}
