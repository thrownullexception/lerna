import { Repository, EntityRepository, FindManyOptions, FindConditions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SkillRelation } from './skill-relations.entity';

@Injectable()
@EntityRepository(SkillRelation)
export class SkillRelationsRepository extends Repository<SkillRelation> {
  async listSkillRelations(
    findManyOptions?: FindManyOptions<SkillRelation>,
  ): Promise<SkillRelation[]> {
    return await this.find({
      ...findManyOptions,
    });
  }

  async createSkillRelation(skillRelation: Partial<SkillRelation>): Promise<void> {
    await this.insert(skillRelation);
  }

  async deleteSkillRelation(conditions: FindConditions<SkillRelation>): Promise<void> {
    await this.delete(conditions);
  }
}
