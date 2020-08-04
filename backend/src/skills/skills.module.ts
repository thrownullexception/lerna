import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsApiController } from './skills.api.controller';
import { SkillsRepository } from './skills.repository';
import { SkillsService } from './skills.service';
import { SkillHierarchiesModule } from '../skill-hierarchies/skill-hierarchies.module';
import { AdminSkillsController } from './skills.admin.controller';
import { UserFavouriteSkillsModule } from '../user-favourite-skills/user-favourite-skills.module';
import { UserCompletedSkillRoadMapsModule } from '../user-completed-skill-road-maps/user-completed-skill-road-maps.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsRepository]),
    forwardRef(() => SkillHierarchiesModule),
    UserFavouriteSkillsModule,
    UserCompletedSkillRoadMapsModule,
  ],
  controllers: [SkillsApiController, AdminSkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
