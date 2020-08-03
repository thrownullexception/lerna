import {
  Controller,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { APP_CONSTANTS } from '../shared/constants';
import { AuthenticatedUser } from '../shared/decorators';
import { CreateUserCompletedSkillRoadMapDTO } from './dtos';
import { UserCompletedSkillRoadMapsService } from './user-completed-skill-road-maps.service';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('user-completed-skill-road-maps'))
@UseGuards(AuthGuard('jwt'))
export class UserCompletedSkillRoadMapsApiController {
  constructor(
    private readonly userCompletedSkillRoadMapsService: UserCompletedSkillRoadMapsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserCompletedSkillRoadMapDTO: CreateUserCompletedSkillRoadMapDTO,
  ): Promise<void> {
    await this.userCompletedSkillRoadMapsService.createUserCompletedSkillRoadMap(
      createUserCompletedSkillRoadMapDTO,
    );
  }

  @Delete(':skillRoadMapId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
    @Param('skillRoadMapId', new ParseUUIDPipe()) skillRoadMapId: string,
  ): Promise<void> {
    await this.userCompletedSkillRoadMapsService.deleteUserCompletedSkillRoadMap(
      userId,
      skillRoadMapId,
    );
  }
}
