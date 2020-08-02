import { Injectable } from '@nestjs/common';
import { SkillHierarchy } from './skill-hierarchies.entity';
import { SkillHierarchiesRepository } from './skill-hierarchies.repository';
import { CreateSkillHierarchyDTO, UpdateSkillHierarchyDTO } from './dtos';

@Injectable()
export class SkillHierarchiesService {
  constructor(private readonly skillHierarchiesRepository: SkillHierarchiesRepository) {}

  async listSkillHierarchies(): Promise<SkillHierarchy[]> {
    return await this.skillHierarchiesRepository.listSkillHierarchies();
  }

  async showSkillHierarchy(skillHierarchyId: string): Promise<SkillHierarchy> {
    return await this.skillHierarchiesRepository.showSkillHierarchy({
      where: { id: skillHierarchyId },
      relations: ['parent', 'child'],
    });
  }

  async createSkillHierarchy({
    order,
    skillAId,
    skillBId,
    relation,
  }: CreateSkillHierarchyDTO): Promise<void> {
    const skillHierarchyToCreate: Partial<SkillHierarchy> = {
      order,
    };
    if (relation === 'child') {
      skillHierarchyToCreate.childId = skillAId;
      skillHierarchyToCreate.parentId = skillBId;
    }

    if (relation === 'parent') {
      skillHierarchyToCreate.childId = skillBId;
      skillHierarchyToCreate.parentId = skillAId;
    }
    return await this.skillHierarchiesRepository.createSkillHierarchy(skillHierarchyToCreate);
  }

  async updateSkillHierarchy(
    skillHierarchyId: string,
    updateSkillHierarchyDTO: UpdateSkillHierarchyDTO,
  ): Promise<void> {
    return await this.skillHierarchiesRepository.updateSkillHierarchy(
      skillHierarchyId,
      updateSkillHierarchyDTO,
    );
  }

  async deleteSkillHierarchy(skillHierarchyId: string): Promise<void> {
    await this.skillHierarchiesRepository.deleteSkillHierarchy(skillHierarchyId);
  }
}
