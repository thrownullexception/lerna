import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsApiController } from './skills.api.controller';
import { SkillsRepository } from './skills.repository';
import { SkillsService } from './skills.service';
import { SkillHierarchiesModule } from 'src/skill-hierarchies/skill-hierarchies.module';

@Module({
  imports: [SkillHierarchiesModule, TypeOrmModule.forFeature([SkillsRepository])],
  controllers: [SkillsApiController],
  providers: [SkillsService],
})
export class SkillsModule {}
