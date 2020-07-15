import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateSessionMetadataDTO {
  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsNumber()
  passPercentage: number;

  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsNumber()
  quizDuration: number;

  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsNumber()
  noResponseDuration: number;
}
