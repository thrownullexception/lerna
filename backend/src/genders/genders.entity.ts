import { Entity } from 'typeorm';
import { SystemValueEntity } from '../shared/entities';

@Entity('genders')
export class Gender extends SystemValueEntity {}
