import { Injectable } from '@nestjs/common';
import { CreateSkillResourceDTO, UpdateSkillResourceDTO } from './dtos';
import { SkillResource } from './skill-resources.entity';
import { SkillResourcesRepository } from './skill-resources.repository';

@Injectable()
export class SkillResourcesService {
  constructor(private readonly skillResourcesRepository: SkillResourcesRepository) {}

  async createSkillResource(createSkillResourceDTO: CreateSkillResourceDTO): Promise<void> {
    return await this.skillResourcesRepository.createSkillResource(createSkillResourceDTO);
  }

  async showSkillResource(skillResourceId: string): Promise<SkillResource> {
    return await this.skillResourcesRepository.showSkillResource({
      where: { id: skillResourceId },
    });
  }

  async updateSkillResource(
    skillResourceId: string,
    updateSkillResourceDTO: UpdateSkillResourceDTO,
  ): Promise<void> {
    return await this.skillResourcesRepository.updateSkillResource(
      skillResourceId,
      updateSkillResourceDTO,
    );
  }

  async deleteSkillResource(skillResourceId: string): Promise<void> {
    await this.skillResourcesRepository.deleteSkillResource(skillResourceId);
  }
}
