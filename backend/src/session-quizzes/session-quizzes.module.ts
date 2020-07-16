import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionQuizzesRepository } from './session-quizzes.repository';
import { SessionQuizzesService } from './session-quizzes.service';
import { SessionQuizzesApiController } from './session-quizzes.api.controller';
import { SessionQuizResponsesModule } from 'src/session-quiz-responses/session-quiz-responses.module';
import { SessionsModule } from 'src/sessions/sessions.module';
import { SessionCandidatesModule } from 'src/session-candidates/session-candidates.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SessionQuizzesRepository]),
    SessionQuizResponsesModule,
    SessionCandidatesModule,
    SessionsModule,
  ],
  controllers: [SessionQuizzesApiController],
  providers: [SessionQuizzesService],
})
export class SessionQuizzesModule {}
