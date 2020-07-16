import { Injectable } from '@nestjs/common';
import { SessionCandidatesRepository } from './session-candidates.repository';
import { ShortListCandidateDTO } from './dtos';
import { SessionCandidateStatusTypes } from 'src/session-candidate-statuses/session-candidate-statuses.types';
import { MailService } from 'src/shared/services';
import { SessionCandidate } from './session-candidates.entity';

@Injectable()
export class SessionCandidatesService {
  constructor(
    private readonly sessionCandidatesRepository: SessionCandidatesRepository,
    private readonly mailService: MailService,
  ) {}

  async shortListCandidate(shortListCandidate: ShortListCandidateDTO): Promise<void> {
    // TODO limit the amount of candidates a user can shortlist
    await this.sessionCandidatesRepository.createSessionCandidate({
      ...shortListCandidate,
      statusSystemName: SessionCandidateStatusTypes.Sent,
    });
    this.mailService.sendShortListCandidateMail({
      to: 'user@email.com',
      context: { name: 'TODO' },
    });
  }

  async getSessionCandidateId(sessionId: string, userId: string): Promise<string> {
    const sessionCandidate: Pick<
      SessionCandidate,
      'id'
    > = await this.sessionCandidatesRepository.showSessionCandidate({
      where: { userId, sessionId },
      select: ['id'],
    });

    if (!sessionCandidate) {
      return null;
    }

    return sessionCandidate.id;
  }

  async processCandidateStatus(
    sessionCandidateId: string,
    candidateStatus: SessionCandidateStatusTypes,
  ): Promise<void> {
    const updatePayload: Partial<SessionCandidate> = {
      statusSystemName: candidateStatus,
    };

    const currentDateTime = new Date().toString();

    switch (candidateStatus) {
      case SessionCandidateStatusTypes.Opened:
        updatePayload.openedAt = currentDateTime;
        break;

      case SessionCandidateStatusTypes.Interested:
        updatePayload.respondedAt = currentDateTime;
        break;

      case SessionCandidateStatusTypes.Rejected:
        updatePayload.respondedAt = currentDateTime;
        break;

      case SessionCandidateStatusTypes.PassedQuiz:
        updatePayload.quizedAt = currentDateTime;
        break;

      case SessionCandidateStatusTypes.FailedQuiz:
        updatePayload.quizedAt = currentDateTime;
        break;
    }

    await this.sessionCandidatesRepository.updateSessionCandidate(
      sessionCandidateId,
      updatePayload,
    );
  }
}
