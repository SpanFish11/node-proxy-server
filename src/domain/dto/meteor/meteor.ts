import { Diameter } from './diametr';

export interface Meteor {
  id: string;
  name: string;
  diameter: Diameter;
  is_potentially_hazardous_asteroid: boolean;
  close_approach_date_full: string;
  relative_velocity: number;
}
