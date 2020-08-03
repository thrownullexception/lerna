import { IsNotEmpty, IsNumberString } from 'class-validator';

export class BaseSkillHierarchyDTO {
  @IsNumberString()
  @IsNotEmpty({
    message: 'Order is required',
  })
  order: number;
}
