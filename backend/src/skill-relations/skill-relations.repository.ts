import { Repository, EntityRepository, FindManyOptions } from 'typeorm';
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

  async deleteSkillRelation(skillRelationId: string): Promise<void> {
    console.log(skillRelationId);
    await this.delete(skillRelationId);
  }
}
