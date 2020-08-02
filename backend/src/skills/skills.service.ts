import { Injectable } from '@nestjs/common';
import { Skill } from './skills.entity';
import { SkillsRepository } from './skills.repository';
import { SkillHierarchy } from '../skill-hierarchies/skill-hierarchies.entity';
import { SkillHierarchiesService } from '../skill-hierarchies/skill-hierarchies.service';
import { CreateSkillDTO, EditSkillDTO } from './dtos';
import { IQueryParametersDTO, IPaginatePayload } from '../shared/types';
import { FindConditions } from 'typeorm';
import { ISkillWithRestAsOptions } from './skills.types';

@Injectable()
export class SkillsService {
  constructor(
    private readonly skillsRepository: SkillsRepository,
    private readonly skillHierarchiesService: SkillHierarchiesService,
  ) {}

  async getSkills(): Promise<Skill[]> {
    return await this.skillsRepository.listSkills();
  }

  async getSkillsNamesAndIds(): Promise<Skill[]> {
    return await this.skillsRepository.listSkills({
      select: ['id', 'name'],
    });
  }

  async getSingleFieldFromSkillId<T extends keyof Skill>(
    skillId: string,
    field: T,
  ): Promise<Pick<Skill, T>> {
    const skill = await this.skillsRepository.showSkill({
      select: [field],
      where: {
        id: skillId,
      },
    });
    if (!skill) {
      return;
    }
    return (skill[field] as unknown) as Pick<Skill, T>;
  }

  async getSkillDetailsForAdmin(skillId: string): Promise<Skill> {
    return await this.skillsRepository.showSkill({
      where: { id: skillId },
      select: ['id', 'name', 'description', 'isPath'],
      relations: [
        // TODO look at me
        'resources',
        'resources.skillMediaType',
        'roadMaps',
        'forwardRelatedSkill',
        'backwardRelatedSkill',
        'parents',
        'parents.parent',
        'children',
        'children.child',
      ],
    });
  }

  async listSkillsByQueryParamters(
    queryParametersDTO: IQueryParametersDTO,
  ): Promise<IPaginatePayload<Skill>> {
    const where: FindConditions<Skill> = {};
    // if (filters) {
    //   const replied = get(filters, ['replied', 0]);
    //   if (replied) {
    //     where.replied = replied;
    //   }
    // }
    const [result, total] = await this.skillsRepository.listSkillsAndCount({
      ...where,
      ...queryParametersDTO,
    });
    const { take, page } = queryParametersDTO;
    return {
      data: result,
      count: total,
      take,
      page,
    };
  }

  async getSkillWithTheRestAsOptions(skillId: string): Promise<ISkillWithRestAsOptions> {
    const skills = await this.getSkillsNamesAndIds();
    return {
      skill: skills.find(({ id }) => id === skillId),
      skills: skills
        .filter(({ id }) => id != skillId)
        .map(({ id, name }) => ({ label: name, value: id })),
    };
  }

  async getSkillsAndHierarchies(): Promise<{
    skills: Skill[];
    skillHierarchies: SkillHierarchy[];
  }> {
    const [skills, skillHierarchies] = await Promise.all([
      this.getSkills(),
      this.skillHierarchiesService.listSkillHierarchies(),
    ]);
    return { skills, skillHierarchies };
  }

  async getSkill(skillId: string): Promise<Skill> {
    return await this.skillsRepository.showSkill({
      where: { id: skillId },
      select: ['id', 'name', 'description', 'isPath'],
      relations: ['resources', 'roadMaps', 'forwardRelatedSkill', 'backwardRelatedSkill'],
    });
  }

  async createSkill(skillDTO: CreateSkillDTO, lastTouchedById: string): Promise<void> {
    return await this.skillsRepository.createSkill({ ...skillDTO, lastTouchedById });
  }

  async updateSkill(
    skillId: string,
    skillDTO: EditSkillDTO,
    lastTouchedById: string,
  ): Promise<void> {
    await this.skillsRepository.updateSkill(skillId, { ...skillDTO, lastTouchedById });
  }

  async deleteSkill(skillId: string): Promise<void> {
    await this.skillsRepository.deleteSkill(skillId);
  }
}
