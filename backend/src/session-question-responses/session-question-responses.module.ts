import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionQuestionResponsesService } from './session-question-responses.service';
import { SessionQuestionResponsesRepository } from './session-question-responses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SessionQuestionResponsesRepository])],
  controllers: [],
  providers: [SessionQuestionResponsesService],
  exports: [SessionQuestionResponsesService],
})
export class SessionQuestionResponsesModule {}
