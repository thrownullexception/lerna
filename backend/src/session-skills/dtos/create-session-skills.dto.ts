import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSessionSkillDTO {
  @IsUUID(4)
  id: string;

  @IsNotEmpty({
    message: 'SkillID is required',
  })
  @IsUUID(4)
  skillId: string;

  @IsNotEmpty({
    message: 'SessionID is required',
  })
  @IsUUID(4)
  sessionId: string;
}

// TODO Add sessionId-skillId unique constraints
