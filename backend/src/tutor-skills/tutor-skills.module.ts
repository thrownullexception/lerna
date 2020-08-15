import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { SkillLevelsModule } from '../skill-levels/skill-levels.module';
import { TutorSkillsApiController } from './tutor-skills.api.controller';
import { TutorSkillsService } from './tutor-skills.service';

@Module({
  imports: [SkillLevelsModule, TypeOrmModule.forFeature([TutorSkillsRepository])],
  controllers: [TutorSkillsApiController],
  providers: [TutorSkillsService],
})
export class TutorSkillsModule {}
