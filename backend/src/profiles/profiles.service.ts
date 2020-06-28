import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profiles.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async updateProfile(userId: string, profile: QueryDeepPartialEntity<Profile>): Promise<void> {
    // TODO skip the profile that is already set for dob and gender
    await this.profileRepository.update({ userId }, profile);
  }

  async createForNewUser(userId: string): Promise<void> {
    await this.profileRepository.insert({ userId });
  }
}
