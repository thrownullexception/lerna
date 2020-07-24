import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkillLevelsModule } from '../tutor-skill-levels/tutor-skill-levels.module';
import { TutorSkillsApiController } from './tutor-skills.api.controller';
import { TutorSkillsService } from './tutor-skills.service';

@Module({
  imports: [TutorSkillLevelsModule, TypeOrmModule.forFeature([TutorSkillsRepository])],
  controllers: [TutorSkillsApiController],
  providers: [TutorSkillsService],
})
export class TutorSkillsModule {}
