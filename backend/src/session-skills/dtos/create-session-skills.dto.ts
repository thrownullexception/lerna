import { IsNotEmpty, IsUUID } from 'class-validator';
import { SessionSkill } from '../session-skills.entity';
import { Unique } from '../../shared/constraints';

export class CreateSessionSkillDTO {
  @IsUUID(4)
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
  @IsUUID(4)
  @IsNotEmpty({
    message: 'SkillID is required',
  })
  skillId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'SessionID is required',
  })
  sessionId: string;
}
