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
import { ManageSessionQuizTransformer, NextSessionQuizTransformer } from './transformers';
import { SessionQuizDTO, AnswerQuizDTO } from './dtos';
import { SessionQuizzesService } from './session-quizzes.service';
import { AuthenticatedUser } from '../shared/decorators';
import { Response as ExpressResponse } from 'express';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('session-quizzes'))
@UseGuards(AuthGuard('jwt'))
export class SessionQuizzesApiController {
  constructor(private readonly sessionQuizzesService: SessionQuizzesService) {}

  @Get(':sessionId')
  async listForManagement(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<ManageSessionQuizTransformer[]> {
    const sessionQuizzes = await this.sessionQuizzesService.listSessionQuizzes(sessionId);
    return sessionQuizzes.map(sessionQuiz => new ManageSessionQuizTransformer(sessionQuiz));
  }

  @Get(':sessionId/nextquiz')
  async show(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
    @AuthenticatedUser('id') userId: string,
  ): Promise<NextSessionQuizTransformer> {
    return new NextSessionQuizTransformer(
      await this.sessionQuizzesService.getNextSessionQuiz(sessionId, userId),
    );
  }

  @Post('answer')
  async answerQuiz(
    @Body() answerQuizDTO: AnswerQuizDTO,
    @Response() res: ExpressResponse,
  ): Promise<void> {
    await this.sessionQuizzesService.answerQuizDTO(answerQuizDTO);
    res.redirect(
      APP_CONSTANTS.ADMIN_ROUTES_PREFIX(`session-quizzes/${answerQuizDTO.sessionId}/nextquiz`, '/'),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() sessionQuizDTO: SessionQuizDTO): Promise<void> {
    await this.sessionQuizzesService.createSessionQuiz(sessionQuizDTO);
  }

  @Patch(':sessionQuizId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('sessionQuizId', new ParseUUIDPipe()) sessionQuizId: string,
    @Body() sessionQuizDTO: SessionQuizDTO,
  ): Promise<void> {
    await this.sessionQuizzesService.updateSessionQuiz(sessionQuizId, sessionQuizDTO);
  }

  @Delete(':sessionQuizId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('sessionQuizId', new ParseUUIDPipe()) sessionQuizId: string): Promise<void> {
    await this.sessionQuizzesService.deleteSessionQuiz(sessionQuizId);
  }
}
