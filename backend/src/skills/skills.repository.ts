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

  async listSkillsAndCount(
    findAndCountOptions: FindManyOptions<Skill>,
  ): Promise<[Skill[], number]> {
    return await this.findAndCount(findAndCountOptions);
  }

  async showSkill(options: FindOneOptions<Skill>): Promise<Skill> {
    return await this.findOne({
      cache: {
        id: `${this.cachePrefix}-showSkill_${JSON.stringify(options)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
      ...options,
    });
  }

  async createSkill(skill: Partial<Skill>): Promise<void> {
    await this.insert(skill);
    this.manager.connection.queryResultCache?.clear();
  }

  async updateSkill(skillId: string, skill: Partial<Skill>): Promise<void> {
    await this.update(skillId, skill);
    this.manager.connection.queryResultCache?.clear();
  }

  async deleteSkill(skillId: string): Promise<void> {
    await this.delete(skillId);
    this.manager.connection.queryResultCache?.clear();
  }
}
