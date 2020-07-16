import { Injectable, Logger, Inject } from '@nestjs/common';
import { SessionQuizDTO, AnswerQuizDTO } from './dtos';
import { SessionQuizzesRepository } from './session-quizzes.repository';
import { SessionQuiz } from './session-quizzes.entity';
import { SessionQuizResponseService } from 'src/session-quiz-responses/session-quiz-responses.service';
import { IsNotIn } from 'class-validator';
import { INextSessionQuiz } from './session-quizzes.types';
import { SessionsService } from 'src/sessions/sessions.service';
import { SessionCandidatesService } from 'src/session-candidates/session-candidates.service';
import { SessionCandidateStatusTypes } from 'src/session-candidate-statuses/session-candidate-statuses.types';

@Injectable()
export class SessionQuizzesService {
  constructor(
    private readonly sessionQuizzesRepository: SessionQuizzesRepository,
    private readonly sessionQuizResponseService: SessionQuizResponseService,
    private readonly sessionsService: SessionsService,
    private readonly sessionCandidatesService: SessionCandidatesService,

    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async listSessionQuizzes(sessionId: string): Promise<SessionQuiz[]> {
    return this.sessionQuizzesRepository.listSessionQuizzes({
      where: { sessionId },
    });
  }

  async getNextSessionQuiz(sessionId: string, userId: string): Promise<INextSessionQuiz> {
    // TODO Make sure I am a candidate before show the question
    // TODO make the same quiz retry just redirect to the result page
    const attemptedQuizIds = await this.sessionQuizResponseService.getAttemptedQuizIds(
      sessionId,
      userId,
    );
    const nextSessionQuiz = await this.sessionQuizzesRepository.showSessionQuiz({
      where: { id: IsNotIn(attemptedQuizIds) },
    });

    if (nextSessionQuiz) {
      const sessionQuizResponseId = await this.sessionQuizResponseService.createSessionQuizReponse(
        nextSessionQuiz.id,
        sessionId,
        userId,
      );
      return { ...nextSessionQuiz, sessionQuizResponseId };
    }

    return this.getSessionQuizResult(sessionId, userId);
  }

  private async getSessionQuizResult(sessionId: string, userId: string): Promise<INextSessionQuiz> {
    const passPercentage = await this.sessionsService.getSessionField<number>(
      sessionId,
      'passPercentage',
    );
    const {
      passedQuizCount,
      totalQuizCount,
    } = await this.sessionQuizResponseService.getAttemptedQuizNumbers(sessionId, userId);
    const result = (passedQuizCount / totalQuizCount) * 100 >= passPercentage;
    this.sessionCandidatesService.processCandidateStatus(
      await this.sessionCandidatesService.getSessionCandidateId(sessionId, userId),
      result ? SessionCandidateStatusTypes.PassedQuiz : SessionCandidateStatusTypes.FailedQuiz,
    );
    return { checkResult: true, result };
  }

  async answerQuizDTO({
    sessionQuizId,
    answer,
    sessionQuizResponseId,
  }: AnswerQuizDTO): Promise<void> {
    const currentQuiz: Pick<
      SessionQuiz,
      'id' | 'optionA'
    > = await this.sessionQuizzesRepository.showSessionQuiz({
      where: { id: sessionQuizId },
      select: ['id', 'optionA'],
    });

    if (!currentQuiz) {
      this.logger.warn(
        'Some Hacking on SessionQuizzesService.answerQuizDTO',
        `${JSON.stringify({ sessionQuizId, answer, sessionQuizResponseId })}`,
      );
      return;
    }

    await this.sessionQuizResponseService.updateSessionQuizReponse(
      sessionQuizResponseId,
      answer,
      currentQuiz.optionA === answer,
    );
  }

  async createSessionQuiz(sessionQuizDTO: SessionQuizDTO): Promise<void> {
    return await this.sessionQuizzesRepository.createSessionQuiz({
      ...sessionQuizDTO,
    });
  }

  async updateSessionQuiz(sessionQuizId: string, sessionQuiz: Partial<SessionQuiz>): Promise<void> {
    await this.sessionQuizzesRepository.updateSessionQuiz(sessionQuizId, sessionQuiz);
  }

  async deleteSessionQuiz(sessionQuizId: string): Promise<void> {
    await this.sessionQuizzesRepository.deleteSessionQuiz(sessionQuizId);
  }
}
