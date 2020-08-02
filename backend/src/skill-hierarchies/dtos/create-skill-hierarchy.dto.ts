import { BaseSkillHierarchyDTO } from './base-skill-hierarchy.dto';
import { IsNotEmpty, IsIn, IsUUID } from 'class-validator';

export class CreateSkillHierarchyDTO extends BaseSkillHierarchyDTO {
  @IsNotEmpty({
    message: 'Order is required',
  })
  @IsIn(['child', 'parent'])
  relation: 'child' | 'parent';

  @IsNotEmpty({
    message: 'Skill A is required',
  })
  @IsUUID(4)
  skillAId: string;

  @IsNotEmpty({
    message: 'Skill B is required',
  })
  @IsUUID(4)
  skillBId: string;
}
// TODO unique contraint on skillA => skillB
