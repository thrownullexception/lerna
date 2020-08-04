import { Injectable } from '@nestjs/common';
import { CreateUserCompletedSkillRoadMapDTO } from './dtos';
import { UserCompletedSkillRoadMapsRepository } from './user-completed-skill-road-maps.repository';
import { UserCompletedSkillRoadMap } from './user-completed-skill-road-maps.entity';

@Injectable()
export class UserCompletedSkillRoadMapsService {
  constructor(
    private readonly userCompletedSkillRoadMapsRepository: UserCompletedSkillRoadMapsRepository,
  ) {}

  async getUserCompletedSkillRoadMaps(userId: string): Promise<UserCompletedSkillRoadMap[]> {
    return await this.userCompletedSkillRoadMapsRepository.listUserCompletedSkillRoadMaps({
      where: { userId },
    });
  }

  async createUserCompletedSkillRoadMap(
    createUserCompletedSkillRoadMapDTO: CreateUserCompletedSkillRoadMapDTO,
  ): Promise<void> {
    await this.userCompletedSkillRoadMapsRepository.createUserCompletedSkillRoadMap(
      createUserCompletedSkillRoadMapDTO,
    );
  }

  async deleteUserCompletedSkillRoadMap(userId: string, skillRoadMapId: string): Promise<void> {
    await this.userCompletedSkillRoadMapsRepository.deleteUserCompletedSkillRoadMap({
      userId,
      skillRoadMapId,
    });
  }
}
