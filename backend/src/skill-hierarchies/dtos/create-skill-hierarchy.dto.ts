import { BaseSkillHierarchyDTO } from './base-skill-hierarchy.dto';
import { IsNotEmpty, IsIn, IsUUID } from 'class-validator';
// import { SkillHierarchy } from '../skill-hierarchies.entity';
// import { Unique } from '../../shared/constraints';

export class CreateSkillHierarchyDTO extends BaseSkillHierarchyDTO {
  @IsIn(['child', 'parent'])
  @IsNotEmpty({
    message: 'Order is required',
  })
  relation: 'child' | 'parent';

  // @Unique<CreateSkillHierarchyDTO>({
  //   repositoryModel: SkillHierarchy,
  //   otherColumn: 'skillBId',
  //   biDirectional: true
  // }, {
  //   message: 'Relation Ship exists',
  // })
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
