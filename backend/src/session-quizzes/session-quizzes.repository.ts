import { Repository, EntityRepository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { SessionQuiz } from './session-quizzes.entity';

@Injectable()
@EntityRepository(SessionQuiz)
export class SessionQuizzesRepository extends Repository<SessionQuiz> {
  async listSessionQuizzes(findManyOptions: FindManyOptions<SessionQuiz>): Promise<SessionQuiz[]> {
    return await this.find(findManyOptions);
  }

  async createSessionQuiz(sessionQuiz: Partial<SessionQuiz>): Promise<void> {
    await this.insert(sessionQuiz);
  }

  async showSessionQuiz(options: FindOneOptions<SessionQuiz>): Promise<SessionQuiz> {
    return await this.findOne({
      ...options,
    });
  }

  async updateSessionQuiz(sessionQuizId: string, sessionQuiz: Partial<SessionQuiz>): Promise<void> {
    await this.update(sessionQuizId, sessionQuiz);
  }

  async deleteSessionQuiz(sessionQuizId: string): Promise<void> {
    await this.delete(sessionQuizId);
  }
}
