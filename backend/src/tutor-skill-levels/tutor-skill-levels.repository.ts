import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TutorSkillLevel } from './tutor-skill-levels.entity';
import { APP_CONSTANTS } from 'src/shared/constants';

@Injectable()
@EntityRepository(TutorSkillLevel)
export class TutorSkillLevelsRepository extends Repository<TutorSkillLevel> {
  private cachePrefix = '__TutorSkillLevel__';

  async listTutorSkillLevels(): Promise<TutorSkillLevel[]> {
    return await this.find({
      cache: {
        id: `${this.cachePrefix}-listTutorSkillLevels`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }
}
