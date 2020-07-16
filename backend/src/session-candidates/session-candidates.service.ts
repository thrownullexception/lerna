import { Injectable } from '@nestjs/common';
import { SessionQuizResponseRepository } from './session-quiz-responses.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SessionQuizResponseService {
  constructor(private readonly sessionQuizResponseRepository: SessionQuizResponseRepository) {}

  async createSessionQuizReponse(sessionQuizId: string, userId: string): Promise<string> {
    const id = uuidv4();
    await this.sessionQuizResponseRepository.createSessionQuizResponse({
      id,
      sessionQuizId,
      userId,
    });
    return id;
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
