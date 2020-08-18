import { IsNotEmpty, IsUUID, IsOptional, IsNumberString } from 'class-validator';

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

  @IsNumberString() // TODO Reduce this numbers
  @IsNotEmpty({
    message: 'Budget From is required',
  })
  budgetFrom: number;

  @IsNumberString()
  @IsNotEmpty({
    message: 'Budget To is required',
  }) // TODO is greater than budget from
  budgetTo: number;

  @IsNumberString()
  @IsNotEmpty({
    message: 'Pass Percentage is required',
  }) // TODO between 10 and 100
  passPercentage: number;

  @IsNumberString()
  @IsNotEmpty({
    message: 'Questions Duration is required',
  })
  questionsDuration: number;

  @IsNumberString()
  @IsNotEmpty({
    message: 'No Response Duration is required',
  })
  noResponseDuration: number;
}
