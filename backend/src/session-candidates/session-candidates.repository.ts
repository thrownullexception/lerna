import { Repository, EntityRepository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SessionCandidate } from './session-candidates.entity';

@Injectable()
@EntityRepository(SessionCandidate)
export class SessionCandidatesRepository extends Repository<SessionCandidate> {
  async createSessionCandidate(sessionQuizResponse: Partial<SessionCandidate>): Promise<void> {
    await this.insert(sessionQuizResponse);
  }

  async listSessionCandidates(
    findManyOptions: FindManyOptions<SessionCandidate>,
  ): Promise<SessionCandidate[]> {
    return await this.find(findManyOptions);
  }

  async showSessionCandidate(
    findOneOptions: FindOneOptions<SessionCandidate>,
  ): Promise<SessionCandidate> {
    return await this.findOne(findOneOptions);
  }

  async updateSessionCandidate(
    sessionCandidateId: string,
    sessionCandidate: Partial<SessionCandidate>,
  ): Promise<void> {
    await this.update(sessionCandidateId, sessionCandidate);
  }
}
