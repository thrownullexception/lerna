import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';

@Entity('skillRelations')
export class SkillRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  skillAId: string;

  @Column()
  skillBId: string;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skillA: Skill;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skillB: Skill;
}
