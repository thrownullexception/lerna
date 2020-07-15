import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';
import { Session } from 'src/sessions/sessions.entity';

@Entity('session_skills')
export class SessionSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  skillId: string;

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
