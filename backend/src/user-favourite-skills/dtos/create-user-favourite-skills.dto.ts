import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Unique } from '../../shared/constraints';
import { UserFavouriteSkill } from '../user-favourite-skills.entity';

export class CreateUserFavouriteSkillDTO {
  @IsUUID(4)
  @IsOptional()
  id: string;

  @IsUUID(4)
  @IsNotEmpty({
    message: 'User is required',
  })
  userId: string;

  @Unique<CreateUserFavouriteSkillDTO>(
    {
      repositoryModel: UserFavouriteSkill,
      otherColumn: 'userId',
    },
    {
      message: 'Skill already favourited',
    },
  )
  @IsUUID(4)
  @IsNotEmpty({
    message: 'Skill is required',
  })
  skillId: string;
}
