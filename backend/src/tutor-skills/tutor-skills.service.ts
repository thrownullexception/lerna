import { Injectable } from '@nestjs/common';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkill } from './tutor-skills.entity';
import { TutorSkillLevel } from 'src/tutor-skill-levels/tutor-skill-levels.entity';
import { TutorSkillLevelsService } from 'src/tutor-skill-levels/tutor-skill-levels.service';
import { TutorSkillDTO } from './tutor-skills.dto';

@Injectable()
export class TutorSkillsService {
  constructor(
    private readonly tutorSkillsRepository: TutorSkillsRepository,
    private readonly tutorSkillLevelsService: TutorSkillLevelsService,
  ) {}

  async getUserTutorSkills(
    userId: string,
  ): Promise<{ tutorSkills: TutorSkill[]; tutorSkillLevels: TutorSkillLevel[] }> {
    const tutorSkills = await this.tutorSkillsRepository.listUserTutorSkills({
      where: { userId },
    });
    const tutorSkillLevels = await this.tutorSkillLevelsService.getTutorSkillLevels();

    return { tutorSkills, tutorSkillLevels };
  }

  async createTutorSkill(tutorSkillDTO: TutorSkillDTO, userId: string): Promise<void> {
    return await this.tutorSkillsRepository.createTutorSkill({ ...tutorSkillDTO, userId });
  }

  async updateTutorSkill(skillId: string, tutorSkillDTO: TutorSkillDTO): Promise<void> {
    await this.tutorSkillsRepository.updateTutorSkill(skillId, tutorSkillDTO);
  }

  async deleteTutorSkill(tutorSkillId: string): Promise<void> {
    await this.tutorSkillsRepository.deleteTutorSkill(tutorSkillId);
  }
}
