import { Repository, EntityRepository, FindManyOptions, FindConditions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserCompletedSkillRoadMap } from './user-completed-skill-road-maps.entity';

@Injectable()
@EntityRepository(UserCompletedSkillRoadMap)
export class UserCompletedSkillRoadMapsRepository extends Repository<UserCompletedSkillRoadMap> {
  async listUserCompletedSkillRoadMaps(
    findManyOptions: FindManyOptions<UserCompletedSkillRoadMap>,
  ): Promise<UserCompletedSkillRoadMap[]> {
    return await this.find({
      ...findManyOptions,
    });
  }

  async createUserCompletedSkillRoadMap(
    userCompletedSkillRoadMap: Partial<UserCompletedSkillRoadMap>,
  ): Promise<void> {
    await this.insert(userCompletedSkillRoadMap);
  }

  async deleteUserCompletedSkillRoadMap(
    conditions: FindConditions<UserCompletedSkillRoadMap>,
  ): Promise<void> {
    await this.delete(conditions);
  }
}
