import { Meteor } from './meteor';

export interface MeteorResponse {
  meteor_data: Meteor[];
  were_dangerous_meteors?: Meteor[];
  element_count?: number;
}
