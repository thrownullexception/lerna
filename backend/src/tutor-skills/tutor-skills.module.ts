import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorSkillsRepository } from './tutor-skills.repository';
import { TutorSkillsApiController } from './tutor-skills.api.controller';
import { TutorSkillsService } from './tutor-skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([TutorSkillsRepository])],
  controllers: [TutorSkillsApiController],
  providers: [TutorSkillsService],
})
export class TutorSkillsModule {}
