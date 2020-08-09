import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { SessionStatus } from '../session-statuses/session-statuses.entity';
import { SessionStatusTypes } from '../session-statuses/session-statuses.types';
import { SessionSkill } from '../session-skills/session-skills.entity';

@Entity('sessions')
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  tutorId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  budgetFrom: number;

  @Column()
  budgetTo: number;

  @Column()
  quizDuration: number;

  @Column()
  passPercentage: number;

  @Column()
  noResponseDuration: number; // TODO implement

  @Column()
  statusSystemName: SessionStatusTypes;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  student: User;

  @ManyToOne(
    () => User,
    ({ id }) => id,
  )
  tutor: User;

  @OneToMany(
    () => SessionSkill,
    ({ session }) => session,
  )
  skills: SessionSkill[];

  @ManyToOne(
    () => SessionStatus,
    ({ systemName }) => systemName,
  )
  @JoinColumn({
    name: 'status_system_name',
    referencedColumnName: 'systemName',
  })
  accountMode: SessionStatus;

  @Column()
  createdAt: string;
}
