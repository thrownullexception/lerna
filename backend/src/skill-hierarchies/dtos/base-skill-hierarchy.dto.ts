import { IsNotEmpty, IsNumberString } from 'class-validator';

export class BaseSkillHierarchyDTO {
  @IsNotEmpty({
    message: 'Order is required',
  })
  @IsNumberString()
  order: number;
}
