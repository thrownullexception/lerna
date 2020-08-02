import { IsNotEmpty, IsNumberString } from 'class-validator';

export class BaseSkillRoadMapDTO {
  @IsNotEmpty({
    message: 'Level is required',
  })
  @IsNumberString()
  level: number;

  @IsNotEmpty({
    message: 'Order is required',
  })
  @IsNumberString()
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
