import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillRelationsAdminController } from './skill-relations.admin.controller';
import { SkillRelationsRepository } from './skill-relations.repository';
import { SkillRelationsService } from './skill-relations.service';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([SkillRelationsRepository]), SkillsModule],
  controllers: [SkillRelationsAdminController],
  providers: [SkillRelationsService],
})
export class SkillRelationsModule {}
