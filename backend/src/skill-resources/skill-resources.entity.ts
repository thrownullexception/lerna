import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Skill } from '../skills/skills.entity';
import { SkillMediaType } from '../skill-media-types/skill-media-types.entity';
import { SkillMediaTypes } from 'src/skill-media-types/skill-media-types.types';

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
  mediaType: SkillMediaTypes;

  @Column()
  isFree: boolean;

  @ManyToOne(
    () => SkillMediaType,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'media_type',
    referencedColumnName: 'systemName',
  })
  skillMediaType: SkillMediaType;

  @ManyToOne(
    () => Skill,
    ({ id }) => id,
  )
  skill: Skill;
}
