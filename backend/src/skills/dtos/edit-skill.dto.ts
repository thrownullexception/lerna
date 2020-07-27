import { BaseSkillDTO } from './base-skill.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class EditSkillDTO extends BaseSkillDTO {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
