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
  UseInterceptors,
} from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../shared/decorators';
import { CreateUserFavouriteSkillDTO } from './dtos';
import { UserFavouriteSkillsService } from './user-favourite-skills.service';
import { ReduceAuthenticatedUserIdToBodyInterceptor } from '../shared/interceptors';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('user-favourite-skills'))
@UseGuards(AuthGuard('jwt'))
export class UserFavouriteSkillsApiController {
  constructor(private readonly userFavouriteSkillsService: UserFavouriteSkillsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ReduceAuthenticatedUserIdToBodyInterceptor)
  async create(@Body() createUserFavouriteSkillDTO: CreateUserFavouriteSkillDTO): Promise<void> {
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
