import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from '../skills/skills.entity';

@Entity('skillRoadMaps')
export class SkillRoadMap {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  skillId: string;

  @Column()
  level: number;

  @Column()
  order: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill: Skill;
}
