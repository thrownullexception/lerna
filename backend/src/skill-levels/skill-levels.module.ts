import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillLevelsApiController } from './skill-levels.api.controller';
import { SkillLevelsService } from './skill-levels.service';
import { SkillLevelsRepository } from './skill-levels.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SkillLevelsRepository])],
  controllers: [SkillLevelsApiController],
  providers: [SkillLevelsService],
  exports: [SkillLevelsService],
})
export class SkillLevelsModule {}
