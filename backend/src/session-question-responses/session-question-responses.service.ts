import { Injectable } from '@nestjs/common';
import { SessionQuestionResponsesRepository } from './session-question-responses.repository';
import { v4 as uuidv4 } from 'uuid';
import { SessionQuestionResponse } from './session-question-responses.entity';

@Injectable()
export class SessionQuestionResponsesService {
  constructor(
    private readonly sessionQuestionResponsesRepository: SessionQuestionResponsesRepository,
  ) {}

  async createSessionQuestionReponse(
    sessionQuestionId: string,
    sessionId: string,
    userId: string,
  ): Promise<string> {
    const id = uuidv4();
    await this.sessionQuestionResponsesRepository.createSessionQuestionResponse({
      id,
      sessionQuestionId,
      sessionId,
      userId,
    });
    return id;
  }

  async getAttemptedQuestionsIds(sessionId: string, userId: string): Promise<string[]> {
    const attemptedQuestions: Array<Pick<
      SessionQuestionResponse,
      'id' | 'sessionQuestionId'
    >> = await this.sessionQuestionResponsesRepository.listSessionQuestionResponses({
      where: { sessionId, userId },
      select: ['id', 'sessionQuestionId'],
    });
    return attemptedQuestions.map(({ sessionQuestionId }) => sessionQuestionId);
  }

  async getAttemptedQuestionsNumbers(
    sessionId: string,
    userId: string,
  ): Promise<{ passedQuestionsCount: number; totalQuestionsCount: number }> {
    const questionAttempts = await this.sessionQuestionResponsesRepository.listSessionQuestionResponses(
      {
        where: { sessionId, userId },
        select: ['id', 'isCorrect'],
      },
    );
    return {
      passedQuestionsCount: questionAttempts.filter(({ isCorrect }) => isCorrect).length,
      totalQuestionsCount: questionAttempts.length,
    };
  }

  async updateSessionQuestionReponse(
    sessionQuestionResponseId: string,
    response: string,
    isCorrect: boolean,
  ): Promise<void> {
    await this.sessionQuestionResponsesRepository.updateSessionQuestionResponse(
      sessionQuestionResponseId,
      {
        response,
        isCorrect,
      },
    );
  }
}
