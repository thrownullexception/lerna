import { BaseSkillRoadMapDTO } from './base-skill-road-map.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSkillRoadMapDTO extends BaseSkillRoadMapDTO {
  @IsNotEmpty({
    message: 'Skill is required',
  })
  @IsUUID(4)
  skillId: string;
}
