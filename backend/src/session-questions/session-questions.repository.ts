import { Repository, EntityRepository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { SessionQuestion } from './session-questions.entity';

@Injectable()
@EntityRepository(SessionQuestion)
export class SessionQuestionsRepository extends Repository<SessionQuestion> {
  async listSessionQuestions(
    findManyOptions: FindManyOptions<SessionQuestion>,
  ): Promise<SessionQuestion[]> {
    return await this.find(findManyOptions);
  }

  async createSessionQuestion(sessionQuestion: Partial<SessionQuestion>): Promise<void> {
    await this.insert(sessionQuestion);
  }

  async showSessionQuestion(options: FindOneOptions<SessionQuestion>): Promise<SessionQuestion> {
    return await this.findOne({
      ...options,
    });
  }

  async updateSessionQuestion(
    sessionQuestionId: string,
    sessionQuestion: Partial<SessionQuestion>,
  ): Promise<void> {
    await this.update(sessionQuestionId, sessionQuestion);
  }

  async deleteSessionQuestion(sessionQuestionId: string): Promise<void> {
    await this.delete(sessionQuestionId);
  }
}
