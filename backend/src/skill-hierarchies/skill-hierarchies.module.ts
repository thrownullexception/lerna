import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillHierarchiesService } from './skill-hierarchies.service';
import { SkillHierarchiesRepository } from './skill-hierarchies.repository';
import { SkillHierarchiesAdminController } from './skill-hierarchies.admin.controller';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([SkillHierarchiesRepository]), forwardRef(() => SkillsModule)],
  controllers: [SkillHierarchiesAdminController],
  providers: [SkillHierarchiesService],
  exports: [SkillHierarchiesService],
})
export class SkillHierarchiesModule {}
