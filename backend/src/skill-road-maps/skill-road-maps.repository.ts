import { Repository, EntityRepository, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SkillRoadMap } from './skill-road-maps.entity';

@Injectable()
@EntityRepository(SkillRoadMap)
export class SkillRoadMapsRepository extends Repository<SkillRoadMap> {
  async createSkillRoadMap(skillRoadMap: Partial<SkillRoadMap>): Promise<void> {
    await this.insert(skillRoadMap);
  }

  async updateSkillRoadMap(
    skillRoadMapId: string,
    skillRoadMap: Partial<SkillRoadMap>,
  ): Promise<void> {
    await this.update(skillRoadMapId, skillRoadMap);
  }

  async showSkillRoadMap(options: FindOneOptions<SkillRoadMap>): Promise<SkillRoadMap> {
    return await this.findOne({
      ...options,
    });
  }

  async deleteSkillRoadMap(skillRoadMapId: string): Promise<void> {
    await this.delete(skillRoadMapId);
  }
}
