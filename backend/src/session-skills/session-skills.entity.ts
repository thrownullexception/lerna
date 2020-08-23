import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';
import { Session } from '../sessions/sessions.entity';
import { SkillLevels } from '../skill-levels/skill-levels.types';

@Entity('sessionSkills')
export class SessionSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  skillId: string;

  @Column()
  level: SkillLevels;

  @ManyToOne(
    () => Session,
    ({ id }) => id,
  )
  session: Session;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill: Skill;
}
