import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillTransformer, AllSkillTransformer } from './transfomers';
import { APP_CONSTANTS } from '../shared/constants';
import { SkillHierarchyTransformer } from '../skill-hierarchies/transformers';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedUser } from '../shared/decorators';
import { IMySkillActions } from './skills.types';

@Controller(APP_CONSTANTS.API_ROUTES_PREFIX('skills'))
@UseGuards(AuthGuard('jwt'))
export class SkillsApiController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('with-hierarchies')
  async skillsWithHierarchies(): Promise<{
    skills: SkillTransformer[];
    hierarchies: SkillHierarchyTransformer[];
  }> {
    const { skills, skillHierarchies } = await this.skillsService.getSkillsAndHierarchies();
    return {
      skills: skills.map(skill => new SkillTransformer(skill)),
      hierarchies: skillHierarchies.map(
        skillHierarchy => new SkillHierarchyTransformer(skillHierarchy),
      ),
    };
  }

  @Get('my-actions')
  async mySkillActions(
    @AuthenticatedUser('id', new ParseUUIDPipe()) userId: string,
  ): Promise<IMySkillActions> {
    return await this.skillsService.getMySkillActions(userId);
  }

  @Get('all')
  async allSkills(): Promise<AllSkillTransformer[]> {
    const skills = await this.skillsService.getSkillsNamesAndIds();
    return skills.map(skill => new AllSkillTransformer(skill));
  }

  @Get(':skillId')
  async show(@Param('skillId', new ParseUUIDPipe()) skillId: string): Promise<SkillTransformer> {
    return new SkillTransformer(await this.skillsService.getSkill(skillId), true);
  }
}
