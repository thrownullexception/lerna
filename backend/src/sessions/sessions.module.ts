import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsApiController } from './sessions.api.controller';
import { SessionsRepository } from './sessions.repository';
import { SessionsService } from './sessions.service';
import { SessionCandidatesModule } from 'src/session-candidates/session-candidates.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionsRepository]), SessionCandidatesModule],
  controllers: [SessionsApiController],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
