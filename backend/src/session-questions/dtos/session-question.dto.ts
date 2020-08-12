import { IsNotEmpty, IsUUID, IsOptional, Length } from 'class-validator';

export class SessionQuestionDTO {
  @IsUUID(4)
  id: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'SessionID is required',
  })
  sessionId: string;

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

  @Length(1, 50)
  @IsOptional()
  optionC: string;

  @Length(1, 50)
  @IsOptional()
  optionD: string;

  @Length(1, 50)
  @IsOptional()
  optionE: string;
}
