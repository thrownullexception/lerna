import { Repository, EntityRepository, FindManyOptions, FindConditions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserFavouriteSkill } from './user-favourite-skills.entity';

@Injectable()
@EntityRepository(UserFavouriteSkill)
export class UserFavouriteSkillsRepository extends Repository<UserFavouriteSkill> {
  async listUserFavouriteSkills(
    findManyOptions: FindManyOptions<UserFavouriteSkill>,
  ): Promise<UserFavouriteSkill[]> {
    return await this.find({
      ...findManyOptions,
    });
  }

  async createUserFavouriteSkill(userFavouriteSkill: Partial<UserFavouriteSkill>): Promise<void> {
    // TODO Skill Favourites Count
    await this.insert(userFavouriteSkill);
  }

  async deleteUserFavouriteSkill(conditions: FindConditions<UserFavouriteSkill>): Promise<void> {
    // TODO Skill Favourites Count
    await this.delete(conditions);
    this.manager.connection.queryResultCache?.clear();
  }
}
