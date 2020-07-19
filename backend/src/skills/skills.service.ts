import { Injectable } from '@nestjs/common';
import { Skill } from './skills.entity';
import { SkillsRepository } from './skills.repository';
import { SkillHierarchy } from 'src/skill-hierarchies/skill-hierarchies.entity';
import { SkillHierarchiesService } from 'src/skill-hierarchies/skill-hierarchies.service';

@Injectable()
export class SkillsService {
  constructor(
    private readonly skillsRepository: SkillsRepository,
    private readonly skillHierarchiesService: SkillHierarchiesService,
  ) {}

  async getSkills(): Promise<Skill[]> {
    return await this.skillsRepository.listSkills();
  }

  async getSkillsNamesAndIds(): Promise<Skill[]> {
    return await this.skillsRepository.listSkills({
      select: ['id', 'name'],
    });
  }

  async getSkillsAndHierarchies(): Promise<{
    skills: Skill[];
    skillHierarchies: SkillHierarchy[];
  }> {
    const [skills, skillHierarchies] = await Promise.all([
      this.getSkills(),
      this.skillHierarchiesService.listSkillHierarchies(),
    ]);
    return { skills, skillHierarchies };
  }

  async getSkill(skillId: string): Promise<Skill> {
    return await this.skillsRepository.showSkill(skillId, {
      select: ['id', 'name', 'description', 'isPath'],
      relations: ['resources', 'roadMaps', 'forwardRelatedSkill', 'backwardRelatedSkill'],
    });
  }

  //   async createSkill(skillDTO: skillDTO, adminId: string): Promise<void> {
  //     return await this.skillsRepository.createSkill(skillDTO, adminId);
  //   }

  //   async updateSkill(skillId: string, skillDTO: skillDTO, lastTouchedBy: string): Promise<void> {
  //     await this.skillsRepository.updateSkill(skillId, skillDTO, lastTouchedBy);
  //   }

  async deleteSkill(skillId: string): Promise<void> {
    await this.skillsRepository.deleteSkill(skillId);
  }
}
