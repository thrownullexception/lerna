import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skill_media_types')
export class SkillMediaType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  systemName: string;

  @Column()
  displayName: string;
}
