import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tutor_skills_levels')
export class TutorSkillLevel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  systemName: string;

  @Column()
  displayName: string;
}
