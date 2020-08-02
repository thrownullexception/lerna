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
} from '@nestjs/common';
import { Response } from 'express';
import { CreateSkillRelationDTO } from './dtos';
import { SkillRelationsService } from './skill-relations.service';
import { AdminController, ISessionFlash, SessionFlash } from '../shared/decorators';
import { SkillsService } from '../skills/skills.service';
import { ISkillWithRestAsOptions } from '../skills/skills.types';

const DOMAIN = 'skill-relations';

@AdminController(DOMAIN, 'CAN_MANAGE_SKILLS')
export class SkillRelationsAdminController {
  constructor(
    private readonly skillRelationsService: SkillRelationsService,
    private readonly skillsService: SkillsService,
  ) {}

  @Get(':skillId/create')
  @Render(`admin/${DOMAIN}/create`)
  async renderCreate(
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<ISkillWithRestAsOptions> {
    return await this.skillsService.getSkillWithTheRestAsOptions(skillId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSkillRelationDTO: CreateSkillRelationDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillRelationsService.createSkillRelation(createSkillRelationDTO);
    sessionFlash.success('Skill Relation Added Successfully');
    res.redirect(back);
  }

  @Delete(':skillAId/:skillBId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Headers('referer') back: string,
    @Param('skillAId', new ParseUUIDPipe()) skillAId: string,
    @Param('skillBId', new ParseUUIDPipe()) skillBId: string,
    @Res() res: Response,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillRelationsService.deleteSkillRelation(skillAId, skillBId);
    sessionFlash.success('Skill Relation Deleted Successfully');
    res.redirect(back);
  }
}
