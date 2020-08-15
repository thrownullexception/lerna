import { IsNotEmpty, IsUUID, IsNumber, IsOptional } from 'class-validator';

export class BaseSessionDTO {
  @IsUUID(4)
  @IsOptional()
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
  }) // TODO is greater than budget from
  budgetTo: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  }) // TODO between 10 and 100
  passPercentage: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  questionsDuration: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  noResponseDuration: number;
}
