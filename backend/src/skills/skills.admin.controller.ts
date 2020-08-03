import {
  Body,
  Post,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
  Delete,
  Get,
  Render,
  Query,
  Res,
  Headers,
  ParseUUIDPipe,
  UsePipes,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { SkillsService } from './skills.service';
import { CreateSkillDTO, EditSkillDTO } from './dtos';
import {
  AuthenticatedUser,
  SessionFlash,
  ISessionFlash,
  AdminController,
} from '../shared/decorators';
import { PaginationQueryParametersPipe, CastBooleanParametersPipe } from '../shared/pipes';
import { IPaginatePayload, IQueryParametersDTO } from '../shared/types';
import { Skill } from './skills.entity';

const DOMAIN = 'skills';

interface ISkillWithRelatedSkills {
  skill: Skill;
  relatedSkills: Skill[];
}

@AdminController(DOMAIN, 'CAN_MANAGE_SKILLS')
export class AdminSkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @Render(`admin/${DOMAIN}/list`)
  @UsePipes()
  async list(
    @Query(new PaginationQueryParametersPipe()) queryParametersDTO: IQueryParametersDTO,
  ): Promise<{ skills: IPaginatePayload<Skill> }> {
    const skills = await this.skillsService.listSkillsByQueryParamters(queryParametersDTO);
    return { skills };
  }

  @Get('create')
  @Render(`admin/${DOMAIN}/create`)
  createPage(): void {
    return;
  }

  @Get(':skillId/edit')
  @Render(`admin/${DOMAIN}/edit`)
  async editPage(
    @Param('skillId', new ParseUUIDPipe()) skillId: string,
  ): Promise<ISkillWithRelatedSkills> {
    const skill = await this.skillsService.getSkillDetailsForAdmin(skillId);
    if (!skill) {
      throw new NotFoundException('Skill Not Found');
    }
    return {
      skill: {
        ...skill,
        roadMaps: [...skill.roadMaps.sort((a, b) => a.level - b.level || a.order - b.order)],
        parents: [...skill.parents.sort((a, b) => a.order - b.order)],
        children: [...skill.children.sort((a, b) => a.order - b.order)],
      },
      relatedSkills: [...skill.forwardRelatedSkill, ...skill.backwardRelatedSkill],
    };
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(
    @Body(
      new CastBooleanParametersPipe<CreateSkillDTO>(['isPath']),
    )
    createSkillDTO: CreateSkillDTO,
    @AuthenticatedUser('id') userId: string,
    @Res() res: Response,
    @Headers('referer') back: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillsService.createSkill(createSkillDTO, userId);
    sessionFlash.success('Skill Created Successfully');
    res.redirect(back);
  }

  @Patch(':skillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('skillId') skillId: string,
    @Body(
      new CastBooleanParametersPipe<CreateSkillDTO>(['isPath']),
    )
    editSkillDTO: EditSkillDTO,
    @Res() res: Response,
    @Headers('referer') back: string,
    @AuthenticatedUser('id') userId: string,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillsService.updateSkill(skillId, editSkillDTO, userId);
    sessionFlash.success('Skill Updated Successfully');
    res.redirect(back);
  }

  @Delete(':skillId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('skillId') skillId: string,
    @Headers('referer') back: string,
    @Res() res: Response,
    @SessionFlash() sessionFlash: ISessionFlash,
  ): Promise<void> {
    await this.skillsService.deleteSkill(skillId);
    sessionFlash.success('Skill Deleted Successfully');
    res.redirect(back);
  }
}
