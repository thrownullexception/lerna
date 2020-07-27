import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSkillRelationDTO {
  @IsNotEmpty({
    message: 'Skill A is required',
  })
  @IsUUID(4)
  skillAId: string;

  @IsNotEmpty({
    message: 'Skill B is required',
  })
  @IsUUID(4)
  skillBId: string;
}
