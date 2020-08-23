import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { TutorSkillTransformer } from './transfomers';
import { TutorSkillsService } from './tutor-skills.service';
import { AuthenticatedUser } from '../shared/decorators';
import { CreateTutorSkillDTO, UpdateTutorSkillDTO } from './dtos';
import { ReduceAuthenticatedUserIdToBodyInterceptor } from '../shared/interceptors';

@UseGuards(AuthGuard('jwt'))
@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('tutor-skills'))
export class TutorSkillsApiController {
  constructor(private readonly tutorSkillsService: TutorSkillsService) {}

  @Get()
  async show(
    @AuthenticatedUser('id', ParseUUIDPipe) userId: string,
  ): Promise<TutorSkillTransformer[]> {
    const tutorSkills = await this.tutorSkillsService.getUserTutorSkills(userId);
    return tutorSkills.map(tutorSkill => new TutorSkillTransformer(tutorSkill));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(ReduceAuthenticatedUserIdToBodyInterceptor)
  async create(@Body() createTutorSkillDTO: CreateTutorSkillDTO): Promise<void> {
    await this.tutorSkillsService.createTutorSkill(createTutorSkillDTO);
  }

  @Patch(':tutorSkillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(ReduceAuthenticatedUserIdToBodyInterceptor)
  async update(
    @Param('tutorSkillId', new ParseUUIDPipe()) tutorSkillId: string,
    @Body() updateTutorSkillDTO: UpdateTutorSkillDTO,
  ): Promise<void> {
    await this.tutorSkillsService.updateTutorSkill(tutorSkillId, updateTutorSkillDTO);
  }

  @Delete(':tutorSkillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('tutorSkillId', new ParseUUIDPipe()) tutorSkillId: string): Promise<void> {
    await this.tutorSkillsService.deleteTutorSkill(tutorSkillId);
  }
}
