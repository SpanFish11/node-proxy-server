import { MarsPhotoResponse } from '../domain/dto/marsPhoto/mars_photo_response';
import { RoverService } from './rover_service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants';
import { RoverRepository } from '../repository/rover_repository';
import { MarsPhotoTransformer } from '../transformer/mars_photo_transformer';

@injectable()
export class RoverServiceImpl implements RoverService {
  constructor(
    @inject(TYPES.RoverRepository) private readonly roverRepository: RoverRepository,
    @inject(TYPES.MarsPhotoTransformer) private readonly marsPhotoTransformer: MarsPhotoTransformer
  ) {}

  async getPhotos(userId: string, userName: string, apiKey: string): Promise<MarsPhotoResponse> {
    const photosData = await this.roverRepository.getRoversPhotos(100, apiKey);

    return {
      user_id: userId,
      user_name: userName,
      photos: photosData.photos.map((photo) => this.marsPhotoTransformer.transformToDto(photo))
    };
  }
}
