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
    _ => Skill,
    ({ id }) => id,
  )
  skillA$1: Skill;

  @ManyToOne(
    _ => Skill,
    ({ id }) => id,
  )
  skillB$1: Skill;
}
