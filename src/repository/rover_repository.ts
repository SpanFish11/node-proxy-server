import { MarsPhotoResponse } from '../domain/model/marsPhoto/mars_photo_response';

interface RoverRepository {
  getRoversPhotos: (sol: number, apiKey: string) => Promise<MarsPhotoResponse>;
}

export { RoverRepository };
