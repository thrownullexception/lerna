import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillsApiController } from './skills.api.controller';
import { SkillsRepository } from './skills.repository';
import { SkillsService } from './skills.service';
import { SkillHierarchiesModule } from '../skill-hierarchies/skill-hierarchies.module';
import { AdminSkillsController } from './skills.admin.controller';
import { UserFavouriteSkillsModule } from '../user-favourite-skills/user-favourite-skills.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillsRepository]),
    forwardRef(() => SkillHierarchiesModule),
    UserFavouriteSkillsModule,
  ],
  controllers: [SkillsApiController, AdminSkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
