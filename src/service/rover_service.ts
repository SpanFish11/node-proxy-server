import { MarsPhotoResponse } from '../domain/dto/marsPhoto/mars_photo_response';

interface RoverService {
  getPhotos: (userId: string, userName: string, apiKey: string) => Promise<MarsPhotoResponse>;
}

export { RoverService };
