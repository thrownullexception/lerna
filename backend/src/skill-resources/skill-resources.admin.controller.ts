import {
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Delete,
  Get,
  Render,
  Res,
  Headers,
  Patch,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateSkillResourceDTO, CreateSkillResourceDTO } from './dtos';
import { AdminController, ISessionFlash, SessionFlash } from '../shared/decorators';
import { SkillsService } from '../skills/skills.service';
import { SkillResourcesService } from './skill-resources.services';
import { SkillMediaTypesService } from '../skill-media-types/skill-media-types.service';
import { CastBooleanParametersPipe } from '../shared/pipes';

const DOMAIN = 'skill-resources';

@AdminController(DOMAIN, 'CAN_MANAGE_SKILLS')
export class SkillResourcesAdminController {
  constructor(
    private readonly skillResourcesService: SkillResourcesService,
    private readonly skillsService: SkillsService,
    private readonly skillMediaTypesService: SkillMediaTypesService,
  ) {}

  @Get(':skillId/create')
  @Render(`admin/${DOMAIN}/create`)
  async renderCreate(
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<Record<string, unknown>> {
    const skill = await this.skillsService.getBasicSkillDetails(skillId);
    return {
      skill,
      skillMediaTypes: await this.skillMediaTypesService.listSkillMediaTypesAsSelectOptions(),
    };
  }

  @Get(':skillResourceId/edit')
  @Render(`admin/${DOMAIN}/edit`)
  async renderUpdate(
    @Param('skillResourceId', new ParseUUIDPipe()) skillResourceId: string,
  ): Promise<Record<string, unknown>> {
    return {
      skillResource: await this.skillResourcesService.showSkillResource(skillResourceId),
      skillMediaTypes: await this.skillMediaTypesService.listSkillMediaTypesAsSelectOptions(),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(
      new CastBooleanParametersPipe<CreateSkillResourceDTO>(['isFree']),
    )
    createSkillResourceDTO: CreateSkillResourceDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillResourcesService.createSkillResource(createSkillResourceDTO);
    sessionFlash.success('Skill Resource Added Successfully');
    res.redirect(back);
  }

  @Patch(':skillResourceId')
  async update(
    @Body(
      new CastBooleanParametersPipe<UpdateSkillResourceDTO>(['isFree']),
    )
    updateSkillResourceDTO: UpdateSkillResourceDTO,
    @Param('skillResourceId', new ParseUUIDPipe()) skillResourceId: string,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillResourcesService.updateSkillResource(skillResourceId, updateSkillResourceDTO);
    sessionFlash.success('Skill Resource Updated Successfully');
    res.redirect(back);
  }

  @Delete(':skillResourceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Headers('referer') back: string,
    @Param('skillResourceId', new ParseUUIDPipe()) skillResourceId: string,
    @Res() res: Response,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillResourcesService.deleteSkillResource(skillResourceId);
    sessionFlash.success('Skill Resource Deleted Successfully');
    res.redirect(back);
  }
}
