import { IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateSessionMetadataDTO {
  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  passPercentage: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  quizDuration: number;

  @IsNumber()
  @IsNotEmpty({
    message: 'Title is required',
  })
  noResponseDuration: number;
}
