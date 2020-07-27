import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { SessionCandidatesRepository } from './session-candidates.repository';
import { ShortListCandidateDTO } from './dtos';
import {
  SessionCandidateStatusTypes,
  StatusesToReduceToAlreadyFilled,
  StatusesToReduceToNoResponse,
} from '../session-candidate-statuses/session-candidate-statuses.types';
import { MailService } from '../shared/services';
import { SessionCandidate } from './session-candidates.entity';
import { ICursorParametersDTO } from '../shared/types';
import { PagingResult } from 'typeorm-cursor-pagination';

@Injectable()
export class SessionCandidatesService {
  constructor(
    private readonly sessionCandidatesRepository: SessionCandidatesRepository,
    private readonly mailService: MailService,
  ) {}

  async shortListCandidate(shortListCandidate: ShortListCandidateDTO): Promise<void> {
    // TODO limit the amount of candidates a user can shortlist
    // Check if I have the amount to shortlist
    await this.sessionCandidatesRepository.createSessionCandidate({
      ...shortListCandidate,
      statusSystemName: SessionCandidateStatusTypes.Sent,
    });
    // Also tell them to take the quiz as soon as possible
    this.mailService.sendShortListCandidateMail({
      to: 'user@email.com',
      context: { name: 'TODO' },
    });
  }

  async listTutorSessions(
    tutorId: string,
    cursorParametersDTO: ICursorParametersDTO,
  ): Promise<PagingResult<SessionCandidate>> {
    return this.sessionCandidatesRepository.cursorPaginateCandidatesSessions(
      this.sessionCandidatesRepository
        .createQueryBuilder('sessionCandidate')
        .where(`sessionCandidate.candidateId=:tutorId`, { tutorId })
        .leftJoinAndSelect('sessionCandidate.session', 'session'),
      cursorParametersDTO,
    );
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
    reason?: string,
  ): Promise<void> {
    const updatePayload: Partial<SessionCandidate> = {
      statusSystemName: candidateStatus,
    };
    // TODO If the status of the session is selected_tutor then dont allow status to change to `passed_quiz`, `no_response`
    const currentDateTime = new Date().toString();

    switch (candidateStatus) {
      case SessionCandidateStatusTypes.NoResponse:
        // if the session status is not in StopMailingStudentAboutNoResponse then Mail the tutor that a candidate status has been moved to `NoResponse` hence they have one more spot
        // Mail the student that since they got didn't take the quiz or not interested that their spot has been lifted and will be filled to someone else based on the student choice
        break;

      case SessionCandidateStatusTypes.Opened:
        updatePayload.openedAt = currentDateTime;
        break;

      case SessionCandidateStatusTypes.Interested:
        updatePayload.respondedAt = currentDateTime;
        // Mail the student about news that someone is interested on the session
        // Mail the tutor that we happy they are interested in the session and also that they have XXX time left to take the question
        break;

      case SessionCandidateStatusTypes.Rejected:
        updatePayload.respondedAt = currentDateTime;
        updatePayload.reason = reason;
        // Mail the student about the news that they can shortlist someone else and provide the reason
        break;

      case SessionCandidateStatusTypes.PassedQuiz:
        updatePayload.quizedAt = currentDateTime;
        // Student that some
        break;

      case SessionCandidateStatusTypes.FailedQuiz:
        updatePayload.quizedAt = currentDateTime;
        break;

      case SessionCandidateStatusTypes.Selected:
        // Mail the selected the candidate about the news and about the next steps
        // Mail the other StatusesToSendSomeOneElseIsSelectedMail candidate about this news
        break;
      case SessionCandidateStatusTypes.AlreadyFilled:
        // Mail the candidate that the student has decided to move along with other candidate
        // Then tell them to speed up their response rate since candidates usually go with the first person
        break;
    }

    await this.sessionCandidatesRepository.updateSessionCandidate(
      sessionCandidateId,
      updatePayload,
    );
  }

  async selectACandidate(sessionCandidateId: string): Promise<void> {
    // TODO deduction stuffs
    await this.processCandidateStatus(sessionCandidateId, SessionCandidateStatusTypes.Selected);

    const { sessionId } = await this.sessionCandidatesRepository.showSessionCandidate({
      where: { id: sessionCandidateId },
      select: ['id', 'sessionId'],
    });

    const candidatesToReduceToAlreadyFilled: Array<Pick<
      SessionCandidate,
      'id'
    >> = await this.sessionCandidatesRepository.listSessionCandidates({
      where: { sessionId, statusSystemName: In(StatusesToReduceToAlreadyFilled) },
      select: ['id'],
    });
    await Promise.all(
      candidatesToReduceToAlreadyFilled.map(({ id }) =>
        this.processCandidateStatus(id, SessionCandidateStatusTypes.AlreadyFilled),
      ),
    );
    // Mail the student about the next steps and also the deduction
  }

  async reduceNoResponseCandidates(): Promise<void> {
    await this.sessionCandidatesRepository.listSessionCandidates({
      where: {
        statusSystemName: In(StatusesToReduceToNoResponse),
      },
      select: ['id', 'candidateId', 'createdAt'],
    });
    // await Promise.all(candidates.filter(({createdAt}) => createdAt - (new Date()).toString() > 24).map(({id}) => this.processCandidateStatus(id, SessionCandidateStatusTypes.NoResponse)));
  }
}
