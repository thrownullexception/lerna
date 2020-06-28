import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ select: false })
  description: string;

  @Column({ select: false })
  isPath: boolean;
}
