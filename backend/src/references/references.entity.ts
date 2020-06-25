import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('references')
export class Reference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column()
  value: string;
}
