import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { SkillHierarchy } from './skill-hierarchies.entity';

@Injectable()
@EntityRepository(SkillHierarchy)
export class SkillHierarchiesRepository extends Repository<SkillHierarchy> {
  private cachePrefix = 'SkillHierarchiesRepository';

  async listSkillHierarchies(): Promise<SkillHierarchy[]> {
    return await this.find({
      cache: {
        id: `${this.cachePrefix}_listSkillHierarchies`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  async showSkillHierarchy(skillHierarchyId: string): Promise<SkillHierarchy> {
    return await this.findOne({
      where: { id: skillHierarchyId },
      cache: {
        id: `${this.cachePrefix}_showSkill_${skillHierarchyId}`,
        milliseconds: APP_CONSTANTS.A_DAY_IN_MILLIOSECONDS,
      },
    });
  }

  //   async createSkillHierarchy(skillDTO: SkillDTO, lastTouchedById: string): Promise<void> {
  //     await this.insert({ ...skillDTO, lastTouchedById });
  //     this.queryRunner.connection.queryResultCache.clear();
  //   }

  //   async updateSkillHierarchy(skillId: string, skillDTO: SkillDTO, lastTouchedById: string): Promise<void> {
  //     await this.update(skillId, { ...skillDTO, lastTouchedById });
  //     this.queryRunner.connection.queryResultCache.clear();
  //   }

  //   async deleteSkillHierarchy(skillId: string): Promise<void> {
  //     await this.delete(skillId);
  //     this.queryRunner.connection.queryResultCache.clear();
  //   }
}
