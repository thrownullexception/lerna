import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class BaseSessionDTO {
  @IsUUID(4)
  id: string;

  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsNotEmpty({
    message: 'Description is required',
  })
  description: string;

  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsNumber()
  budgetFrom: number;

  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsNumber()
  budgetTo: number;
}
