import { IsNotEmpty, IsUUID } from 'class-validator';
import { Unique } from '../../shared/constraints';
import { UserCompletedSkillRoadMap } from '../user-completed-skill-road-maps.entity';

export class CreateUserCompletedSkillRoadMapDTO {
  @IsUUID(4)
  @IsNotEmpty({
    message: 'User is required',
  })
  userId: string;

  @Unique<CreateUserCompletedSkillRoadMapDTO>(
    {
      repositoryModel: UserCompletedSkillRoadMap,
      otherColumn: 'userId',
    },
    {
      message: 'Roadmap already completed',
    },
  )
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Skill Road Map Id is required',
  })
  skillRoadMapId: string;
}
