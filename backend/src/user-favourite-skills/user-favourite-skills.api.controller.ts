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
import { APP_CONSTANTS } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../shared/decorators';
import { CreateUserFavouriteSkillDTO } from './dtos';
import { UserFavouriteSkillsService } from './user-favourite-skills.service';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('user-favourite-skills'))
@UseGuards(AuthGuard('jwt'))
export class UserFavouriteSkillsApiController {
  constructor(private readonly userFavouriteSkillsService: UserFavouriteSkillsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
    @Body() createUserFavouriteSkillDTO: CreateUserFavouriteSkillDTO,
  ): Promise<void> {
    // if (userId != createUserFavouriteSkillDTO.userId) { // TODO use the userId reduced here
    //     throw new BadRequestException('UserId has been tampered with');
    //     // TODO log an hack
    // }
    await this.userFavouriteSkillsService.createUserFavouriteSkill(createUserFavouriteSkillDTO);
  }

  @Delete(':skillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<void> {
    await this.userFavouriteSkillsService.deleteUserFavouriteSkill(userId, skillId);
  }
}
