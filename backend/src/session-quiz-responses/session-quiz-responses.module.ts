import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionQuizResponseService } from './session-quiz-responses.service';
import { SessionQuizResponseRepository } from './session-quiz-responses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionQuizResponseRepository])],
  controllers: [],
  providers: [SessionQuizResponseService],
  exports: [SessionQuizResponseService],
})
export class SessionQuizResponsesModule {}
