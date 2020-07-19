import { Injectable } from '@nestjs/common';
import { SessionsRepository } from './sessions.repository';
import { CreateSessionDTO } from './dtos';
import { SessionStatusTypes } from 'src/session-statuses/session-statuses.types';
import { AccountModeType } from 'src/account-modes/account-modes.types';
import { Session } from './sessions.entity';
import { ICursorParametersDTO } from 'src/shared/types';
import { PagingResult } from 'typeorm-cursor-pagination';

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepository: SessionsRepository
  ) {}

  async listStudentsSessions(
    studentId: string,
    cursorParametersDTO: ICursorParametersDTO,
  ): Promise<PagingResult<Session>> {
    return this.sessionsRepository.cursorPaginateSessions(
      this.sessionsRepository
        .createQueryBuilder('session')
        .where(`session.studentId=:studentId`, { studentId }),
      cursorParametersDTO,
    );
  }

  async showSession(sessionId: string): Promise<Session> {
    return await this.sessionsRepository.showSession({ where: { id: sessionId } });
  }

  async getSessionField<T>(sessionId: string, field: keyof Session): Promise<T | null> {
    const session = await this.sessionsRepository.showSession({
      where: { id: sessionId },
      select: ['id', field],
    });
    if (session) {
      return (session[field] as unknown) as T;
    }
    return null;
  }

  async createSession(createSessionDTO: CreateSessionDTO, studentId: string): Promise<void> {
    return await this.sessionsRepository.createSession({
      ...createSessionDTO,
      studentId,
      statusSystemName: SessionStatusTypes.Initialized,
    });
  }

  async updateSession(sessionId: string, session: Partial<Session>): Promise<void> {
    await this.sessionsRepository.updateSession(sessionId, session);
  }
}
