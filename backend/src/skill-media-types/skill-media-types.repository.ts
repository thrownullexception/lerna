import { Repository, EntityRepository, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SkillMediaType } from './skill-media-types.entity';
import { APP_CONSTANTS } from '../shared/constants';

@Injectable()
@EntityRepository(SkillMediaType)
export class SkillMediaTypesRepository extends Repository<SkillMediaType> {
  private cachePrefix = '__SkillMediaType__';

  async listSkillMediaTypes(
    findManyOptions?: FindManyOptions<SkillMediaType>,
  ): Promise<SkillMediaType[]> {
    return await this.find({
      ...findManyOptions,
      cache: {
        id: `${this.cachePrefix}-list_${JSON.stringify(findManyOptions)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }
}
