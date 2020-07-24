import { IsNotEmpty } from 'class-validator';

export class UpdateReferenceDTO {
  @IsNotEmpty({
    message: 'Value is required',
  })
  value: string;
}
