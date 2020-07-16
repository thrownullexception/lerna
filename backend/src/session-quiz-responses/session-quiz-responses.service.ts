import { Injectable } from '@nestjs/common';
import { SessionQuizResponseRepository } from './session-quiz-responses.repository';
import { v4 as uuidv4 } from 'uuid';
import { SessionQuizResponse } from './session-quiz-responses.entity';

@Injectable()
export class SessionQuizResponseService {
  constructor(private readonly sessionQuizResponseRepository: SessionQuizResponseRepository) {}

  async createSessionQuizReponse(
    sessionQuizId: string,
    sessionId: string,
    userId: string,
  ): Promise<string> {
    const id = uuidv4();
    await this.sessionQuizResponseRepository.createSessionQuizResponse({
      id,
      sessionQuizId,
      sessionId,
      userId,
    });
    return id;
  }

  async getAttemptedQuizIds(sessionId: string, userId: string): Promise<string[]> {
    const attemptedQuiz: Array<Pick<
      SessionQuizResponse,
      'id' | 'sessionQuizId'
    >> = await this.sessionQuizResponseRepository.listSessionQuizResponses({
      where: { sessionId, userId },
      select: ['id', 'sessionQuizId'],
    });
    return attemptedQuiz.map(({ sessionQuizId }) => sessionQuizId);
  }

  async getAttemptedQuizNumbers(
    sessionId: string,
    userId: string,
  ): Promise<{ passedQuizCount: number; totalQuizCount: number }> {
    const quizAttempts = await this.sessionQuizResponseRepository.listSessionQuizResponses({
      where: { sessionId, userId },
      select: ['id', 'isCorrect'],
    });
    return {
      passedQuizCount: quizAttempts.filter(({ isCorrect }) => isCorrect).length,
      totalQuizCount: quizAttempts.length,
    };
  }

  async updateSessionQuizReponse(
    sessionQuizResponseId: string,
    response: string,
    isCorrect: boolean,
  ): Promise<void> {
    await this.sessionQuizResponseRepository.updateSessionQuizResponse(sessionQuizResponseId, {
      response,
      isCorrect,
    });
  }
}
