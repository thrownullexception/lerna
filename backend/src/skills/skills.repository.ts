import { Repository, EntityRepository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Skill } from './skills.entity';
import { Injectable } from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';

@Injectable()
@EntityRepository(Skill)
export class SkillsRepository extends Repository<Skill> {
  private cachePrefix = '__Skill__';

  async listSkills(findManyOptions?: FindManyOptions<Skill>): Promise<Skill[]> {
    return await this.find({
      ...findManyOptions,
      cache: {
        id: `${this.cachePrefix}-listSkills_${JSON.stringify(findManyOptions)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async showSkill(skillId: string, options: FindOneOptions<Skill>): Promise<Skill> {
    return await this.findOne({
      where: { id: skillId },
      cache: {
        id: `${this.cachePrefix}-showSkill_${skillId}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
      ...options,
    });
  }

  //   async createSkill(skillDTO: SkillDTO, lastTouchedById: string): Promise<void> {
  //     await this.insert({ ...skillDTO, lastTouchedById });
  //     this.queryRunner.connection.queryResultCache.clear();
  //   }

  //   async updateSkill(skillId: string, skillDTO: SkillDTO, lastTouchedById: string): Promise<void> {
  //     await this.update(skillId, { ...skillDTO, lastTouchedById });
  //     this.queryRunner.connection.queryResultCache.clear();
  //   }

  async deleteSkill(skillId: string): Promise<void> {
    await this.delete(skillId);
    this.queryRunner.connection.queryResultCache.clear();
  }
}
