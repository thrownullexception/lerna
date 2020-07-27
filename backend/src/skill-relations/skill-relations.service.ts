import { Injectable } from '@nestjs/common';
import { CreateSkillRelationDTO } from './dtos';
import { SkillRelationsRepository } from './skill-relations.repository';

@Injectable()
export class SkillRelationsService {
  constructor(private readonly skillRelationsRepository: SkillRelationsRepository) {}

  async createSkillRelation(createSkillRelationDTO: CreateSkillRelationDTO): Promise<void> {
    const { skillAId, skillBId } = createSkillRelationDTO;
    const alreadyExist = this.skillRelationsRepository.listSkillRelations({
      where: [
        {
          skillAId,
          skillBId,
        },
        {
          skillBId: skillAId,
          skillAId: skillBId,
        },
      ],
    });
    if ((await alreadyExist).length > 0) {
      // Will like to throw a BadRequestException
      return;
    }

    return await this.skillRelationsRepository.createSkillRelation(createSkillRelationDTO);
  }

  async deleteSkillRelation(skillAId: string, skillBId: string): Promise<void> {
    const skillRelations = await this.skillRelationsRepository.listSkillRelations({
      where: [
        { skillAId, skillBId },
        { skillBId: skillAId, skillAId: skillBId },
      ],
      select: ['id'],
    });
    await Promise.all(
      skillRelations.map(({ id }) => this.skillRelationsRepository.deleteSkillRelation(id)),
    );
  }
}
