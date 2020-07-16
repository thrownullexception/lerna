import { Injectable } from '@nestjs/common';
import { CreateSessionSkillDTO } from './dtos';
import { SessionSkillsRepository } from './session-skills.repository';

@Injectable()
export class SessionSkillsService {
  constructor(private readonly sessionSkillsRepository: SessionSkillsRepository) {}

  async createSessionSkill(createSessionDTO: CreateSessionSkillDTO): Promise<void> {
    return await this.sessionSkillsRepository.createSessionSkill(createSessionDTO);
  }

  async deleteSessionSkill(sessionSkillId: string): Promise<void> {
    await this.sessionSkillsRepository.deleteSessionSkill(sessionSkillId);
  }
}
