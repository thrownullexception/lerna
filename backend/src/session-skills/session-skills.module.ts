import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSkillsService } from './session-skills.service';
import { SessionSkillsApiController } from './session-skills.api.controller';
import { SessionSkillsRepository } from './session-skills.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionSkillsRepository])],
  controllers: [SessionSkillsApiController],
  providers: [SessionSkillsService],
})
export class SessionSkillsModule {}
