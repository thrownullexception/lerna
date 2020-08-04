import {
  Controller,
  Param,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { APP_CONSTANTS } from '../shared/constants';
import { ShortListCandidateDTO, CandidateResponseDTO } from './dtos';
import { SessionCandidatesService } from './session-candidates.service';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('session-candidates')) // TODO test
@UseGuards(AuthGuard('jwt'))
export class SessionCandidatesApiController {
  constructor(private readonly sessionCandidatesService: SessionCandidatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() shortListCandidateDTO: ShortListCandidateDTO): Promise<void> {
    await this.sessionCandidatesService.shortListCandidate(shortListCandidateDTO);
  }

  @Patch(':sessionCandidateId/response')
  async updateStatus(
    @Body() candidateResponseDTO: CandidateResponseDTO,
    @Param('sessionCandidateId', new ParseUUIDPipe()) sessionCandidateId: string,
  ): Promise<void> {
    await this.sessionCandidatesService.processCandidateStatus(
      sessionCandidateId,
      candidateResponseDTO.response,
      candidateResponseDTO.reason,
    );
  }

  @Post(':sessionCandidateId/select')
  @HttpCode(HttpStatus.OK)
  async selectCandidate(
    @Param('sessionCandidateId', new ParseUUIDPipe()) sessionCandidateId: string,
  ): Promise<void> {
    await this.sessionCandidatesService.selectACandidate(sessionCandidateId);
  }
}
