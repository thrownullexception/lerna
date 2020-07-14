import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorSkillLevelsApiController } from './tutor-skill-levels.api.controller';
import { TutorSkillLevelsService } from './tutor-skill-levels.service';
import { TutorSkillLevelsRepository } from './tutor-skill-levels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TutorSkillLevelsRepository])],
  controllers: [TutorSkillLevelsApiController],
  providers: [TutorSkillLevelsService],
  exports: [TutorSkillLevelsService],
})
export class TutorSkillLevelsModule {}
