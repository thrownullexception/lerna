import { Injectable } from '@nestjs/common';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkill } from './tutor-skills.entity';
import { CreateTutorSkillDTO, UpdateTutorSkillDTO } from './dtos';

@Injectable()
export class TutorSkillsService {
  constructor(private readonly tutorSkillsRepository: TutorSkillsRepository) {}

  async getUserTutorSkills(userId: string): Promise<TutorSkill[]> {
    return await this.tutorSkillsRepository.listTutorSkills({
      where: { userId },
      relations: ['skill', 'level'],
    });
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
