import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  permission: string;
}
