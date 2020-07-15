import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Skill } from 'src/skills/skills.entity';
import { SessionStatus } from 'src/session-statuses/session-statuses.entity';
import { SessionStatusTypes } from 'src/session-statuses/session-statuses.types';

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

  @ManyToMany(() => Skill)
  @JoinTable({
    name: 'session_skills',
    joinColumn: {
      name: 'session_id',
    },
    inverseJoinColumn: {
      name: 'skill_id',
    },
  })
  permissions: Skill[];

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
