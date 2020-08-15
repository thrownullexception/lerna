import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionQuestionsRepository } from './session-questions.repository';
import { SessionQuestionsService } from './session-questions.service';
import { SessionQuisApiController } from './session-questions.api.controller';
import { SessionQuestionResponsesModule } from '../session-question-responses/session-question-responses.module';
import { SessionsModule } from '../sessions/sessions.module';
import { SessionCandidatesModule } from '../session-candidates/session-candidates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionQuestionsRepository]),
    SessionQuestionResponsesModule,
    SessionCandidatesModule,
    SessionsModule,
  ],
  controllers: [SessionQuisApiController],
  providers: [SessionQuestionsService],
})
export class SessionQuestionsModule {}
