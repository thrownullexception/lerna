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
import { APP_CONSTANTS } from 'src/shared/constants';
import { AuthGuard } from '@nestjs/passport';
import { TutorSkillTransformer } from './transfomers';
import { TutorSkillsService } from './tutor-skills.service';
import { AuthenticatedUser } from 'src/shared/decorators';
import { TutorSkillDTO } from './tutor-skills.dto';

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
    @AuthenticatedUser('userId', new ParseUUIDPipe()) userId: string,
    @Body() tutorSkillDTO: TutorSkillDTO,
  ): Promise<void> {
    await this.tutorSkillsService.createTutorSkill(tutorSkillDTO, userId);
  }

  @Patch(':tutorSkillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('tutorSkillId', new ParseUUIDPipe()) tutorSkillId: string,
    @Body() tutorSkillDTO: TutorSkillDTO,
  ): Promise<void> {
    await this.tutorSkillsService.updateTutorSkill(tutorSkillId, tutorSkillDTO);
  }

  @Delete(':tutorSkillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('tutorSkillId', new ParseUUIDPipe()) tutorSkillId: string): Promise<void> {
    await this.tutorSkillsService.deleteTutorSkill(tutorSkillId);
  }
}
