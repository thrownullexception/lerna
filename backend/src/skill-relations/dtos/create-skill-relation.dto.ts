import { IsNotEmpty, IsUUID } from 'class-validator';
import { Unique } from '../../shared/constraints';

export class CreateSkillRelationDTO {
  @IsNotEmpty({
    message: 'Skill A is required',
  })
  @IsUUID(4)
  @Unique('SkillRelation', {
    message: 'Relation Ship exists',
  })
  skillAId: string;

  @IsNotEmpty({
    message: 'Skill B is required',
  })
  @IsUUID(4)
  skillBId: string;
}

// TODO Add skillBId-skillAId unique constraints
// TODO Add skillAId-skillBId unique constraints
