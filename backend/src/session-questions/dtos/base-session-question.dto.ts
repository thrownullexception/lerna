import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class BaseSessionQuestionDTO {
  @Length(10, 140)
  @IsNotEmpty({
    message: 'Question is required',
  })
  question: string;

  @Length(1, 50)
  @IsNotEmpty({
    message: 'Option A is required',
  })
  optionA: string;

  @Length(1, 50)
  @IsNotEmpty({
    message: 'Option B is required',
  })
  optionB: string;

  @IsOptional()
  optionC: string;

  @IsOptional()
  optionD: string;

  @IsOptional()
  optionE: string;
}
// TODO make sure all the options are not the same
