import { Injectable } from '@nestjs/common';
import { CreateUserFavouriteSkillDTO } from './dtos';
import { UserFavouriteSkillsRepository } from './user-favourite-skills.repository';
import { UserFavouriteSkill } from './user-favourite-skills.entity';

@Injectable()
export class UserFavouriteSkillsService {
  constructor(private readonly userFavouriteSkillsRepository: UserFavouriteSkillsRepository) {}

  async getUserFavouriteSkills(userId: string): Promise<UserFavouriteSkill[]> {
    return await this.userFavouriteSkillsRepository.listUserFavouriteSkills({
      where: { userId },
    });
  }

  async createUserFavouriteSkill(
    createUserFavouriteSkillDTO: CreateUserFavouriteSkillDTO,
  ): Promise<void> {
    return await this.userFavouriteSkillsRepository.createUserFavouriteSkill(
      createUserFavouriteSkillDTO,
    );
  }

  async deleteUserFavouriteSkill(userId: string, skillId: string): Promise<void> {
    await this.userFavouriteSkillsRepository.deleteUserFavouriteSkill({ userId, skillId });
  }
}
