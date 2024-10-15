import { AxiosResponse } from 'axios';
import { MarsPhotoResponse } from '../domain/model/marsPhoto/mars_photo_response';
import { RoverRepository } from './rover_repository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants';
import { AxiosConfig } from '../config/axios_config';

@injectable()
class RoverRepositoryImpl implements RoverRepository {
  constructor(@inject(TYPES.AxiosConfig) private readonly axios: AxiosConfig) {}

  async getRoversPhotos(sol: number, apiKey: string): Promise<MarsPhotoResponse> {
    const response: AxiosResponse<MarsPhotoResponse> = await this.axios
      .getInstance()
      .get('/mars-photos/api/v1/rovers/curiosity/photos', {
        params: {
          sol: sol,
          api_key: apiKey
        }
      });

    return response.data;
  }
}

export { RoverRepositoryImpl };
