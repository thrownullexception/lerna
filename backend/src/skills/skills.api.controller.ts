import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillListTransformer, SkillDetailsTransformer } from './transfomers';
import { APP_CONSTANTS } from '../shared/constants';
import { SkillHierarchyTransformer } from '../skill-hierarchies/transformers';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../shared/decorators';
import { IMySkillActions } from './skills.types';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('skills')) // TODO test
@UseGuards(AuthGuard('jwt'))
export class SkillsApiController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('hierarchies')
  async skillHierarchies(): Promise<SkillHierarchyTransformer[]> {
    return (await this.skillsService.getSkillHierarchies()).map(
      skillHierarchy => new SkillHierarchyTransformer(skillHierarchy),
    );
  }

  @Get('my-favourite-skills-and-completed-roadmaps')
  async myFavouriteSkillsAndCompletedRoadMaps(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
  ): Promise<IMySkillActions> {
    return await this.skillsService.getMyFavouriteSkillsAndCompletedRoadMaps(userId);
  }

  @Get('list')
  async listSkills(): Promise<SkillListTransformer[]> {
    const skills = await this.skillsService.listSkills();
    return skills.map(skill => new SkillListTransformer(skill));
  }

  @Get(':skillId')
  async show(
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<SkillDetailsTransformer> {
    return new SkillDetailsTransformer(await this.skillsService.getSkillDetailsForUser(skillId));
  }
}
