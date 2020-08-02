import { IsNotEmpty, IsUUID } from 'class-validator';
import { BaseSkillResourceDTO } from './base-skill-resource.dto';

export class CreateSkillResourceDTO extends BaseSkillResourceDTO {
  @IsNotEmpty({
    message: 'Skill is required',
  })
  @IsUUID(4)
  skillId: string;
}
