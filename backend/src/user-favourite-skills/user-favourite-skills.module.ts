import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavouriteSkillsRepository } from './user-favourite-skills.repository';
import { UserFavouriteSkillsService } from './user-favourite-skills.service';
import { UserFavouriteSkillsApiController } from './user-favourite-skills.api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserFavouriteSkillsRepository])],
  controllers: [UserFavouriteSkillsApiController],
  providers: [UserFavouriteSkillsService],
  exports: [UserFavouriteSkillsService],
})
export class UserFavouriteSkillsModule {}
