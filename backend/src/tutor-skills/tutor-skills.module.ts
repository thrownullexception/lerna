import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkillLevelsModule } from 'src/tutor-skill-levels/tutor-skill-levels.module';
import { TutorSkillsApiController } from './tutor-skills.api.controller';
import { TutorSkillLevelsService } from 'src/tutor-skill-levels/tutor-skill-levels.service';

@Module({
  imports: [TutorSkillLevelsModule, TypeOrmModule.forFeature([TutorSkillsRepository])],
  controllers: [TutorSkillsApiController],
  providers: [TutorSkillLevelsService],
})
export class TutorSkillsModule {}
