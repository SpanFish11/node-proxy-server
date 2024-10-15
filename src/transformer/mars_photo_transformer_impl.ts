import { MarsPhotoDto } from '../domain/dto/marsPhoto/mars_photo';
import { MarsPhoto } from '../domain/model/marsPhoto/mars_photo';
import { MarsPhotoTransformer } from './mars_photo_transformer';
import { injectable } from 'inversify';

@injectable()
class MarsPhotoTransformerImpl implements MarsPhotoTransformer {
  transformToDto(marsPhoto: MarsPhoto): MarsPhotoDto {
    const rover = marsPhoto.rover;

    return {
      img_src: marsPhoto.img_src,
      camera_full_name: marsPhoto.camera.full_name,
      rover_name: rover.name,
      rover_status: rover.status,
      rover_launch_date: rover.launch_date,
      rover_landing_date: rover.landing_date,
      earth_date: marsPhoto.earth_date
    };
  }
}

export { MarsPhotoTransformerImpl };
