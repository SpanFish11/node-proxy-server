import { AxiosResponse } from 'axios';
import { NearEarthObjectsResponse } from '../domain/model/neo/near_earth_object_response';
import { MeteorRepository } from './meteors_repository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants';
import { AxiosConfig } from '../config/axios_config';

@injectable()
class MeteorRepositoryImpl implements MeteorRepository {
  constructor(@inject(TYPES.AxiosConfig) private readonly axios: AxiosConfig) {}

  async getNEO(startDate: string, endDate: string): Promise<NearEarthObjectsResponse> {
    const response: AxiosResponse<NearEarthObjectsResponse> = await this.axios.getInstance().get('/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });

    return response.data;
  }
}

export { MeteorRepositoryImpl };
