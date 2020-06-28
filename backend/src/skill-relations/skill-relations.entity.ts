import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';

@Entity('skill_relations')
export class SkillRelation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  skillA: string;

  @Column()
  skillB: string;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skillA$1: Skill;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skillB$1: Skill;
}
