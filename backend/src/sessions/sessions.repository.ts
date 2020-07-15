import {
  Repository,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { buildPaginator, PagingQuery } from 'typeorm-cursor-pagination';

import { Session } from './sessions.entity';
import { PagingResult } from 'typeorm-cursor-pagination/lib/Paginator';

@Injectable()
@EntityRepository(Session)
export class SessionsRepository extends Repository<Session> {
  async listSessions(findManyOptions: FindManyOptions<Session>): Promise<Session[]> {
    return await this.find({
      ...findManyOptions,
    });
  }

  async listSessionsAndCount(
    findAndCountOptions: FindManyOptions<Session>,
  ): Promise<[Session[], number]> {
    return await this.findAndCount(findAndCountOptions);
  }

  async showSession(options: FindOneOptions<Session>): Promise<Session> {
    return await this.findOne({
      ...options,
    });
  }

  async cursorPaginateSessions(
    queryBuilder: SelectQueryBuilder<Session>,
    pagingQuery: PagingQuery,
  ): Promise<PagingResult<Session>> {
    const paginator = buildPaginator({
      entity: Session,
      query: pagingQuery,
      paginationKeys: ['createdAt'], // TODO check what happens with `id`
    });
    return await paginator.paginate(queryBuilder);
  }

  async createSession(session: Partial<Session>): Promise<void> {
    await this.insert(session);
  }

  async updateSession(sessionId: string, session: Partial<Session>): Promise<void> {
    await this.update(sessionId, session);
  }
}
