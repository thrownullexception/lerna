import { Injectable } from '@nestjs/common';
import { SkillLevelsRepository } from './skill-levels.repository';
import { SkillLevel } from './skill-levels.entity';

@Injectable()
export class SkillLevelsService {
  constructor(private readonly skillLevelsRepository: SkillLevelsRepository) {}

  async getSkillLevels(): Promise<SkillLevel[]> {
    return await this.skillLevelsRepository.listSkillLevels();
  }
}
