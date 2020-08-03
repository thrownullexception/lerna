import { Injectable } from '@nestjs/common';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkill } from './tutor-skills.entity';
import { TutorSkillLevel } from '../tutor-skill-levels/tutor-skill-levels.entity';
import { TutorSkillLevelsService } from '../tutor-skill-levels/tutor-skill-levels.service';
import { CreateTutorSkillDTO, UpdateTutorSkillDTO } from './dtos';

@Injectable()
export class TutorSkillsService {
  constructor(
    private readonly tutorSkillsRepository: TutorSkillsRepository,
    private readonly tutorSkillLevelsService: TutorSkillLevelsService,
  ) {}

  async getUserTutorSkills(
    userId: string,
  ): Promise<{ tutorSkills: TutorSkill[]; tutorSkillLevels: TutorSkillLevel[] }> {
    const tutorSkills = await this.tutorSkillsRepository.listTutorSkills({
      where: { userId },
    });
    const tutorSkillLevels = await this.tutorSkillLevelsService.getTutorSkillLevels();

    return { tutorSkills, tutorSkillLevels };
  }

  async createTutorSkill(createTutorSkillDTO: CreateTutorSkillDTO, userId: string): Promise<void> {
    return await this.tutorSkillsRepository.createTutorSkill({ ...createTutorSkillDTO, userId });
  }

  async updateTutorSkill(skillId: string, updateTutorSkillDTO: UpdateTutorSkillDTO): Promise<void> {
    await this.tutorSkillsRepository.updateTutorSkill(skillId, updateTutorSkillDTO);
  }

  async deleteTutorSkill(tutorSkillId: string): Promise<void> {
    await this.tutorSkillsRepository.deleteTutorSkill(tutorSkillId);
  }
}
