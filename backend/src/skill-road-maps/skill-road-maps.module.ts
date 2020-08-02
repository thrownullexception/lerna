import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillRoadMapsAdminController } from './skill-road-maps.admin.controller';
import { SkillRoadMapsService } from './skill-road-maps.service';
import { SkillRoadMapsRepository } from './skill-road-maps.repository';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [TypeOrmModule.forFeature([SkillRoadMapsRepository]), SkillsModule],
  controllers: [SkillRoadMapsAdminController],
  providers: [SkillRoadMapsService],
})
export class SkillRoadMapsModule {}
