import { Controller, Get } from '@nestjs/common';
import { SkillLevelsService } from './skill-levels.service';
import { APP_CONSTANTS } from '../shared/constants';
import { SystemValueTransformer } from '../shared/transformers';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('skill-levels'))
export class SkillLevelsApiController {
  constructor(private readonly skillLevelsService: SkillLevelsService) {}

  @Get()
  async list(): Promise<SystemValueTransformer[]> {
    return (await this.skillLevelsService.getSkillLevels()).map(
      skillLevel => new SystemValueTransformer(skillLevel),
    );
  }
}
