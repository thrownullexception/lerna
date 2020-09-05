import { Entity, Column } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('sessionStatuses')
export class SessionStatus extends SystemValueEntity {
  @Column()
  theme: string;
}
