import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillHierarchiesService } from './skill-hierarchies.service';
import { SkillHierarchiesRepository } from './skill-hierarchies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SkillHierarchiesRepository])],
  controllers: [],
  providers: [SkillHierarchiesService],
  exports: [SkillHierarchiesService],
})
export class SkillHierarchiesModule {}
