import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { SkillMediaTypes } from '../../skill-media-types/skill-media-types.types';

export class BaseSkillResourceDTO {
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsNotEmpty({
    message: 'Link is required',
  })
  link: string;

  @IsEnum(SkillMediaTypes)
  @IsNotEmpty({
    message: 'Media Type is required',
  })
  mediaType: SkillMediaTypes;

  @IsOptional()
  isFree: boolean;
}
