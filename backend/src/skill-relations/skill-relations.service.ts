import { Injectable } from '@nestjs/common';
import { CreateSkillRelationDTO } from './dtos';
import { SkillRelationsRepository } from './skill-relations.repository';

@Injectable()
export class SkillRelationsService {
  constructor(private readonly skillRelationsRepository: SkillRelationsRepository) {}

  async createSkillRelation(createSkillRelationDTO: CreateSkillRelationDTO): Promise<void> {
    return await this.skillRelationsRepository.createSkillRelation(createSkillRelationDTO);
  }

  async deleteSkillRelation(skillAId: string, skillBId: string): Promise<void> {
    this.skillRelationsRepository.deleteSkillRelation({ skillAId, skillBId });
    this.skillRelationsRepository.deleteSkillRelation({ skillBId: skillAId, skillAId: skillBId });
  }
}
