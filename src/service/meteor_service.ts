import { MeteorResponse } from '../domain/dto/meteor/meteor_response';

interface MeteorService {
  getMeteors: (date?: string, hasCount?: boolean, isDangerous?: boolean) => Promise<Partial<MeteorResponse>>;
}

export { MeteorService };
