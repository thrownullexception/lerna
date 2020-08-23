import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';

@Entity('skillHierarchies')
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
