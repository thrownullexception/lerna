import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('session_statuses')
export class SessionStatus extends SystemValueEntity {}
