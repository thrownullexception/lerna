import { IsNotEmpty, IsEnum, IsUUID, IsOptional, IsNumberString } from 'class-validator';
import { TutorSkillLevels } from '../../tutor-skill-levels/tutor-skill-levels.types';
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

  @IsEnum(TutorSkillLevels)
  @IsNotEmpty({
    message: 'Answer is required',
  })
  level: TutorSkillLevels;

  @IsNumberString()
  @IsNotEmpty({
    message: 'Rate is required',
  })
  rate: number;

  @IsNumberString()
  @IsNotEmpty({
    message: 'Years of Experience is required',
  })
  years: number;
}
