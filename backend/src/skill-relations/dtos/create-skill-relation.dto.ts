import { IsNotEmpty, IsUUID } from 'class-validator';
import { Unique } from '../../shared/constraints';
import { SkillRelation } from '../skill-relations.entity';

export class CreateSkillRelationDTO {
  @Unique<CreateSkillRelationDTO>(
    {
      repositoryModel: SkillRelation,
      otherColumn: 'skillBId',
      biDirectional: true,
    },
    {
      message: 'Relations already exists',
    },
  )
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Skill A is required',
  })
  skillAId: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'Skill B is required',
  })
  skillBId: string;
}
