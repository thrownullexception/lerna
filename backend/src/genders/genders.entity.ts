import { Entity } from 'typeorm';
import { SystemValueEntity } from 'src/shared/entities';

@Entity('genders')
export class Gender extends SystemValueEntity {}
