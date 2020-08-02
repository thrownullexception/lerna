import { Repository, EntityRepository, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { SkillHierarchy } from './skill-hierarchies.entity';

@Injectable()
@EntityRepository(SkillHierarchy)
export class SkillHierarchiesRepository extends Repository<SkillHierarchy> {
  private cachePrefix = '__SkillHierarchy__';

  async listSkillHierarchies(): Promise<SkillHierarchy[]> {
    return await this.find({
      cache: {
        id: `${this.cachePrefix}-listSkillHierarchies`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async showSkillHierarchy(options: FindOneOptions<SkillHierarchy>): Promise<SkillHierarchy> {
    return await this.findOne({
      ...options,
      cache: {
        id: `${this.cachePrefix}-showSkill_${JSON.stringify(options)}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async createSkillHierarchy(skillHierarchy: Partial<SkillHierarchy>): Promise<void> {
    await this.insert(skillHierarchy);
    this.manager.connection.queryResultCache?.clear();
  }

  async updateSkillHierarchy(
    skillHierarchyId: string,
    skillHierarchy: Partial<SkillHierarchy>,
  ): Promise<void> {
    await this.update(skillHierarchyId, skillHierarchy);
    this.manager.connection.queryResultCache?.clear();
  }

  async deleteSkillHierarchy(skillHierarchyId: string): Promise<void> {
    await this.delete(skillHierarchyId);
    this.manager.connection.queryResultCache?.clear();
  }
}
