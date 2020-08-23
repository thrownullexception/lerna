import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { SkillLevels } from '../skill-levels/skill-levels.types';
import { Skill } from '../skills/skills.entity';
import { User } from '../users/users.entity';
import { SkillLevel } from '../skill-levels/skill-levels.entity';

@Entity('tutorSkills')
export class TutorSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  skillId: string;

  @Column()
  levelSystemName: SkillLevels;

  @ManyToOne(
    () => SkillLevel,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'levelSystemName',
    referencedColumnName: 'systemName',
  })
  level: SkillLevel;

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
