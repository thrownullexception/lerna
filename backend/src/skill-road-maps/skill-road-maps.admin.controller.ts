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
import { CreateSkillRoadMapDTO, UpdateSkillRoadMapDTO } from './dtos';
import { SkillRoadMapsService } from './skill-road-maps.service';
import { AdminController, ISessionFlash, SessionFlash } from '../shared/decorators';
import { SkillsService } from '../skills/skills.service';
import { SkillRoadMap } from './skill-road-maps.entity';

const DOMAIN = 'skill-road-maps';

@AdminController(DOMAIN, 'CAN_MANAGE_SKILLS')
export class SkillRoadMapsAdminController {
  constructor(
    private readonly skillRoadMapsService: SkillRoadMapsService,
    private readonly skillsService: SkillsService,
  ) {}

  @Get(':skillId/create')
  @Render(`admin/${DOMAIN}/create`)
  async renderCreate(
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<Record<string, unknown>> {
    const skillName = await this.skillsService.getSingleFieldFromSkillId<'name'>(skillId, 'name');
    return {
      skillId,
      skillName,
    };
  }

  @Get(':skillRoadMapId/edit')
  @Render(`admin/${DOMAIN}/edit`)
  async renderUpdate(
    @Param('skillRoadMapId', new ParseUUIDPipe()) skillRoadMapId: string,
  ): Promise<Record<string, SkillRoadMap>> {
    return {
      skillRoadMap: await this.skillRoadMapsService.showSkillRoadMap(skillRoadMapId),
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSkillRoadMapDTO: CreateSkillRoadMapDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillRoadMapsService.createSkillRoadMap(createSkillRoadMapDTO);
    sessionFlash.success('Skill Road Map Added Successfully');
    res.redirect(back);
  }

  @Patch(':skillRoadMapId')
  @HttpCode(HttpStatus.CREATED)
  async update(
    @Body() updateSkillRoadMapDTO: UpdateSkillRoadMapDTO,
    @Param('skillRoadMapId', new ParseUUIDPipe()) skillRoadMapId: string,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillRoadMapsService.updateSkillRoadMap(skillRoadMapId, updateSkillRoadMapDTO);
    sessionFlash.success('Skill Road Map Updated Successfully');
    res.redirect(back);
  }

  @Delete(':skillRoadMapId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Headers('referer') back: string,
    @Param('skillRoadMapId', new ParseUUIDPipe()) skillRoadMapId: string,
    @Res() res: Response,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillRoadMapsService.deleteSkillRoadMap(skillRoadMapId);
    sessionFlash.success('Skill Road Map Deleted Successfully');
    res.redirect(back);
  }
}
