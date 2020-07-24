import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TutorSkillLevels } from '../tutor-skill-levels/tutor-skill-levels.types';
import { Skill } from '../skills/skills.entity';

@Entity('tutor_skills')
export class TutorSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  skillId: string;

  @Column()
  level: TutorSkillLevels;

  @Column()
  rate: number;

  @Column()
  years: number;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill: Skill;
}
