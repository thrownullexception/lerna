import { IsNotEmpty, IsUUID, IsEnum } from 'class-validator';
import { SkillLevels } from '../../skill-levels/skill-levels.types';

export class BaseCreateSessionSkillDTO {
  @IsUUID(4)
  @IsNotEmpty({
    message: 'SkillID is required',
  })
  skillId: string;

  @IsEnum(SkillLevels)
  @IsNotEmpty({
    message: 'Level is required',
  })
  level: SkillLevels;
}
