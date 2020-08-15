import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { SessionSkill } from '../session-skills.entity';
import { Unique } from '../../shared/constraints';
import { BaseCreateSessionSkillDTO } from './base-create-session-skill.dto';

export class CreateSessionSkillDTO extends BaseCreateSessionSkillDTO {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @Unique<CreateSessionSkillDTO>(
    {
      repositoryModel: SessionSkill,
      otherColumn: 'sessionId',
    },
    {
      message: 'Skill was already added',
    },
  )
  skillId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'SessionID is required',
  })
  sessionId: string;
}
