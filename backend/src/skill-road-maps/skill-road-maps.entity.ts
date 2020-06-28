import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Skill } from 'src/skills/skills.entity';

@Entity('skill_road_maps')
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

  @Column({ select: false })
  description: string;

  @ManyToOne(
    type => Skill,
    ({ id }) => id,
  )
  skill$1: Skill;
}
