import { IsNotEmpty, IsNumberString } from 'class-validator';

export class BaseSkillRoadMapDTO {
  @IsNumberString()
  @IsNotEmpty({
    message: 'Level is required',
  })
  level: number;

  @IsNumberString()
  @IsNotEmpty({
    message: 'Order is required',
  })
  order: number;

  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;
}
