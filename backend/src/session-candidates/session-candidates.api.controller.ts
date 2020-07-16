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
import { APP_CONSTANTS } from 'src/shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { ShortListCandidateDTO } from './dtos';
import { SessionCandidatesService } from './session-candidates.service';
import { CandidateResponseDTO } from './dtos/candidate-response.dto';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('session-candidates'))
@UseGuards(AuthGuard('jwt'))
export class SessionCandidatesApiController {
  constructor(private readonly sessionCandidatesService: SessionCandidatesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() shortListCandidateDTO: ShortListCandidateDTO): Promise<void> {
    await this.sessionCandidatesService.shortListCandidate(shortListCandidateDTO);
  }

  @Patch(':sessionCandidateId/response')
  @HttpCode(HttpStatus.CREATED)
  async updateStatus(
    @Body() candidateResponseDTO: CandidateResponseDTO,
    @Param('sessionCandidateId', new ParseUUIDPipe()) sessionCandidateId: string,
  ): Promise<void> {
    await this.sessionCandidatesService.processCandidateStatus(
      sessionCandidateId,
      candidateResponseDTO.response,
    );
  }
}
