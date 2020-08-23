import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('accountModes')
export class AccountMode extends SystemValueEntity {}
