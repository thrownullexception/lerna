import { Repository, EntityRepository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TutorSkill } from './tutor-skills.entity';

@Injectable()
@EntityRepository(TutorSkill)
export class TutorSkillsRepository extends Repository<TutorSkill> {
  async listTutorSkills(findManyOptions: FindManyOptions<TutorSkill>): Promise<TutorSkill[]> {
    return await this.find({
      ...findManyOptions,
    });
  }

  async listTutorSkillsAndCount(
    findAndCountOptions: FindManyOptions<TutorSkill>,
  ): Promise<[TutorSkill[], number]> {
    return await this.findAndCount(findAndCountOptions);
  }

  async showTutorSkill(options: FindOneOptions<TutorSkill>): Promise<TutorSkill> {
    return await this.findOne({
      ...options,
    });
  }

  async createTutorSkill(tutorSkill: Partial<TutorSkill>): Promise<void> {
    await this.insert(tutorSkill);
  }

  async updateTutorSkill(tutorSkillId: string, tutorSkill: Partial<TutorSkill>): Promise<void> {
    await this.update(tutorSkillId, tutorSkill);
    this.manager.connection.queryResultCache?.clear();
  }

  async deleteTutorSkill(tutorSkillId: string): Promise<void> {
    await this.delete(tutorSkillId);
    this.manager.connection.queryResultCache?.clear();
  }
}
