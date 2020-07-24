import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('account_modes')
export class AccountMode extends SystemValueEntity {}
