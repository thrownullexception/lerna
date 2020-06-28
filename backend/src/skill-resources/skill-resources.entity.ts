import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Skill } from '../skills/skills.entity';
import { SkillMediaType } from '../skill-media-types/skill-media-types.entity';

@Entity('skill_resources')
export class SkillResource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  skillId: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  mediaType: string;

  @Column()
  isFree: boolean;

  @ManyToOne(
    () => SkillMediaType,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'mediaType',
    referencedColumnName: 'systemName',
  })
  accountMode$1: SkillMediaType;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill$1: Skill;
}
