import { IsNotEmpty, IsOptional } from 'class-validator';

export class BaseSkillDTO {
  @IsNotEmpty({
    message: 'Skill Name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skill Description is required',
  })
  description: string;

  @IsOptional()
  isPath: boolean;
}
