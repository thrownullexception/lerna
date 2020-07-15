import { Entity } from 'typeorm';
import { SystemValueEntity } from 'src/shared/entities';

@Entity('account_modes')
export class AccountMode extends SystemValueEntity {}
