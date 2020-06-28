import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('genders')
export class Gender {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  systemName: string;

  @Column()
  displayName: string;
}
