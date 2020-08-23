import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';
import { User } from '../users/users.entity';

@Entity('userFavouriteSkills')
export class UserFavouriteSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  skillId: string;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  user: User;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill: Skill;
}
