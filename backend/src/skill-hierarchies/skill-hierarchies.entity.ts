import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';

@Entity('skill_hierarchies')
export class SkillHierarchy {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  parentId: string;

  @Column()
  childId: string;

  @Column()
  order: number;

  @ManyToOne(
    _ => Skill,
    ({ id }) => id,
  )
  parent$1: Skill;

  @ManyToOne(
    _ => Skill,
    ({ id }) => id,
  )
  child$1: Skill;
}
