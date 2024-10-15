import { MarsPhoto } from '../domain/model/marsPhoto/mars_photo';
import { MarsPhotoDto } from '../domain/dto/marsPhoto/mars_photo';

interface MarsPhotoTransformer {
  transformToDto: (marsPhoto: MarsPhoto) => MarsPhotoDto;
}

export { MarsPhotoTransformer };
