import { Injectable } from '@nestjs/common';
import { SkillHierarchy } from './skill-hierarchies.entity';
import { SkillHierarchiesRepository } from './skill-hierarchies.repository';

@Injectable()
export class SkillHierarchiesService {
  constructor(private readonly skillHierarchiesRepository: SkillHierarchiesRepository) {}

  async listSkillHierarchies(): Promise<SkillHierarchy[]> {
    return await this.skillHierarchiesRepository.listSkillHierarchies();
  }
}
