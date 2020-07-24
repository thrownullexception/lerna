import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSetting } from './user-settings.entity';
import { UserSettingDTO } from './dtos';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(UserSetting)
    private readonly userSettingRepository: Repository<UserSetting>,
  ) {}

  async createForNewUser(userId: number): Promise<void> {
    await this.userSettingRepository.insert({ userId });
  }

  async updateSetting({ field, value }: UserSettingDTO, userId: number): Promise<void> {
    const count = await this.userSettingRepository.count({ userId, field });
    if (count === 1) {
      await this.userSettingRepository.update({ userId, field }, { value });
    } else {
      await this.userSettingRepository.insert({ userId, field, value });
    }
  }
}
