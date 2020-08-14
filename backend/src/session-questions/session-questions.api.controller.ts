import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Patch,
  Delete,
  Response,
} from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { ManagesessionQuestionTransformer, NextSessionQuestionTransformer } from './transformers';
import { SessionQuestionDTO, AnswerQuestionDTO } from './dtos';
import { SessionQuestionsService } from './session-questions.service';
import { AuthenticatedUser } from '../shared/decorators';
import { Response as ExpressResponse } from 'express';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('session-questions')) // TODO test
@UseGuards(AuthGuard('jwt'))
export class SessionQuisApiController {
  constructor(private readonly sessionQuestionsService: SessionQuestionsService) {}

  @Get(':sessionId')
  async listForManagement(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<ManagesessionQuestionTransformer[]> {
    const sessionQuizzes = await this.sessionQuestionsService.listSessionQuestions(sessionId);
    return sessionQuizzes.map(sessionQuiz => new ManagesessionQuestionTransformer(sessionQuiz));
  }

  @Get(':sessionId/nextquiz')
  async show(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
    @AuthenticatedUser('id') userId: string,
  ): Promise<NextSessionQuestionTransformer> {
    return new NextSessionQuestionTransformer(
      await this.sessionQuestionsService.getNextSessionQuestion(sessionId, userId),
    );
  }

  @Post('answer')
  async answerQuiz(
    @Body() answerQuestionDTO: AnswerQuestionDTO,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    await this.sessionQuestionsService.answerQuestionDTO(answerQuestionDTO);
    res.redirect(
      APP_CONSTANTS.ADMIN_ROUTES_PREFIX(
        `session-quizzes/${answerQuestionDTO.sessionId}/nextquiz`,
        '/',
      ),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() sessionQuestionDTO: SessionQuestionDTO): Promise<void> {
    await this.sessionQuestionsService.createSessionQuestion(sessionQuestionDTO);
  }

  @Patch(':sessionQuestionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('sessionQuestionId', new ParseUUIDPipe()) sessionQuestionId: string,
    @Body() sessionQuestionDTO: SessionQuestionDTO,
  ): Promise<void> {
    await this.sessionQuestionsService.updateSessionQuestion(sessionQuestionId, sessionQuestionDTO);
  }

  @Delete(':sessionQuestionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('sessionQuestionId', new ParseUUIDPipe()) sessionQuestionId: string,
  ): Promise<void> {
    await this.sessionQuestionsService.deleteSessionQuestion(sessionQuestionId);
  }
}
