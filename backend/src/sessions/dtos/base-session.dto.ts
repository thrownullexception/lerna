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

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  budgetFrom: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  budgetTo: number;
}
