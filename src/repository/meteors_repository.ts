import { NearEarthObjectsResponse } from '../domain/model/neo/near_earth_object_response';

interface MeteorRepository {
  getNEO: (startDate: string, endDate: string) => Promise<NearEarthObjectsResponse>;
}

export { MeteorRepository };
