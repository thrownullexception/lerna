import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class SystemValueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  systemName: string;

  @Column()
  displayName: string;
}
