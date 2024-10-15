import { MeteorResponse } from '../domain/dto/meteor/meteor_response';
import { NearEarthObjectsResponse } from '../domain/model/neo/near_earth_object_response';
import { Meteor } from '../domain/dto/meteor/meteor';
import { MeteorService } from './meteor_service';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants';
import { MeteorRepository } from '../repository/meteors_repository';
import { MeteorTransformer } from '../transformer/meteor_transformer';
import { ConfigurationService } from '../config/config_service';
import { format, subDays } from 'date-fns';

@injectable()
export class MeteorServiceImpl implements MeteorService {
  private readonly DATE_FORMAT: string = 'yyyy-MM-dd';
  private readonly dateOffset: number;

  constructor(
    @inject(TYPES.MeteorRepository) private readonly meteorRepository: MeteorRepository,
    @inject(TYPES.MeteorTransformer) private readonly meteorTransformer: MeteorTransformer,
    @inject(TYPES.Configuration) private readonly configService: ConfigurationService
  ) {
    this.dateOffset = Number(this.configService.get('DATE_OFFSET'));
  }

  async getMeteors(date?: string, hasCount?: boolean, isDangerous?: boolean): Promise<Partial<MeteorResponse>> {
    const { startDate, endDate } = this.getStartAndEndDates(date);

    const meteorsData: NearEarthObjectsResponse = await this.meteorRepository.getNEO(startDate, endDate);

    const data: Meteor[] = Object.values(meteorsData.near_earth_objects)
      .flat()
      .map((neo) => this.meteorTransformer.transformToDto(neo));

    const responseData: MeteorResponse = { meteor_data: data };

    if (isDangerous) {
      responseData.were_dangerous_meteors = data.filter((meteor) => meteor.is_potentially_hazardous_asteroid);
    }

    if (hasCount) {
      responseData.element_count = data.length;
    }

    return responseData;
  }

  private readonly getStartAndEndDates = (date?: string) => {
    if (date) {
      return { startDate: date, endDate: date };
    }
    const today = new Date();

    return {
      startDate: format(subDays(today, this.dateOffset), this.DATE_FORMAT),
      endDate: format(today, this.DATE_FORMAT)
    };
  };
}
