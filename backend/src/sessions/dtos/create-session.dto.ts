import { BaseSessionDTO } from './base-session.dto';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { BaseCreateSessionSkillDTO } from '../../session-skills/dtos/base-create-session-skill.dto';
import { BaseSessionQuestionDTO } from '../../session-questions/dtos/base-session-question.dto';
import { Type } from 'class-transformer';

export class CreateSessionDTO extends BaseSessionDTO {
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => BaseCreateSessionSkillDTO)
  skills: BaseCreateSessionSkillDTO[];
  // Note the skillId is not unique from here

  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => BaseSessionQuestionDTO)
  questions: BaseSessionQuestionDTO[];
}
