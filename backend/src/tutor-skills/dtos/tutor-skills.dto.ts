import { IsNotEmpty, IsEnum, IsUUID, IsNumber } from 'class-validator';
import { TutorSkillLevels } from '../../tutor-skill-levels/tutor-skill-levels.types';

export class TutorSkillDTO {
  @IsUUID(4)
  id: string;

  @IsNotEmpty({
    message: 'Skill is required',
  })
  @IsUUID(4)
  skillId: string;

  @IsNotEmpty({
    message: 'Answer is required',
  })
  @IsEnum(TutorSkillLevels) // Test me out
  level: TutorSkillLevels;

  @IsNotEmpty({
    message: 'Rate is required',
  })
  @IsNumber()
  rate: number;

  @IsNotEmpty({
    message: 'Years of Experience is required',
  })
  @IsNumber()
  years: number;
}
