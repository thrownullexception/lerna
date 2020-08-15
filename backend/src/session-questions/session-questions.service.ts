import { Injectable, Logger, Inject } from '@nestjs/common';
import { SessionQuestionDTO, AnswerQuestionDTO } from './dtos';
import { SessionQuestionsRepository } from './session-Questions.repository';
import { SessionQuestion } from './session-Questions.entity';
import { SessionQuestionResponsesService } from '../session-question-responses/session-question-responses.service';
import { IsNotIn } from 'class-validator';
import { INextSessionQuestion } from './session-questions.types';
import { SessionsService } from '../sessions/sessions.service';
import { SessionCandidatesService } from '../session-candidates/session-candidates.service';
import { SessionCandidateStatusTypes } from '../session-candidate-statuses/session-candidate-statuses.types';

@Injectable()
export class SessionQuestionsService {
  constructor(
    private readonly sessionQuestionsRepository: SessionQuestionsRepository,
    private readonly sessionQuestionResponsesService: SessionQuestionResponsesService,
    private readonly sessionsService: SessionsService,
    private readonly sessionCandidatesService: SessionCandidatesService,

    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  async listSessionQuestions(sessionId: string): Promise<SessionQuestion[]> {
    return this.sessionQuestionsRepository.listSessionQuestions({
      where: { sessionId },
    });
  }

  async getNextSessionQuestion(sessionId: string, userId: string): Promise<INextSessionQuestion> {
    // TODO Make sure I am a candidate before show the question
    // TODO make the same Question retry just redirect to the result page
    const attemptedQuestionIds = await this.sessionQuestionResponsesService.getAttemptedQuestionsIds(
      sessionId,
      userId,
    );
    const nextSessionQuestion = await this.sessionQuestionsRepository.showSessionQuestion({
      where: { id: IsNotIn(attemptedQuestionIds) },
    });

    if (nextSessionQuestion) {
      const sessionQuestionResponseId = await this.sessionQuestionResponsesService.createSessionQuestionReponse(
        nextSessionQuestion.id,
        sessionId,
        userId,
      );
      return { ...nextSessionQuestion, sessionQuestionResponseId };
    }

    return this.getSessionQuestionResult(sessionId, userId);
  }

  private async getSessionQuestionResult(
    sessionId: string,
    userId: string,
  ): Promise<INextSessionQuestion> {
    const passPercentage = await this.sessionsService.getSessionField<number>(
      sessionId,
      'passPercentage',
    );
    const {
      passedQuestionsCount,
      totalQuestionsCount,
    } = await this.sessionQuestionResponsesService.getAttemptedQuestionsNumbers(sessionId, userId);
    const result = (passedQuestionsCount / totalQuestionsCount) * 100 >= passPercentage;
    this.sessionCandidatesService.processCandidateStatus(
      await this.sessionCandidatesService.getSessionCandidateId(sessionId, userId),
      result
        ? SessionCandidateStatusTypes.PassedQuestions
        : SessionCandidateStatusTypes.FailedQuestions,
    );
    return { checkResult: true, result };
  }

  async answerQuestionDTO({
    sessionQuestionId,
    answer,
    sessionQuestionResponseId,
  }: AnswerQuestionDTO): Promise<void> {
    const currentQuestion: Pick<
      SessionQuestion,
      'id' | 'optionA'
    > = await this.sessionQuestionsRepository.showSessionQuestion({
      where: { id: sessionQuestionId },
      select: ['id', 'optionA'],
    });

    if (!currentQuestion) {
      this.logger.warn(
        'Some Hacking on SessionQuestionsService.answerQuestionDTO',
        `${JSON.stringify({ sessionQuestionId, answer, sessionQuestionResponseId })}`,
      );
      return;
    }

    await this.sessionQuestionResponsesService.updateSessionQuestionReponse(
      sessionQuestionResponseId,
      answer,
      currentQuestion.optionA === answer,
    );
  }

  async createSessionQuestion(sessionQuestionDTO: SessionQuestionDTO): Promise<void> {
    return await this.sessionQuestionsRepository.createSessionQuestion({
      ...sessionQuestionDTO,
    });
  }

  async updateSessionQuestion(
    sessionQuestionId: string,
    sessionQuestion: Partial<SessionQuestion>,
  ): Promise<void> {
    await this.sessionQuestionsRepository.updateSessionQuestion(sessionQuestionId, sessionQuestion);
  }

  async deleteSessionQuestion(sessionQuestionId: string): Promise<void> {
    await this.sessionQuestionsRepository.deleteSessionQuestion(sessionQuestionId);
  }
}
