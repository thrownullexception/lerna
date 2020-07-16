import {
  Controller,
  Param,
  ParseUUIDPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { APP_CONSTANTS } from 'src/shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { CreateSessionSkillDTO } from './dtos';
import { SessionSkillsService } from './session-skills.service';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('session-skills'))
@UseGuards(AuthGuard('jwt'))
export class SessionSkillsApiController {
  constructor(private readonly sessionSkillsService: SessionSkillsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSessionDTO: CreateSessionSkillDTO): Promise<void> {
    await this.sessionSkillsService.createSessionSkill(createSessionDTO);
  }

  @Delete(':sessionSkillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSessionSkill(
    @Param('sessionSkillId', new ParseUUIDPipe()) sessionSkillId: string,
  ): Promise<void> {
    await this.sessionSkillsService.deleteSessionSkill(sessionSkillId);
  }
}
