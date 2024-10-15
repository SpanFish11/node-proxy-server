import { MarsPhotoDto } from './mars_photo';

export interface MarsPhotoResponse {
  user_id: string;
  user_name: string;
  photos?: MarsPhotoDto[];
}
