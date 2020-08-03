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
  Query,
} from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import {
  SessionDetailTransformer,
  StudentSessionTransformer,
  TutorSessionTransformer,
} from './transformers';
import { AuthenticatedUser } from '../shared/decorators';
import { SessionsService } from './sessions.service';
import { CreateSessionDTO, UpdateSessionMetadataDTO, UpdateSessionDTO } from './dtos';
import { AccountModeType } from '../account-modes/account-modes.types';
import { CursorQueryParametersPipe } from '../shared/pipes';
import { ICursorParametersDTO } from '../shared/types';
import { PagingResult } from 'typeorm-cursor-pagination';
import { SessionCandidatesService } from '../session-candidates/session-candidates.service';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('sessions'))
@UseGuards(AuthGuard('jwt'))
export class SessionsApiController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly sessionCandidatesService: SessionCandidatesService,
  ) {}

  @Get(AccountModeType.Tutor)
  async listForTutor(
    @Query(new CursorQueryParametersPipe()) cursorParametersDTO: ICursorParametersDTO,
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
  ): Promise<PagingResult<TutorSessionTransformer>> {
    const { data, cursor } = await this.sessionsService.listStudentsSessions(
      userId,
      cursorParametersDTO,
    );
    return { data: data.map(session => new TutorSessionTransformer(session)), cursor };
  }

  @Get(AccountModeType.Student)
  async listForStudent(
    @Query(new CursorQueryParametersPipe()) cursorParametersDTO: ICursorParametersDTO,
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
  ): Promise<PagingResult<StudentSessionTransformer>> {
    const { data, cursor } = await this.sessionCandidatesService.listTutorSessions(
      userId,
      cursorParametersDTO,
    );
    return { data: data.map(session => new StudentSessionTransformer(session)), cursor };
  }

  @Get(':sessionId')
  async show(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<SessionDetailTransformer> {
    return new SessionDetailTransformer(await this.sessionsService.showSession(sessionId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
    @Body() createSessionDTO: CreateSessionDTO,
  ): Promise<void> {
    await this.sessionsService.createSession(createSessionDTO, userId);
  }

  @Patch(':sessionId/base')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateBase(
    @Param('sessionId', new ParseUUIDPipe()) tutorSkillId: string,
    @Body() updateSessionDTO: UpdateSessionDTO,
  ): Promise<void> {
    await this.sessionsService.updateSession(tutorSkillId, updateSessionDTO);
  }

  @Patch(':sessionId/meta')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateMeta(
    @Param('sessionId', new ParseUUIDPipe()) tutorSkillId: string,
    @Body() updateSessionMetadataDTO: UpdateSessionMetadataDTO,
  ): Promise<void> {
    await this.sessionsService.updateSession(tutorSkillId, updateSessionMetadataDTO);
  }
}
