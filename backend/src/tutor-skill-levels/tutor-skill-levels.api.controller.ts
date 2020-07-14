import { Controller, Get } from '@nestjs/common';
import { TutorSkillLevelsService } from './tutor-skill-levels.service';
import { APP_CONSTANTS } from 'src/shared/constants';
import { SystemValuesTransformer } from '../shared/transformers';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('tutor-skill-levels'))
export class TutorSkillLevelsApiController {
  constructor(private readonly tutorSkillLevelsService: TutorSkillLevelsService) {}

  @Get()
  async list(): Promise<SystemValuesTransformer[]> {
    return (await this.tutorSkillLevelsService.getTutorSkillLevels()).map(
      tutorSkillLevel => new SystemValuesTransformer(tutorSkillLevel),
    );
  }
}
