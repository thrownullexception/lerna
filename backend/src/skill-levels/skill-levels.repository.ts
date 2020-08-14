import { Repository, EntityRepository, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SkillLevel } from './skill-levels.entity';
import { APP_CONSTANTS } from '../shared/constants';

@Injectable()
@EntityRepository(SkillLevel)
export class SkillLevelsRepository extends Repository<SkillLevel> {
  private cachePrefix = '__SkillLevel__';

  async listSkillLevels(findManyOptions?: FindManyOptions<SkillLevel>): Promise<SkillLevel[]> {
    return await this.find({
      ...findManyOptions,
      cache: {
        id: `${this.cachePrefix}-list_${JSON.stringify(findManyOptions)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }
}
