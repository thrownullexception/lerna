import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionCandidatesService } from './session-candidates.service';
import { SessionCandidatesApiController } from './session-candidates.api.controller';
import { SessionCandidatesRepository } from './session-candidates.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionCandidatesRepository])],
  controllers: [SessionCandidatesApiController],
  providers: [SessionCandidatesService],
  exports: [SessionCandidatesService],
})
export class SessionCandidatesModule {}
