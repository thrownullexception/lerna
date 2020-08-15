import { Injectable } from '@nestjs/common';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkill } from './tutor-skills.entity';
import { SkillLevel } from '../skill-levels/skill-levels.entity';
import { SkillLevelsService } from '../skill-levels/skill-levels.service';
import { CreateTutorSkillDTO, UpdateTutorSkillDTO } from './dtos';

@Injectable()
export class TutorSkillsService {
  constructor(
    private readonly tutorSkillsRepository: TutorSkillsRepository,
    private readonly skillLevelsService: SkillLevelsService,
  ) {}

  async getUserTutorSkills(
    userId: string,
  ): Promise<{ tutorSkills: TutorSkill[]; skillLevels: SkillLevel[] }> {
    const tutorSkills = await this.tutorSkillsRepository.listTutorSkills({
      where: { userId },
      relations: ['skill'],
    });
    const skillLevels = await this.skillLevelsService.getSkillLevels();

    return { tutorSkills, skillLevels };
  }

  async createTutorSkill(createTutorSkillDTO: CreateTutorSkillDTO): Promise<void> {
    return await this.tutorSkillsRepository.createTutorSkill(createTutorSkillDTO);
  }

  async updateTutorSkill(skillId: string, updateTutorSkillDTO: UpdateTutorSkillDTO): Promise<void> {
    await this.tutorSkillsRepository.updateTutorSkill(skillId, updateTutorSkillDTO);
  }

  async deleteTutorSkill(tutorSkillId: string): Promise<void> {
    await this.tutorSkillsRepository.deleteTutorSkill(tutorSkillId);
  }
}
