import { Repository, EntityRepository, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SessionQuestionResponse } from './session-question-responses.entity';

@Injectable()
@EntityRepository(SessionQuestionResponse)
export class SessionQuestionResponsesRepository extends Repository<SessionQuestionResponse> {
  async createSessionQuestionResponse(
    sessionQuestionResponse: Partial<SessionQuestionResponse>,
  ): Promise<void> {
    await this.insert(sessionQuestionResponse);
  }

  async updateSessionQuestionResponse(
    sessionQuestionResponseId: string,
    sessionQuestionResponse: Partial<SessionQuestionResponse>,
  ): Promise<void> {
    await this.update(sessionQuestionResponseId, sessionQuestionResponse);
  }

  async listSessionQuestionResponses(
    findManyOptions: FindManyOptions<SessionQuestionResponse>,
  ): Promise<SessionQuestionResponse[]> {
    return await this.find({
      ...findManyOptions,
    });
  }
}
