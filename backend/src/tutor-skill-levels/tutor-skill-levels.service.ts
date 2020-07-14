import { Injectable } from '@nestjs/common';
import { TutorSkillLevelsRepository } from './tutor-skill-levels.repository';
import { TutorSkillLevel } from './tutor-skill-levels.entity';

@Injectable()
export class TutorSkillLevelsService {
  constructor(private readonly tutorSkillLevelsRepository: TutorSkillLevelsRepository) {}

  async getTutorSkillLevels(): Promise<TutorSkillLevel[]> {
    return await this.tutorSkillLevelsRepository.listUserTutorSkillLevels();
  }
}
