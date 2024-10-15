import { Velocity } from './velocity';
import { MissDistance } from './miss_distance';

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: Velocity;
  miss_distance: MissDistance;
  orbiting_body: string;
}
