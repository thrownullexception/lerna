import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { GenderTypes } from '../genders/genders.types';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  picture: string;

  @Column()
  online: boolean;

  @Column()
  gender: GenderTypes;

  @Column()
  dob: string;
}
