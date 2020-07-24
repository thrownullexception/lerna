import {
  Repository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { SessionCandidate } from './session-candidates.entity';
import { PagingQuery, PagingResult, buildPaginator } from 'typeorm-cursor-pagination';

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

  async cursorPaginateCandidatesSessions(
    queryBuilder: SelectQueryBuilder<SessionCandidate>,
    pagingQuery: PagingQuery,
  ): Promise<PagingResult<SessionCandidate>> {
    const paginator = buildPaginator({
      entity: SessionCandidate,
      query: pagingQuery,
      paginationKeys: ['createdAt'], // TODO check what happens with `id`
    });
    return await paginator.paginate(queryBuilder);
  }

  async updateSessionCandidate(
    sessionCandidateId: string,
    sessionCandidate: Partial<SessionCandidate>,
  ): Promise<void> {
    await this.update(sessionCandidateId, sessionCandidate);
  }
}
