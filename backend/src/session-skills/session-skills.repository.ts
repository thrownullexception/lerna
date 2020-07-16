import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SessionSkill } from './session-skills.entity';

@Injectable()
@EntityRepository(SessionSkill)
export class SessionSkillsRepository extends Repository<SessionSkill> {
  async createSessionSkill(sessionSkill: Partial<SessionSkill>): Promise<void> {
    await this.insert(sessionSkill);
  }

  async deleteSessionSkill(sessionSkillId: string): Promise<void> {
    await this.delete(sessionSkillId);
  }
}
