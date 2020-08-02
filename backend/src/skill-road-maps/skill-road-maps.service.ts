import { Injectable } from '@nestjs/common';
import { CreateSkillRoadMapDTO, UpdateSkillRoadMapDTO } from './dtos';
import { SkillRoadMapsRepository } from './skill-road-maps.repository';
import { SkillRoadMap } from './skill-road-maps.entity';

@Injectable()
export class SkillRoadMapsService {
  constructor(private readonly skillRoadMapsRepository: SkillRoadMapsRepository) {}

  async createSkillRoadMap(createSkillRoadMapDTO: CreateSkillRoadMapDTO): Promise<void> {
    return await this.skillRoadMapsRepository.createSkillRoadMap(createSkillRoadMapDTO);
  }

  async showSkillRoadMap(skillRoadMapId: string): Promise<SkillRoadMap> {
    return await this.skillRoadMapsRepository.showSkillRoadMap({
      where: { id: skillRoadMapId },
    });
  }

  async updateSkillRoadMap(
    skillRoadMapId: string,
    updateSkillRoadMapDTO: UpdateSkillRoadMapDTO,
  ): Promise<void> {
    return await this.skillRoadMapsRepository.updateSkillRoadMap(
      skillRoadMapId,
      updateSkillRoadMapDTO,
    );
  }

  async deleteSkillRoadMap(skillRoadMapId: string): Promise<void> {
    await this.skillRoadMapsRepository.deleteSkillRoadMap(skillRoadMapId);
  }
}
