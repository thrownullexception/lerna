import { IsNotEmpty } from 'class-validator';
import { Unique } from '../../shared/constraints';
import { Skill } from '../skills.entity';

export class BaseSkillDTO {
  @Unique<BaseSkillDTO>(
    { repositoryModel: Skill },
    {
      message: 'Skill already exists',
    },
  )
  @IsNotEmpty({
    message: 'Skill Name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'Skill Description is required',
  })
  description: string;
}
