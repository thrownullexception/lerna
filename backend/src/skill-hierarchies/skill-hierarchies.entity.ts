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
    () => Skill,
    ({ id }) => id,
  )
  parent: Skill;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  child: Skill;
}
