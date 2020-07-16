import { IsNotEmpty, IsUUID, IsOptional, Length } from 'class-validator';

export class SessionQuizDTO {
  @IsUUID(4)
  id: string;

  @IsNotEmpty({
    message: 'SessionID is required',
  })
  @IsUUID(4)
  sessionId: string;

  @IsNotEmpty({
    message: 'Question is required',
  })
  @Length(10, 140)
  question: string;

  @IsNotEmpty({
    message: 'Option A is required',
  })
  @Length(1, 50)
  optionA: string;

  @IsNotEmpty({
    message: 'Option B is required',
  })
  @Length(1, 50)
  optionB: string;

  @IsOptional()
  @Length(1, 50)
  optionC: string;

  @IsOptional()
  @Length(1, 50)
  optionD: string;

  @IsOptional()
  @Length(1, 50)
  optionE: string;
}
