import { Repository, EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SessionQuizResponse } from './session-quiz-responses.entity';

@Injectable()
@EntityRepository(SessionQuizResponse)
export class SessionQuizResponseRepository extends Repository<SessionQuizResponse> {
  async createSessionQuizResponse(
    sessionQuizResponse: Partial<SessionQuizResponse>,
  ): Promise<void> {
    await this.insert(sessionQuizResponse);
  }

  async updateSessionQuizResponse(
    sessionQuizResponseId: string,
    sessionQuizResponse: Partial<SessionQuizResponse>,
  ): Promise<void> {
    await this.update(sessionQuizResponseId, sessionQuizResponse);
  }
}
