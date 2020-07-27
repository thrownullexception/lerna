import { IsNotEmpty, IsOptional } from 'class-validator';
import { Unique } from '../../shared/constraints';

export class BaseSkillDTO {
  @IsNotEmpty({
    message: 'Skill Name is required',
  })
  @Unique('Skill', {
    message: 'Skill already exists',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skill Description is required',
  })
  description: string;

  @IsOptional()
  isPath: boolean;
}
