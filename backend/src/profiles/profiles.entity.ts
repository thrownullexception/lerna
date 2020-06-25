import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { GenderTypes } from './profiles.types';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  nicename: string;

  @Column()
  profileImage: string;

  @Column()
  gender: GenderTypes;

  @Column()
  dob: Date;
}
