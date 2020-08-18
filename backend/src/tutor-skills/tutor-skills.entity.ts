import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { SkillLevels } from '../skill-levels/skill-levels.types';
import { Skill } from '../skills/skills.entity';
import { User } from 'src/users/users.entity';

@Entity('tutor_skills')
export class TutorSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  skillId: string;

  @Column()
  level: SkillLevels;

  @Column()
  rate: number;

  @Column()
  years: number;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill: Skill;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  user: User;
}
