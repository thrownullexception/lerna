import { Repository, EntityRepository, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SkillResource } from './skill-resources.entity';

@Injectable()
@EntityRepository(SkillResource)
export class SkillResourcesRepository extends Repository<SkillResource> {
  async createSkillResource(skillResource: Partial<SkillResource>): Promise<void> {
    await this.insert(skillResource);
  }

  async updateSkillResource(
    skillResourceId: string,
    skillResource: Partial<SkillResource>,
  ): Promise<void> {
    await this.update(skillResourceId, skillResource);
  }

  async showSkillResource(options: FindOneOptions<SkillResource>): Promise<SkillResource> {
    return await this.findOne({
      ...options,
    });
  }

  async deleteSkillResource(skillResourceId: string): Promise<void> {
    await this.delete(skillResourceId);
  }
}
