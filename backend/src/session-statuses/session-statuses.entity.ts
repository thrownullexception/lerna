import { Entity } from 'typeorm';
import { SystemValueEntity } from 'src/shared/entities';

@Entity('session_statuses')
export class SessionStatus extends SystemValueEntity {}
