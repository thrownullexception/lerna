import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsModule } from '../skills/skills.module';
import { SkillResourcesService } from './skill-resources.services';
import { SkillResourcesRepository } from './skill-resources.repository';
import { SkillResourcesAdminController } from './skill-resources.admin.controller';
import { SkillMediaTypesModule } from '../skill-media-types/skill-media-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillResourcesRepository]),
    SkillsModule,
    SkillMediaTypesModule,
  ],
  controllers: [SkillResourcesAdminController],
  providers: [SkillResourcesService],
  exports: [SkillResourcesService],
})
export class SkillResourcesModule {}
