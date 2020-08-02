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
import { UpdateSkillHierarchyDTO, CreateSkillHierarchyDTO } from './dtos';
import { SkillHierarchiesService } from './skill-hierarchies.service';
import { AdminController, ISessionFlash, SessionFlash } from '../shared/decorators';
import { SkillsService } from '../skills/skills.service';
import { ISkillWithRestAsOptions } from '../skills/skills.types';

const DOMAIN = 'skill-hierarchies';

@AdminController(DOMAIN, 'CAN_MANAGE_SKILLS')
export class SkillHierarchiesAdminController {
  constructor(
    private readonly skillHierarchiesService: SkillHierarchiesService,
    private readonly skillsService: SkillsService,
  ) {}

  @Get(':skillId/create')
  @Render(`admin/${DOMAIN}/create`)
  async renderCreate(
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<ISkillWithRestAsOptions> {
    return await this.skillsService.getSkillWithTheRestAsOptions(skillId);
  }

  @Get(':skillId/:skillHierarchyId/edit')
  @Render(`admin/${DOMAIN}/edit`)
  async renderUpdate(
    @Param('skillHierarchyId', new ParseUUIDPipe()) skillHierarchyId: string,
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<Record<string, unknown>> {
    return {
      skillHierarchy: await this.skillHierarchiesService.showSkillHierarchy(skillHierarchyId),
      skillId,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSkillHierarchyDTO: CreateSkillHierarchyDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillHierarchiesService.createSkillHierarchy(createSkillHierarchyDTO);
    sessionFlash.success('Skill Hierarchy Added Successfully');
    res.redirect(back);
  }

  @Patch(':skillHierarchyId')
  async update(
    @Body() updateSkillHierarchyDTO: UpdateSkillHierarchyDTO,
    @Param('skillHierarchyId', new ParseUUIDPipe()) skillHierarchyId: string,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillHierarchiesService.updateSkillHierarchy(
      skillHierarchyId,
      updateSkillHierarchyDTO,
    );
    sessionFlash.success('Skill Hierarchy Updated Successfully');
    res.redirect(back);
  }

  @Delete(':skillHierarchyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Headers('referer') back: string,
    @Param('skillHierarchyId', new ParseUUIDPipe()) skillHierarchyId: string,
    @Res() res: Response,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillHierarchiesService.deleteSkillHierarchy(skillHierarchyId);
    sessionFlash.success('Skill Hierarchy Deleted Successfully');
    res.redirect(back);
  }
}
