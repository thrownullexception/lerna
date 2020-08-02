import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillMediaTypesService } from './skill-media-types.service';
import { SkillMediaTypesRepository } from './skill-media-types.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SkillMediaTypesRepository])],
  controllers: [],
  providers: [SkillMediaTypesService],
  exports: [SkillMediaTypesService],
})
export class SkillMediaTypesModule {}
