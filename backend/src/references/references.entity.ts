import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('references')
export class Reference {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  value: string;
}
