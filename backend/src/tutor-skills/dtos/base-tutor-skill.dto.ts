import { IsNotEmpty, IsEnum, IsUUID, IsOptional, IsNumber } from 'class-validator';
import { SkillLevels } from '../../skill-levels/skill-levels.types';
import { Unique } from '../../shared/constraints';
import { TutorSkill } from '../tutor-skills.entity';

export class BaseTutorSkillDTO {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @Unique<BaseTutorSkillDTO>(
    {
      repositoryModel: TutorSkill,
      otherColumn: 'userId',
    },
    {
      message: 'Skill was already added',
    },
  )
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Skill is required',
  })
  skillId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'User is required',
  })
  userId: string;

  @IsEnum(SkillLevels)
  @IsNotEmpty({
    message: 'Level is required',
  })
  level: SkillLevels;

  @IsNumber()
  @IsNotEmpty({
    message: 'Rate is required',
  })
  rate: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Years of Experience is required',
  })
  years: number;
}
