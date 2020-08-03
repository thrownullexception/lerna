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
} from '@nestjs/common';
import { APP_CONSTANTS } from '../shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { TutorSkillTransformer } from './transfomers';
import { TutorSkillsService } from './tutor-skills.service';
import { AuthenticatedUser } from '../shared/decorators';
import { CreateTutorSkillDTO, UpdateTutorSkillDTO } from './dtos';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('tutor-skills'))
@UseGuards(AuthGuard('jwt'))
export class TutorSkillsApiController {
  constructor(private readonly tutorSkillsService: TutorSkillsService) {}

  @Get(':userId')
  async show(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<TutorSkillTransformer[]> {
    const { tutorSkills, tutorSkillLevels } = await this.tutorSkillsService.getUserTutorSkills(
      userId,
    );
    return tutorSkills.map(tutorSkill => new TutorSkillTransformer(tutorSkill, tutorSkillLevels));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
    @Body() createTutorSkillDTO: CreateTutorSkillDTO, // TODO a pipe to reduce the userId into body
  ): Promise<void> {
    await this.tutorSkillsService.createTutorSkill(createTutorSkillDTO, userId);
  }

  @Patch(':tutorSkillId')
  @HttpCode(HttpStatus.NO_CONTENT)
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
