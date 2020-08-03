import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCompletedSkillRoadMapsService } from './user-completed-skill-road-maps.service';
import { UserCompletedSkillRoadMapsApiController } from './user-completed-skill-road-maps.api.controller';
import { UserCompletedSkillRoadMapsRepository } from './user-completed-skill-road-maps.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserCompletedSkillRoadMapsRepository])],
  controllers: [UserCompletedSkillRoadMapsApiController],
  providers: [UserCompletedSkillRoadMapsService],
  exports: [UserCompletedSkillRoadMapsService],
})
export class UserCompletedSkillRoadMapsModule {}
